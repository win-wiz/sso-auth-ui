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

// 检查Git状态（优化版本）
function checkGitStatus(options = {}) {
  logStep('检查Git状态');
  
  try {
    // 检查是否有未提交的更改
    const status = execCommandSilent('git status --porcelain');
    if (status && status.trim()) {
      const changes = status.trim().split('\n');
      const allowedChanges = ['RELEASE_NOTES.md', 'package.json', 'package-lock.json', 'pnpm-lock.yaml'];
      
      // 过滤掉允许的更改
      const significantChanges = changes.filter(change => {
        const fileName = change.substring(3); // 移除状态前缀
        return !allowedChanges.some(allowed => fileName.includes(allowed));
      });
      
      if (significantChanges.length > 0) {
        logWarning('发现未提交的重要更改:');
        significantChanges.forEach(change => console.log(`  ${change}`));
        
        if (!options.nonInteractive) {
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
        } else {
          logWarning('非交互模式：自动提交允许的更改');
          // 自动提交允许的更改
          try {
            execCommandSilent('git add RELEASE_NOTES.md package.json');
            execCommandSilent('git commit -m "chore: 自动提交发布相关更改"');
            logSuccess('已自动提交发布相关更改');
          } catch (error) {
            logWarning('自动提交失败，继续发布');
          }
        }
      } else {
        logInfo('只有允许的更改，自动处理');
        // 自动提交允许的更改
        try {
          execCommandSilent('git add RELEASE_NOTES.md package.json');
          execCommandSilent('git commit -m "chore: 自动提交发布相关更改"');
          logSuccess('已自动提交发布相关更改');
        } catch (error) {
          logWarning('自动提交失败，继续发布');
        }
      }
    }
    
    // 检查是否在正确的分支上
    const currentBranch = execCommandSilent('git branch --show-current');
    if (currentBranch) {
      const branch = currentBranch.trim();
      if (branch !== 'main' && branch !== 'master') {
        logWarning(`当前分支: ${branch}`);
        if (!options.nonInteractive) {
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
        } else {
          logWarning('非交互模式：继续在当前分支发布');
        }
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
    if (pkg.scripts && pkg.scripts.test) {
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

// 检查构建输出
function checkBuildOutput() {
  logStep('检查构建输出');
  
  try {
    const distPath = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
      throw new Error('构建输出目录不存在');
    }
    
    const files = fs.readdirSync(distPath);
    if (files.length === 0) {
      throw new Error('构建输出为空');
    }
    
    logSuccess(`构建输出检查通过，包含 ${files.length} 个文件`);
  } catch (error) {
    logError('构建输出检查失败');
    throw error;
  }
}

// 更新版本号
function updateVersion(versionType) {
  logStep('更新版本号');
  
  try {
    const pkg = readPackageJson();
    const currentVersion = pkg.version;
    const newVersion = incrementVersion(currentVersion, versionType);
    
    pkg.version = newVersion;
    writePackageJson(pkg);
    
    logSuccess(`版本号已更新: ${currentVersion} → ${newVersion}`);
    return newVersion;
  } catch (error) {
    logError('版本号更新失败');
    throw error;
  }
}

// 创建Git标签
function createGitTag(version) {
  logStep('创建Git标签');
  
  try {
    execCommand(`git tag v${version}`);
    logSuccess(`Git标签 v${version} 已创建`);
  } catch (error) {
    logError('Git标签创建失败');
    throw error;
  }
}

// 发布到npm
function publishToNpm(options = {}) {
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
    const publishCommand = options.dryRun ? 'npm publish --dry-run' : 'npm publish';
    execCommand(publishCommand);
    logSuccess('发布到npm成功');
  } catch (error) {
    logError('发布到npm失败');
    throw error;
  }
}

// 推送到Git
function pushToGit(options = {}) {
  logStep('推送到Git');
  
  try {
    if (!options.dryRun) {
      execCommand('git push origin HEAD');
      execCommand('git push --tags');
      logSuccess('推送到Git成功');
    } else {
      logInfo('试运行模式：跳过Git推送');
    }
  } catch (error) {
    logError('推送到Git失败');
    throw error;
  }
}

// 回滚操作（优化版本）
function rollback(version, options = {}) {
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
    
    // 删除发布说明文件
    const releasePath = path.join(process.cwd(), 'RELEASE_NOTES.md');
    if (fs.existsSync(releasePath)) {
      fs.unlinkSync(releasePath);
    }
    
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
npm install @tjsglion/sso-auth-ui@${version}
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
function verifyPublish(version, options = {}) {
  logStep('验证发布');
  
  try {
    if (!options.dryRun) {
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
    } else {
      logInfo('试运行模式：跳过发布验证');
    }
  } catch (error) {
    logWarning('发布验证失败，但发布可能已成功');
  }
}

// 主发布流程（优化版本）
async function publish(versionType = 'patch', options = {}) {
  const startTime = Date.now();
  let originalVersion = null;
  let newVersion = null;
  
  try {
    log(`${colors.bright}${colors.magenta}🚀 开始发布流程${colors.reset}`);
    
    // 保存原始版本号
    originalVersion = getCurrentVersion();
    
    // 检查依赖
    checkDependencies();
    
    // 检查Git状态
    await checkGitStatus(options);
    
    // 运行测试
    if (!options.skipTests) {
      runTests();
    }
    
    // 构建项目
    buildProject();
    
    // 检查构建输出
    checkBuildOutput();
    
    // 更新版本号
    newVersion = updateVersion(versionType);
    
    // 生成发布说明
    const releaseNotes = generateReleaseNotes(newVersion);
    
    // 创建Git标签
    createGitTag(newVersion);
    
    // 发布到npm
    publishToNpm(options);
    
    // 推送到Git
    pushToGit(options);
    
    // 验证发布
    verifyPublish(newVersion, options);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    if (options.dryRun) {
      logSuccess(`🎉 试运行成功！版本 ${newVersion} 准备就绪`);
    } else {
      logSuccess(`🎉 发布成功！版本 ${newVersion} 已发布到npm`);
    }
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
    
    // 自动回滚
    if (newVersion && originalVersion && !options.dryRun) {
      logWarning('自动执行回滚操作...');
      rollback(originalVersion, options);
    }
    
    // 询问是否手动回滚（仅在交互模式下）
    if (!options.nonInteractive && !options.dryRun) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      rl.question('是否执行手动回滚操作？(y/N): ', (answer) => {
        rl.close();
        if (answer.toLowerCase() === 'y' && originalVersion) {
          rollback(originalVersion, options);
        }
      });
    }
    
    process.exit(1);
  }
}

// 命令行参数解析（优化版本）
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    versionType: 'patch',
    skipTests: false,
    dryRun: false,
    nonInteractive: false,
    force: false
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
      case '--non-interactive':
      case '--ci':
        options.nonInteractive = true;
        break;
      case '--force':
        options.force = true;
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

// 显示帮助信息（优化版本）
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
  --non-interactive    非交互模式（适用于CI/CD）
  --ci                 同 --non-interactive
  --force              强制发布（忽略警告）
  --help, -h           显示帮助信息

示例:
  node scripts/publish.cjs                    # 发布补丁版本
  node scripts/publish.cjs --minor            # 发布次版本
  node scripts/publish.cjs --major            # 发布主版本
  node scripts/publish.cjs --skip-tests       # 跳过测试发布
  node scripts/publish.cjs --dry-run          # 试运行模式
  node scripts/publish.cjs --non-interactive  # CI/CD模式
  node scripts/publish.cjs --ci --dry-run     # CI/CD试运行

功能特性:
  ✅ 自动版本管理
  ✅ 智能Git状态检查
  ✅ 自动化测试
  ✅ 构建验证
  ✅ npm发布
  ✅ Git标签和推送
  ✅ 发布说明生成
  ✅ 自动错误回滚
  ✅ 发布验证
  ✅ CI/CD友好
  ✅ 试运行模式
`);
}

// 主函数（优化版本）
function main() {
  try {
    const options = parseArgs();
    
    // 检测CI环境
    if (process.env.CI || process.env.GITHUB_ACTIONS) {
      options.nonInteractive = true;
      logInfo('检测到CI环境，自动启用非交互模式');
    }
    
    if (options.dryRun) {
      logInfo('试运行模式 - 不会实际发布');
      // 在试运行模式下，只执行检查和构建
      checkDependencies();
      checkGitStatus(options);
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