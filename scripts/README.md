# 发布脚本说明

## 📦 可用的发布脚本

### 1. `publish.cjs` - 完整发布脚本 (主要)
- **功能**: 完整的发布流程，包含所有检查和验证
- **特点**: 错误处理、回滚机制、详细日志
- **使用**: `node scripts/publish.cjs [选项]`

### 2. `quick-publish.js` - 快速发布脚本
- **功能**: 简化的发布流程，适合日常使用
- **特点**: 快速、简单、自动化
- **使用**: `node scripts/quick-publish.js`

## 🚀 快速开始

### 最简单的发布方式
```bash
# 快速发布补丁版本
npm run publish:quick

# 或者使用完整脚本
npm run publish:patch
```

### 常用发布命令
```bash
# 补丁版本 (Bug修复)
npm run publish:patch

# 次版本 (新功能)
npm run publish:minor

# 主版本 (破坏性变更)
npm run publish:major

# 试运行 (不实际发布)
npm run publish:dry-run

# 跳过测试发布
npm run publish:skip-tests
```

## 🔧 脚本选项

### 版本类型
- `--patch` - 补丁版本 (0.0.x)
- `--minor` - 次版本 (0.x.0)
- `--major` - 主版本 (x.0.0)

### 其他选项
- `--skip-tests` - 跳过测试
- `--dry-run` - 试运行模式
- `--help` - 显示帮助信息

## 📋 发布流程

### 自动执行的步骤
1. **依赖检查** - 检查Node.js、npm、Git
2. **Git状态检查** - 确保没有未提交的更改
3. **运行测试** - 执行测试套件
4. **构建项目** - 运行构建命令
5. **检查构建输出** - 验证构建结果
6. **更新版本号** - 自动递增版本号
7. **生成发布说明** - 基于Git提交生成更新日志
8. **创建Git标签** - 创建版本标签
9. **发布到npm** - 发布包到npm注册表
10. **推送到Git** - 推送代码和标签
11. **验证发布** - 验证包是否成功发布

### 错误处理
- 自动回滚机制
- 详细的错误日志
- 用户确认提示

## 🚨 故障排除

### 常见问题

1. **npm登录失败**
   ```bash
   npm login
   npm whoami
   ```

2. **Git推送失败**
   ```bash
   git remote -v
   git push -u origin main
   ```

3. **构建失败**
   ```bash
   npm run build
   npm run type-check
   ```

4. **权限错误**
   ```bash
   npm access ls-packages
   npm access grant read-write @your-org:username @your-org/sso-auth-ui
   ```

### 调试模式
```bash
# 启用详细日志
DEBUG=* node scripts/publish.cjs

# 试运行模式
node scripts/publish.cjs --dry-run
```

## 📊 监控和日志

### 日志文件
- 发布日志保存在 `logs/publish.log`
- 错误日志保存在 `logs/error.log`

### 监控指标
- 发布成功率
- 构建时间
- 错误率统计 