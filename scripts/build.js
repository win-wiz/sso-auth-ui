#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始构建 sso-auth-ui...\n');

// 检查环境
const nodeVersion = process.version;
console.log(`📋 Node.js 版本: ${nodeVersion}`);

// 清理构建目录
console.log('🧹 清理构建目录...');
try {
  execSync('npm run clean', { stdio: 'inherit' });
  console.log('✅ 清理完成\n');
} catch (error) {
  console.error('❌ 清理失败:', error.message);
  process.exit(1);
}

// 类型检查
console.log('🔍 运行类型检查...');
try {
  execSync('npm run type-check', { stdio: 'inherit' });
  console.log('✅ 类型检查通过\n');
} catch (error) {
  console.error('❌ 类型检查失败:', error.message);
  process.exit(1);
}

// 构建项目
console.log('📦 构建项目...');
try {
  const buildCommand = process.env.NODE_ENV === 'production' 
    ? 'npm run build:prod' 
    : 'npm run build';
  
  execSync(buildCommand, { stdio: 'inherit' });
  console.log('✅ 构建完成\n');
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}

// 验证构建输出
console.log('🔍 验证构建输出...');
const distPath = path.join(__dirname, '../dist');
const requiredFiles = [
  'index.js',
  'index.esm.js',
  'index.d.ts',
  'themes/index.js',
  'themes/index.esm.js',
  'themes/index.d.ts',
  'hooks/index.js',
  'hooks/index.esm.js',
  'hooks/index.d.ts',
  'types/index.js',
  'types/index.esm.js',
  'types/index.d.ts'
];

let allFilesExist = true;
for (const file of requiredFiles) {
  const filePath = path.join(distPath, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 缺少文件: ${file}`);
    allFilesExist = false;
  }
}

if (!allFilesExist) {
  console.error('❌ 构建输出验证失败');
  process.exit(1);
}

console.log('✅ 构建输出验证通过\n');

// 显示构建统计
try {
  const stats = fs.statSync(path.join(distPath, 'index.js'));
  const sizeKB = (stats.size / 1024).toFixed(2);
  console.log(`📊 构建统计:`);
  console.log(`   - 主包大小: ${sizeKB} KB`);
  console.log(`   - 输出文件: ${requiredFiles.length} 个`);
  console.log(`   - 构建时间: ${new Date().toLocaleTimeString()}`);
} catch (error) {
  console.warn('⚠️ 无法获取构建统计信息');
}

console.log('\n🎉 构建成功完成！');
console.log('📁 输出目录: dist/');
console.log('📦 准备发布: npm run publish'); 