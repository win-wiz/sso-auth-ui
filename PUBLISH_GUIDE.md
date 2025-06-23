# 发布指南

## 🚀 自动化发布脚本

我们提供了多个自动化发布脚本，帮助您轻松管理包的发布流程。

## 📦 可用的发布脚本

### 1. Node.js 脚本 (推荐)

```bash
# 发布补丁版本 (0.0.x)
node scripts/publish.cjs

# 发布次版本 (0.x.0)
node scripts/publish.cjs --minor

# 发布主版本 (x.0.0)
node scripts/publish.cjs --major

# 跳过测试发布
node scripts/publish.cjs --skip-tests

# 试运行模式（不实际发布）
node scripts/publish.cjs --dry-run
```

### 2. Shell 脚本

```bash
# 给脚本执行权限
chmod +x scripts/publish.sh

# 发布补丁版本
./scripts/publish.sh

# 发布次版本
./scripts/publish.sh --minor

# 发布主版本
./scripts/publish.sh --major

# 跳过测试发布
./scripts/publish.sh --skip-tests

# 试运行模式
./scripts/publish.sh --dry-run
```

### 3. ES6 模块脚本

```bash
# 发布补丁版本
node scripts/publish.js

# 发布次版本
node scripts/publish.js --minor

# 发布主版本
node scripts/publish.js --major
```

## 🔧 发布流程

### 自动执行的步骤

1. **依赖检查** - 检查Node.js、npm、Git等必需工具
2. **Git状态检查** - 确保没有未提交的更改
3. **运行测试** - 执行测试套件（可跳过）
4. **构建项目** - 运行构建命令
5. **检查构建输出** - 验证构建结果
6. **更新版本号** - 自动递增版本号
7. **生成发布说明** - 基于Git提交生成更新日志
8. **创建Git标签** - 创建版本标签
9. **发布到npm** - 发布包到npm注册表
10. **推送到Git** - 推送代码和标签到远程仓库
11. **验证发布** - 验证包是否成功发布

### 错误处理和回滚

- 如果发布过程中出现错误，脚本会自动询问是否执行回滚
- 回滚操作包括：删除Git标签、重置提交、恢复版本号
- 所有操作都有详细的日志输出

## 📋 发布前检查清单

### 必需条件

- [ ] 已登录npm (`npm login`)
- [ ] 在正确的分支上 (main/master)
- [ ] 没有未提交的更改
- [ ] 所有测试通过
- [ ] 构建成功
- [ ] 代码审查完成

### 推荐检查

- [ ] 更新README.md
- [ ] 更新CHANGELOG.md
- [ ] 检查package.json中的信息
- [ ] 验证所有示例正常工作
- [ ] 检查文档是否最新

## 🎯 版本管理

### 版本类型

- **补丁版本 (patch)** - Bug修复，向后兼容
  - 命令: `--patch` 或默认
  - 示例: 1.0.0 → 1.0.1

- **次版本 (minor)** - 新功能，向后兼容
  - 命令: `--minor`
  - 示例: 1.0.0 → 1.1.0

- **主版本 (major)** - 破坏性变更
  - 命令: `--major`
  - 示例: 1.0.0 → 2.0.0

### 版本号规则

遵循 [语义化版本控制](https://semver.org/lang/zh-CN/) 规范：

- **主版本号**: 不兼容的API修改
- **次版本号**: 向下兼容的功能性新增
- **修订号**: 向下兼容的问题修正

## 🔐 安全发布

### npm 配置

```bash
# 设置npm发布配置
npm config set access public
npm config set registry https://registry.npmjs.org/

# 检查当前用户
npm whoami

# 检查包名是否可用
npm view @your-org/sso-auth-ui
```

### 发布标签

- **latest** - 稳定版本（默认）
- **beta** - 测试版本
- **alpha** - 开发版本

```bash
# 发布测试版本
npm publish --tag beta

# 发布开发版本
npm publish --tag alpha
```

## 📝 发布说明

### 自动生成

脚本会自动生成发布说明，包含：

- 版本信息
- 更新内容（基于Git提交）
- 安装命令
- 发布时间

### 手动编写

如果需要手动编写发布说明：

1. 创建 `RELEASE_NOTES.md` 文件
2. 使用以下模板：

```markdown
# 版本 1.0.0 发布说明

## 🎉 新功能
- 新增登录表单组件
- 支持SSO登录
- 添加主题定制功能

## 🐛 Bug修复
- 修复移动端显示问题
- 解决TypeScript类型错误

## 🔧 改进
- 优化构建性能
- 更新依赖版本

## 📦 安装
```bash
npm install @your-org/sso-auth-ui@1.0.0
```

## 🔗 相关链接
- [文档](https://your-org.github.io/sso-auth-ui)
- [更新日志](https://github.com/your-org/sso-auth-ui/blob/main/CHANGELOG.md)
```

## 🚨 常见问题

### 1. npm登录失败

```bash
# 清除npm缓存
npm cache clean --force

# 重新登录
npm login

# 检查登录状态
npm whoami
```

### 2. 包名冲突

```bash
# 检查包名是否可用
npm view @your-org/sso-auth-ui

# 如果包名被占用，需要修改package.json中的name字段
```

### 3. 发布权限错误

```bash
# 检查是否有发布权限
npm access ls-packages

# 如果是组织包，确保有发布权限
npm access grant read-write @your-org:your-username @your-org/sso-auth-ui
```

### 4. Git推送失败

```bash
# 检查远程仓库配置
git remote -v

# 添加远程仓库
git remote add origin https://github.com/your-org/sso-auth-ui.git

# 推送代码
git push -u origin main
```

## 🔄 CI/CD 集成

### GitHub Actions

```yaml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: npm test
      - run: npm run build
      
      - run: node scripts/publish.cjs
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### GitLab CI

```yaml
publish:
  stage: deploy
  only:
    - tags
  script:
    - npm ci
    - npm test
    - npm run build
    - node scripts/publish.cjs
  environment:
    name: production
```

## 📊 发布监控

### 发布后检查

1. **npm包页面** - 检查包是否成功发布
2. **安装测试** - 测试新版本是否可以正常安装
3. **功能测试** - 验证新功能是否正常工作
4. **文档更新** - 确保文档反映最新版本

### 监控指标

- 下载量统计
- 错误报告
- 用户反馈
- 性能指标

## 🛠️ 自定义配置

### 修改发布配置

编辑 `scripts/publish.config.js` 文件：

```javascript
module.exports = {
  publish: {
    npm: {
      tag: 'latest',
      access: 'public'
    },
    git: {
      remote: 'origin',
      pushBranch: true
    }
  }
};
```

### 添加自定义脚本

在 `package.json` 中添加发布脚本：

```json
{
  "scripts": {
    "publish:patch": "node scripts/publish.cjs --patch",
    "publish:minor": "node scripts/publish.cjs --minor",
    "publish:major": "node scripts/publish.cjs --major",
    "publish:dry-run": "node scripts/publish.cjs --dry-run"
  }
}
```

## 📞 获取帮助

如果遇到发布问题：

1. 查看错误日志
2. 运行试运行模式 (`--dry-run`)
3. 检查发布前检查清单
4. 联系维护团队

---

**开始发布吧！** �� 使用自动化脚本，让发布变得简单可靠。 