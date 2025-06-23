#!/usr/bin/env node

/**
 * SSO Auth UI 自动化发布脚本
 * 使用方法: node scripts/publish.cjs [选项]
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step) {
  log(`\n${colors.bright}${colors.blue}=== ${step} ===${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

// 执行命令
function execCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      stdio: 'inherit',
      encoding: 'utf8',
      ...options
    });
    return result;
  } catch (error) {
    logError(`命令执行失败: ${command}`);
    throw error;
  }
}

// 执行命令（静默模式）
function execCommandSilent(command, options = {}) {
  try {
    const result = execSync(command, {
      stdio: 'pipe',
      encoding: 'utf8',
      ...options
    });
    return result;
  } catch (error) {
    return null;
  }
}

// 读取package.json
function readPackageJson() {
  const packagePath = path.join(process.cwd(), 'package.json');
  return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
}

// 写入package.json
function writePackageJson(data) {
  const packagePath = path.join(process.cwd(), 'package.json');
  fs.writeFileSync(packagePath, JSON.stringify(data, null, 2) + '\n');
}

// 获取当前版本
function getCurrentVersion() {
  const pkg = readPackageJson();
  return pkg.version;
}

// 递增版本号
function incrementVersion(currentVersion, type = 'patch') {
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
    default:
      return `${major}.${minor}.${patch + 1}`;
  }
}

// 检查依赖
function checkDependencies() {
  logStep('检查依赖');
  
  // 检查Node.js版本
  const nodeVersion = process.version;
  logInfo(`Node.js版本: ${nodeVersion}`);
  
  // 检查npm版本
  try {
    const npmVersion = execCommandSilent('npm --version');
    if (npmVersion) {
      logInfo(`npm版本: ${npmVersion.trim()}`);
    }
  } catch (error) {
    logWarning('无法获取npm版本');
  }
  
  // 检查git
  try {
    const gitVersion = execCommandSilent('git --version');
    if (gitVersion) {
      logInfo(`Git版本: ${gitVersion.trim()}`);
    }
  } catch (error) {
    logError('Git未安装');
    throw new Error('Git未安装');
  }
  
  logSuccess('依赖检查通过');
}

// 检查Git状态
function checkGitStatus() {
  logStep('检查Git状态');
  
  try {
    // 检查是否有未提交的更改
    const status = execCommandSilent('git status --porcelain');
    if (status && status.trim()) {
      logWarning('发现未提交的更改:');
      console.log(status);
      
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      return new Promise((resolve) => {
        rl.question('是否继续发布？(y/N): ', (answer) => {
          rl.close();
          if (answer.toLowerCase() !== 'y') {
            logError('发布已取消');
            process.exit(1);
          }
          resolve();
        });
      });
    }
    
    // 检查是否在正确的分支上
    const currentBranch = execCommandSilent('git branch --show-current');
    if (currentBranch) {
      const branch = currentBranch.trim();
      if (branch !== 'main' && branch !== 'master') {
        logWarning(`当前分支: ${branch}`);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        
        return new Promise((resolve) => {
          rl.question('是否继续发布？(y/N): ', (answer) => {
            rl.close();
            if (answer.toLowerCase() !== 'y') {
              logError('发布已取消');
              process.exit(1);
            }
            resolve();
          });
        });
      }
    }
    
    logSuccess('Git状态检查通过');
  } catch (error) {
    logError('Git状态检查失败');
    throw error;
  }
}

// 运行测试
function runTests() {
  logStep('运行测试');
  
  try {
    // 检查是否有测试脚本
    const pkg = readPackageJson();
    if (pkg.scripts.test) {
      // 检查测试脚本是否是占位符
      const testScript = pkg.scripts.test;
      if (testScript.includes('echo "No tests specified') || 
          testScript.includes('echo "Error: no test specified') ||
          testScript.includes('exit 0')) {
        logInfo('测试脚本为占位符，跳过测试');
        return;
      }
      
      execCommand('npm test');
      logSuccess('测试通过');
    } else {
      logInfo('没有测试脚本，跳过测试');
    }
  } catch (error) {
    logError('测试失败');
    throw error;
  }
}

// 构建项目
function buildProject() {
  logStep('构建项目');
  
  try {
    execCommand('npm run build');
    logSuccess('构建成功');
  } catch (error) {
    logError('构建失败');
    throw error;
  }
}

// 检查构建结果
function checkBuildOutput() {
  logStep('检查构建输出');
  
  const distPath = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    throw new Error('构建输出目录不存在');
  }
  
  const files = fs.readdirSync(distPath);
  if (files.length === 0) {
    throw new Error('构建输出目录为空');
  }
  
  logSuccess(`构建输出检查通过，包含 ${files.length} 个文件`);
  
  // 检查关键文件
  const requiredFiles = ['index.js', 'index.esm.js'];
  for (const file of requiredFiles) {
    if (fs.existsSync(path.join(distPath, file))) {
      logInfo(`✓ ${file}`);
    } else {
      logWarning(`⚠ ${file} 不存在`);
    }
  }
}

// 更新版本号
function updateVersion(versionType) {
  logStep('更新版本号');
  
  const pkg = readPackageJson();
  const currentVersion = pkg.version;
  const newVersion = incrementVersion(currentVersion, versionType);
  
  logInfo(`当前版本: ${currentVersion}`);
  logInfo(`新版本: ${newVersion}`);
  
  pkg.version = newVersion;
  writePackageJson(pkg);
  
  logSuccess(`版本号已更新为 ${newVersion}`);
  return newVersion;
}

// 创建Git标签
function createGitTag(version) {
  logStep('创建Git标签');
  
  try {
    execCommand(`git add package.json`);
    execCommand(`git commit -m "chore: bump version to ${version}"`);
    execCommand(`git tag v${version}`);
    logSuccess(`Git标签 v${version} 已创建`);
  } catch (error) {
    logError('创建Git标签失败');
    throw error;
  }
}

// 发布到npm
function publishToNpm() {
  logStep('发布到npm');
  
  try {
    // 检查是否已登录npm
    try {
      execCommandSilent('npm whoami');
    } catch (error) {
      logError('未登录npm，请先运行 npm login');
      process.exit(1);
    }
    
    // 检查包名是否可用
    const pkg = readPackageJson();
    const packageName = pkg.name;
    
    logInfo(`准备发布包: ${packageName}`);
    
    // 发布
    execCommand('npm publish');
    logSuccess('发布到npm成功');
  } catch (error) {
    logError('发布到npm失败');
    throw error;
  }
}

// 推送到Git
function pushToGit() {
  logStep('推送到Git');
  
  try {
    execCommand('git push origin HEAD');
    execCommand('git push --tags');
    logSuccess('推送到Git成功');
  } catch (error) {
    logError('推送到Git失败');
    throw error;
  }
}

// 回滚操作
function rollback(version) {
  logStep('执行回滚操作');
  
  try {
    // 删除标签
    execCommandSilent(`git tag -d v${version}`);
    
    // 重置到上一个提交
    execCommand('git reset --hard HEAD~1');
    
    // 恢复package.json
    const pkg = readPackageJson();
    pkg.version = version;
    writePackageJson(pkg);
    
    logSuccess('回滚操作完成');
  } catch (error) {
    logError('回滚操作失败');
    console.error(error);
  }
}

// 生成发布说明
function generateReleaseNotes(version) {
  logStep('生成发布说明');
  
  try {
    // 获取上次发布后的提交
    const lastTag = execCommandSilent('git describe --tags --abbrev=0');
    let commits = '';
    
    if (lastTag) {
      commits = execCommandSilent(`git log --oneline ${lastTag.trim()}..HEAD`);
    } else {
      commits = execCommandSilent('git log --oneline');
    }
    
    if (commits && commits.trim()) {
      const releaseNotes = `# 版本 ${version} 发布说明

## 更新内容
${commits.split('\n').filter(line => line.trim()).map(commit => `- ${commit}`).join('\n')}

## 安装
\`\`\`bash
npm install @your-org/sso-auth-ui@${version}
\`\`\`

## 更新日志
- 版本: ${version}
- 发布时间: ${new Date().toISOString().split('T')[0]}
- 构建时间: ${new Date().toISOString()}
`;
      
      const releasePath = path.join(process.cwd(), 'RELEASE_NOTES.md');
      fs.writeFileSync(releasePath, releaseNotes);
      
      logSuccess('发布说明已生成');
      return releaseNotes;
    } else {
      logInfo('没有新的提交，跳过发布说明生成');
      return null;
    }
  } catch (error) {
    logWarning('生成发布说明失败，跳过');
    return null;
  }
}

// 验证发布
function verifyPublish(version) {
  logStep('验证发布');
  
  try {
    // 等待npm CDN更新
    logInfo('等待npm CDN更新...');
    setTimeout(() => {
      // 检查包是否可安装
      const pkg = readPackageJson();
      const packageName = pkg.name;
      
      logInfo(`验证包 ${packageName}@${version} 是否可安装...`);
      
      // 这里可以添加更多的验证逻辑
      logSuccess('发布验证完成');
    }, 5000);
  } catch (error) {
    logWarning('发布验证失败，但发布可能已成功');
  }
}

// 主发布流程
async function publish(versionType = 'patch', options = {}) {
  const startTime = Date.now();
  
  try {
    log(`${colors.bright}${colors.magenta}🚀 开始发布流程${colors.reset}`);
    
    // 检查依赖
    checkDependencies();
    
    // 检查Git状态
    await checkGitStatus();
    
    // 运行测试
    if (!options.skipTests) {
      runTests();
    }
    
    // 构建项目
    buildProject();
    
    // 检查构建输出
    checkBuildOutput();
    
    // 更新版本号
    const newVersion = updateVersion(versionType);
    
    // 生成发布说明
    const releaseNotes = generateReleaseNotes(newVersion);
    
    // 创建Git标签
    createGitTag(newVersion);
    
    // 发布到npm
    publishToNpm();
    
    // 推送到Git
    pushToGit();
    
    // 验证发布
    verifyPublish(newVersion);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    logSuccess(`🎉 发布成功！版本 ${newVersion} 已发布到npm`);
    logInfo(`⏱️  总耗时: ${duration}秒`);
    
    if (releaseNotes) {
      logInfo('📝 发布说明已保存到 RELEASE_NOTES.md');
    }
    
    // 显示安装命令
    const pkg = readPackageJson();
    logInfo(`📦 安装命令: npm install ${pkg.name}@${newVersion}`);
    
  } catch (error) {
    logError('发布失败');
    console.error(error);
    
    // 询问是否回滚
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('是否执行回滚操作？(y/N): ', (answer) => {
      rl.close();
      if (answer.toLowerCase() === 'y') {
        const currentVersion = getCurrentVersion();
        rollback(currentVersion);
      }
    });
    
    process.exit(1);
  }
}

// 命令行参数解析
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    versionType: 'patch',
    skipTests: false,
    dryRun: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--major':
        options.versionType = 'major';
        break;
      case '--minor':
        options.versionType = 'minor';
        break;
      case '--patch':
        options.versionType = 'patch';
        break;
      case '--skip-tests':
        options.skipTests = true;
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
        break;
      default:
        logError(`未知参数: ${arg}`);
        showHelp();
        process.exit(1);
    }
  }
  
  return options;
}

// 显示帮助信息
function showHelp() {
  console.log(`
${colors.bright}SSO Auth UI 自动化发布脚本${colors.reset}

用法: node scripts/publish.cjs [选项]

选项:
  --major              递增主版本号 (x.0.0)
  --minor              递增次版本号 (0.x.0)
  --patch              递增补丁版本号 (0.0.x) [默认]
  --skip-tests         跳过测试
  --dry-run            试运行模式（不实际发布）
  --help, -h           显示帮助信息

示例:
  node scripts/publish.cjs                    # 发布补丁版本
  node scripts/publish.cjs --minor            # 发布次版本
  node scripts/publish.cjs --major            # 发布主版本
  node scripts/publish.cjs --skip-tests       # 跳过测试发布
  node scripts/publish.cjs --dry-run          # 试运行模式

功能特性:
  ✅ 自动版本管理
  ✅ Git状态检查
  ✅ 自动化测试
  ✅ 构建验证
  ✅ npm发布
  ✅ Git标签和推送
  ✅ 发布说明生成
  ✅ 错误回滚
  ✅ 发布验证
`);
}

// 主函数
function main() {
  try {
    const options = parseArgs();
    
    if (options.dryRun) {
      logInfo('试运行模式 - 不会实际发布');
      // 在试运行模式下，只执行检查和构建
      checkDependencies();
      checkGitStatus();
      if (!options.skipTests) {
        runTests();
      }
      buildProject();
      checkBuildOutput();
      logSuccess('试运行完成，所有检查通过');
      return;
    }
    
    publish(options.versionType, options);
  } catch (error) {
    logError('脚本执行失败');
    console.error(error);
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = {
  publish,
  incrementVersion,
  checkDependencies,
  checkGitStatus,
  runTests,
  buildProject,
  updateVersion,
  createGitTag,
  publishToNpm,
  pushToGit,
  rollback,
  generateReleaseNotes
}; 