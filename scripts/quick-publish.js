#!/usr/bin/env node

/**
 * 快速发布脚本
 * 简化发布流程，适合日常使用
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

// 执行命令
function execCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    return false;
  }
}

// 检查Git状态
function checkGitStatus() {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  return status.trim() === '';
}

// 获取当前版本
function getCurrentVersion() {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return pkg.version;
}

// 快速发布流程
function quickPublish() {
  log(`${colors.bright}${colors.magenta}🚀 快速发布${colors.reset}`);
  
  // 1. 检查Git状态
  logInfo('检查Git状态...');
  if (!checkGitStatus()) {
    logError('有未提交的更改，请先提交或暂存');
    process.exit(1);
  }
  
  // 2. 构建项目
  logInfo('构建项目...');
  if (!execCommand('npm run build')) {
    logError('构建失败');
    process.exit(1);
  }
  
  // 3. 类型检查
  logInfo('类型检查...');
  if (!execCommand('npm run type-check')) {
    logError('类型检查失败');
    process.exit(1);
  }
  
  // 4. 更新版本号
  const currentVersion = getCurrentVersion();
  logInfo(`当前版本: ${currentVersion}`);
  
  if (!execCommand('npm version patch --no-git-tag-version')) {
    logError('版本更新失败');
    process.exit(1);
  }
  
  const newVersion = getCurrentVersion();
  logInfo(`新版本: ${newVersion}`);
  
  // 5. 提交更改
  if (!execCommand('git add package.json')) {
    logError('Git添加失败');
    process.exit(1);
  }
  
  if (!execCommand(`git commit -m "chore: bump version to ${newVersion}"`)) {
    logError('Git提交失败');
    process.exit(1);
  }
  
  // 6. 创建标签
  if (!execCommand(`git tag v${newVersion}`)) {
    logError('Git标签创建失败');
    process.exit(1);
  }
  
  // 7. 发布到npm
  logInfo('发布到npm...');
  if (!execCommand('npm publish')) {
    logError('npm发布失败');
    process.exit(1);
  }
  
  // 8. 推送到Git
  logInfo('推送到Git...');
  if (!execCommand('git push origin HEAD')) {
    logError('Git推送失败');
    process.exit(1);
  }
  
  if (!execCommand('git push --tags')) {
    logError('Git标签推送失败');
    process.exit(1);
  }
  
  logSuccess(`🎉 发布成功！版本 ${newVersion} 已发布`);
  logInfo(`📦 安装命令: npm install @your-org/sso-auth-ui@${newVersion}`);
}

// 主函数
function main() {
  try {
    quickPublish();
  } catch (error) {
    logError('发布失败');
    console.error(error);
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = { quickPublish }; 