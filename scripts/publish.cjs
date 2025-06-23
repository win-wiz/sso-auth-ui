#!/usr/bin/env node

/**
 * SSO Auth UI 自动化发布脚本
 * 使用方法: node scripts/publish.cjs [选项]
 */

const { execSync } = require('child_process');
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
    return execSync(command, {
      stdio: 'inherit',
      encoding: 'utf8',
      ...options
    });
  } catch (error) {
    logError(`命令执行失败: ${command}`);
    throw error;
  }
}

// 执行命令（静默模式）
function execCommandSilent(command, options = {}) {
  try {
    return execSync(command, {
      stdio: 'pipe',
      encoding: 'utf8',
      ...options
    });
  } catch (error) {
    // 错误在调用处处理
    return null;
  }
}

function readPackageJson() {
  const packagePath = path.join(process.cwd(), 'package.json');
  return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
}

function writePackageJson(data) {
  const packagePath = path.join(process.cwd(), 'package.json');
  fs.writeFileSync(packagePath, JSON.stringify(data, null, 2) + '\n');
}

function getCurrentVersion() {
  return readPackageJson().version;
}

function incrementVersion(version, type) {
  const [major, minor, patch] = version.split('.').map(Number);
  switch (type) {
    case 'major': return `${major + 1}.0.0`;
    case 'minor': return `${major}.${minor + 1}.0`;
    default: return `${major}.${minor}.${patch + 1}`;
  }
}

async function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

async function checkGitStatus(options) {
  logStep('检查Git状态');
  const status = execCommandSilent('git status --porcelain');
  if (status) {
    logWarning('发现未提交的更改:');
    console.log(status.trim());
    if (options.nonInteractive) {
      logWarning('非交互模式，发布已取消。请先提交更改。');
      process.exit(1);
    }
    const answer = await askQuestion('是否继续发布？(y/N): ');
    if (answer.toLowerCase() !== 'y') {
      logError('发布已取消');
      process.exit(1);
    }
  }

  const currentBranch = execCommandSilent('git rev-parse --abbrev-ref HEAD');
  if (currentBranch && !['main', 'master'].includes(currentBranch.trim())) {
    logWarning(`当前不在主分支上，分支: ${currentBranch.trim()}`);
    if (options.nonInteractive) {
      logWarning('非交互模式，继续发布...');
    } else {
        const answer = await askQuestion('是否继续发布？(y/N): ');
        if (answer.toLowerCase() !== 'y') {
            logError('发布已取消');
            process.exit(1);
        }
    }
  }

  logSuccess('Git状态检查通过');
}


function runBuild() {
    logStep('构建项目');
    execCommand('npm run build');
    logSuccess('构建成功');
}

function updateVersionInPackageJson(versionType) {
  logStep('更新版本号');
  const currentVersion = getCurrentVersion();
  const newVersion = incrementVersion(currentVersion, versionType);
  const pkg = readPackageJson();
  pkg.version = newVersion;
  writePackageJson(pkg);
  logSuccess(`版本已更新: ${currentVersion} -> ${newVersion}`);
  return newVersion;
}

function createCommitAndTag(version) {
    logStep('创建Git提交和标签');
    execCommand(`git add package.json`);
    execCommand(`git commit -m "chore: release v${version}"`);
    execCommand(`git tag v${version}`);
    logSuccess(`已创建提交和标签 v${version}`);
}

function publishToNpm() {
  logStep('发布到npm');
  execCommand('npm publish');
  logSuccess('成功发布到npm');
}

function pushToGit() {
    logStep('推送到Git');
    execCommand('git push origin --follow-tags');
    logSuccess('成功推送到Git');
}

async function rollback(version, options) {
    logStep('执行回滚');
    let shouldRollback = !options.nonInteractive;

    if (options.nonInteractive) {
        shouldRollback = true;
    } else {
        const answer = await askQuestion('是否回滚？(y/N): ');
        shouldRollback = answer.toLowerCase() === 'y';
    }
    
    if (shouldRollback) {
        try {
            execCommandSilent(`git tag -d v${version}`);
            execCommand('git reset --hard HEAD~1');
            logSuccess('回滚成功');
        } catch (e) {
            logError(`回滚失败: ${e.message}`);
        }
    }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    versionType: 'patch',
    nonInteractive: false,
  };

  args.forEach(arg => {
    if (['--major', '--minor', '--patch'].includes(arg)) {
      options.versionType = arg.replace('--', '');
    } else if (arg === '--ci' || arg === '--non-interactive') {
      options.nonInteractive = true;
    }
  });

  if (process.env.CI || process.env.GITHUB_ACTIONS) {
    options.nonInteractive = true;
    logInfo('检测到CI环境，已自动启用非交互模式');
  }

  return options;
}

async function main() {
  const options = parseArgs();
  let newVersion;

  try {
    await checkGitStatus(options);
    runBuild();
    newVersion = updateVersionInPackageJson(options.versionType);
    createCommitAndTag(newVersion);
    publishToNpm();
    pushToGit();
    logSuccess(`🎉 版本 ${newVersion} 发布成功!`);
  } catch (error) {
    logError('发布失败');
    if (newVersion) {
      await rollback(newVersion, options);
    }
    process.exit(1);
  }
}

main().catch(err => {
    logError('脚本执行时发生未知错误');
    console.error(err);
    process.exit(1);
}); 