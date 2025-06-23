# @tjsglion/sso-auth-ui API 文档

## 📋 目录

- [概述](#概述)
- [安装](#安装)
- [快速开始](#快速开始)
- [配置](#配置)
- [组件](#组件)
- [Hooks](#hooks)
- [主题](#主题)
- [类型定义](#类型定义)
- [示例](#示例)
- [最佳实践](#最佳实践)
- [故障排除](#故障排除)

## 📖 概述

`@tjsglion/sso-auth-ui` 是一个功能完整的 React 认证 UI 组件库，支持多种认证方式：

- 🔐 邮箱密码登录/注册
- 📱 手机号验证码登录
- 🌐 SSO 单点登录（OAuth2/OIDC）
- 🔒 双因素认证 (2FA)
- 🎨 高度可定制的主题系统
- 📱 响应式设计

## 📦 安装

```bash
# npm
npm install @tjsglion/sso-auth-ui

# yarn
yarn add @tjsglion/sso-auth-ui

# pnpm
pnpm add @tjsglion/sso-auth-ui
```

## 🚀 快速开始

### 基础用法

```tsx
import React from 'react';
import { UnifiedAuthForm, AuthConfig } from '@tjsglion/sso-auth-ui';

const authConfig: AuthConfig = {
  apiUrl: 'https://your-api.com',
  appName: 'My App',
  authMethods: {
    emailPassword: { enabled: true },
    sso: {
      enabled: true,
      providers: [
        { id: 'google', name: 'Google', type: 'oauth2', clientId: 'google-client-id', iconSvg: '...' },
      ],
    },
  },
};

const App = () => {
  const handleLoginSuccess = (user: any) => {
    console.log('登录成功:', user);
  };

  return (
    <UnifiedAuthForm
      config={authConfig}
      onLoginSuccess={handleLoginSuccess}
    />
  );
};
```

### 使用 AuthProvider

```tsx
import { AuthProvider, useAuthContext } from '@tjsglion/sso-auth-ui';

const UserProfile = () => {
  const { user, logout } = useAuthContext();
  
  return (
    <div>
      <h1>欢迎, {user?.name}!</h1>
      <button onClick={logout}>退出登录</button>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider config={authConfig}>
      <UserProfile />
    </AuthProvider>
  );
};
```

## ⚙️ 配置

### AuthConfig

认证配置接口：

```tsx
interface AuthConfig {
  // 基础配置
  apiUrl: string;                    // API 基础 URL
  appName?: string;                  // 应用名称
  appLogo?: string;                  // 应用 Logo URL
  redirectUrl?: string;              // 重定向 URL
  
  // 认证方式配置
  authMethods: {
    // 邮箱密码登录
    emailPassword?: {
      enabled: boolean;              // 是否启用
      requireEmailVerification?: boolean;  // 是否需要邮箱验证
      allowRegistration?: boolean;   // 是否允许注册
      allowPasswordReset?: boolean;  // 是否允许密码重置
    };
    
    // 双因素认证
    twoFactor?: {
      enabled: boolean;              // 是否启用
      allowSetup?: boolean;          // 是否允许用户设置
      totpIssuer?: string;           // TOTP 发行者名称
      totpLabel?: string;            // TOTP 标签
    };
    
    // SSO 单点登录
    sso?: {
      enabled: boolean;              // 是否启用
      providers?: SSOProvider[];     // SSO 提供商列表
    };
    
    // 手机号登录
    phone?: {
      enabled: boolean;              // 是否启用
      allowRegistration?: boolean;   // 是否允许注册
      requireSmsVerification?: boolean;  // 是否需要短信验证
    };
    
    // 验证码登录
    captcha?: {
      enabled: boolean;              // 是否启用
      type?: 'image' | 'sms' | 'email';  // 验证码类型
    };
  };
  
  // 认证流程配置
  authFlow?: {
    autoRedirect?: boolean;          // 登录后是否自动跳转
    successRedirectUrl?: string;     // 登录成功后的跳转 URL
    rememberMe?: boolean;            // 是否记住登录状态
    sessionTimeout?: number;         // 会话超时时间（分钟）
  };
}
```

### 配置示例

#### 仅邮箱密码登录

```tsx
const emailOnlyConfig: AuthConfig = {
  apiUrl: 'https://your-api.com',
  authMethods: {
    emailPassword: { 
      enabled: true, 
      allowRegistration: true 
    },
    sso: { enabled: false },
    phone: { enabled: false },
    twoFactor: { enabled: false },
  },
};
```

#### 企业级配置

```tsx
const enterpriseConfig: AuthConfig = {
  apiUrl: 'https://your-api.com',
  authMethods: {
    emailPassword: {
      enabled: true,
      requireEmailVerification: true,
      allowRegistration: false,  // 企业用户由管理员创建
    },
    twoFactor: {
      enabled: true,
      allowSetup: true,
      totpIssuer: 'Enterprise App',
    },
    sso: {
      enabled: true,
      providers: [
        { id: 'azure', name: 'Azure AD', type: 'oauth2', clientId: 'azure-client-id', iconSvg: '...' },
        { id: 'okta', name: 'Okta', type: 'oauth2', clientId: 'okta-client-id', iconSvg: '...' },
      ],
    },
    phone: { enabled: false },
  },
};
```

## 🧩 组件

### UnifiedAuthForm

统一认证表单组件，支持多种认证方式切换。

```tsx
<UnifiedAuthForm
  config={authConfig}
  theme={customTheme}
  onLoginSuccess={handleLoginSuccess}
  onLoginError={handleLoginError}
  defaultMethod="email"
  showMethodSwitch={true}
  methodOrder={['email', 'phone', 'sso']}
  className="custom-auth-form"
/>
```

**Props:**

- `config: AuthConfig` - 认证配置
- `theme?: ThemeConfig` - 主题配置
- `onLoginSuccess?: (user: any) => void` - 登录成功回调
- `onLoginError?: (error: Error) => void` - 登录失败回调
- `defaultMethod?: AuthMethod` - 默认认证方式
- `showMethodSwitch?: boolean` - 是否显示认证方式切换
- `methodOrder?: AuthMethod[]` - 认证方式顺序
- `className?: string` - 自定义样式类名

### LoginForm

邮箱密码登录表单组件。

```tsx
<LoginForm
  config={authConfig}
  theme={customTheme}
  onLoginSuccess={handleLoginSuccess}
  onLoginError={handleLoginError}
  showRememberMe={true}
  showForgotPassword={true}
  className="custom-login-form"
/>
```

**Props:**

- `config: AuthConfig` - 认证配置
- `theme?: ThemeConfig` - 主题配置
- `onLoginSuccess?: (user: any) => void` - 登录成功回调
- `onLoginError?: (error: Error) => void` - 登录失败回调
- `showRememberMe?: boolean` - 是否显示"记住我"选项
- `showForgotPassword?: boolean` - 是否显示"忘记密码"链接
- `className?: string` - 自定义样式类名

### RegisterForm

用户注册表单组件。

```tsx
<RegisterForm
  config={authConfig}
  theme={customTheme}
  onRegisterSuccess={handleRegisterSuccess}
  onRegisterError={handleRegisterError}
  confirmPassword={true}
  termsUrl="/terms"
  privacyUrl="/privacy"
  className="custom-register-form"
/>
```

**Props:**

- `config: AuthConfig` - 认证配置
- `theme?: ThemeConfig` - 主题配置
- `onRegisterSuccess?: (user: any) => void` - 注册成功回调
- `onRegisterError?: (error: Error) => void` - 注册失败回调
- `confirmPassword?: boolean` - 是否显示密码确认字段
- `termsUrl?: string` - 用户协议 URL
- `privacyUrl?: string` - 隐私政策 URL
- `className?: string` - 自定义样式类名

### TwoFactorAuth

双因素认证验证组件。

```tsx
<TwoFactorAuth
  onVerify={handle2FAVerify}
  onCancel={handle2FACancel}
  theme={customTheme}
  className="custom-2fa-form"
/>
```

**Props:**

- `onVerify: (code: string) => void` - 验证回调
- `onCancel: () => void` - 取消回调
- `theme?: ThemeConfig` - 主题配置
- `className?: string` - 自定义样式类名

### TwoFactorSetup

双因素认证设置组件。

```tsx
<TwoFactorSetup
  qrCodeUrl="data:image/png;base64,..."
  secretKey="JBSWY3DPEHPK3PXP"
  onEnable={handle2FAEnable}
  onCancel={handle2FACancel}
  theme={customTheme}
  className="custom-2fa-setup"
/>
```

**Props:**

- `qrCodeUrl: string` - QR 码 URL
- `secretKey: string` - 密钥
- `onEnable: (code: string) => void` - 启用回调
- `onCancel: () => void` - 取消回调
- `theme?: ThemeConfig` - 主题配置
- `className?: string` - 自定义样式类名

### PhoneAuth

手机号登录组件。

```tsx
<PhoneAuth
  phone=""
  code=""
  onSendCode={handleSendCode}
  onVerify={handlePhoneVerify}
  theme={customTheme}
  className="custom-phone-auth"
/>
```

**Props:**

- `phone: string` - 手机号
- `code: string` - 验证码
- `onSendCode: (phone: string) => void` - 发送验证码回调
- `onVerify: (phone: string, code: string) => void` - 验证回调
- `theme?: ThemeConfig` - 主题配置
- `className?: string` - 自定义样式类名

### SSOButtons

SSO 登录按钮组件。

```tsx
<SSOButtons
  providers={ssoProviders}
  onSSOClick={handleSSOClick}
  theme={customTheme}
  className="custom-sso-buttons"
/>
```

**Props:**

- `providers: SSOProvider[]` - SSO 提供商列表
- `onSSOClick: (provider: SSOProvider) => void` - 点击 SSO 按钮回调
- `theme?: ThemeConfig` - 主题配置
- `className?: string` - 自定义样式类名

### AuthProvider

认证上下文提供者组件。

```tsx
<AuthProvider config={authConfig}>
  <YourApp />
</AuthProvider>
```

**Props:**

- `config: AuthConfig` - 认证配置
- `children: React.ReactNode` - 子组件

## 🎣 Hooks

### useAuthContext

获取认证上下文，必须在 `AuthProvider` 内部使用。

```tsx
const { 
  user, 
  loading, 
  login, 
  register, 
  logout, 
  loginWithSSO, 
  verify2FA, 
  checkAuth 
} = useAuthContext();
```

**返回值:**

- `user: any | null` - 当前用户信息
- `loading: boolean` - 是否正在加载
- `login: (credentials: LoginCredentials) => Promise<void>` - 登录方法
- `register: (credentials: RegisterCredentials) => Promise<void>` - 注册方法
- `logout: () => Promise<void>` - 登出方法
- `loginWithSSO: (provider: SSOProvider) => Promise<void>` - SSO 登录方法
- `verify2FA: (code: string) => Promise<void>` - 2FA 验证方法
- `checkAuth: () => Promise<void>` - 检查认证状态方法

### useAuth

直接使用认证逻辑，不需要 `AuthProvider`。

```tsx
const auth = useAuth(authConfig);
```

**参数:**

- `config: AuthConfig` - 认证配置

**返回值:** 同 `useAuthContext`

## 🎨 主题

### ThemeConfig

主题配置接口：

```tsx
interface ThemeConfig {
  primaryColor?: string;             // 主色调
  backgroundColor?: string;          // 背景色
  textColor?: string;                // 文字颜色
  borderColor?: string;              // 边框颜色
  errorColor?: string;               // 错误颜色
  successColor?: string;             // 成功颜色
  borderRadius?: string;             // 圆角大小
  boxShadow?: string;                // 阴影
}
```

### 预设主题

```tsx
import { defaultTheme, darkTheme, createTheme } from '@tjsglion/sso-auth-ui';

// 使用默认主题
const defaultConfig = { theme: defaultTheme };

// 使用暗色主题
const darkConfig = { theme: darkTheme };

// 创建自定义主题
const customTheme = createTheme({
  primaryColor: '#8b5cf6',
  backgroundColor: '#f8fafc',
  borderRadius: '0.75rem',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
});
```

### 主题示例

#### 现代简约主题

```tsx
const modernTheme = createTheme({
  primaryColor: '#3b82f6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  borderColor: '#e5e7eb',
  borderRadius: '0.5rem',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
});
```

#### 暗色主题

```tsx
const darkTheme = createTheme({
  primaryColor: '#60a5fa',
  backgroundColor: '#1f2937',
  textColor: '#f9fafb',
  borderColor: '#374151',
  borderRadius: '0.5rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
});
```

## 📝 类型定义

### 核心类型

```tsx
// 认证方式
type AuthMethod = 'email' | 'phone' | 'sso' | '2fa';

// 登录凭据
interface LoginCredentials {
  email?: string;
  password?: string;
  phone?: string;
  code?: string;
  totpCode?: string;
  rememberMe?: boolean;
}

// 注册凭据
interface RegisterCredentials {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  code?: string;
}

// SSO 提供商
interface SSOProvider {
  id: string;
  name: string;
  type: string;
  clientId: string;
  iconSvg?: string;
  iconBackgroundColor?: string;
  iconColor?: string;
}
```

## 📚 示例

### 完整示例

```tsx
import React from 'react';
import {
  AuthProvider,
  UnifiedAuthForm,
  useAuthContext,
  AuthConfig,
  createTheme,
} from '@tjsglion/sso-auth-ui';

const authConfig: AuthConfig = {
  apiUrl: 'https://your-api.com',
  appName: 'My App',
  appLogo: '/logo.png',
  authMethods: {
    emailPassword: {
      enabled: true,
      allowRegistration: true,
      allowPasswordReset: true,
    },
    sso: {
      enabled: true,
      providers: [
        { id: 'google', name: 'Google', type: 'oauth2', clientId: 'google-client-id', iconSvg: '...' },
        { id: 'github', name: 'GitHub', type: 'oauth2', clientId: 'github-client-id', iconSvg: '...' },
      ],
    },
    phone: { enabled: true },
    twoFactor: { enabled: true },
  },
  authFlow: {
    autoRedirect: true,
    successRedirectUrl: '/dashboard',
    rememberMe: true,
  },
};

const customTheme = createTheme({
  primaryColor: '#8b5cf6',
  backgroundColor: '#f8fafc',
  borderRadius: '0.75rem',
});

const AuthApp = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>加载中...</div>;
  }

  if (user) {
    return (
      <div>
        <h1>欢迎, {user.name}!</h1>
        <button onClick={() => logout()}>退出登录</button>
      </div>
    );
  }

  return (
    <UnifiedAuthForm
      config={authConfig}
      theme={customTheme}
      onLoginSuccess={(user) => console.log('登录成功:', user)}
      onLoginError={(error) => console.error('登录失败:', error)}
    />
  );
};

const App = () => {
  return (
    <AuthProvider config={authConfig}>
      <AuthApp />
    </AuthProvider>
  );
};
```

## 🎯 最佳实践

### 1. 配置管理

```tsx
// 将配置集中管理
const authConfig: AuthConfig = {
  apiUrl: process.env.REACT_APP_API_URL,
  appName: 'My App',
  authMethods: {
    emailPassword: { enabled: true },
    sso: { 
      enabled: process.env.NODE_ENV === 'production',
      providers: getSSOProviders(),
    },
  },
};
```

### 2. 错误处理

```tsx
const handleLoginError = (error: Error) => {
  // 根据错误类型显示不同的提示
  if (error.message.includes('Invalid credentials')) {
    showToast('邮箱或密码错误', 'error');
  } else if (error.message.includes('Network error')) {
    showToast('网络连接失败，请检查网络', 'error');
  } else {
    showToast('登录失败，请稍后重试', 'error');
  }
};
```

### 3. 主题定制

```tsx
// 根据品牌定制主题
const brandTheme = createTheme({
  primaryColor: brandColors.primary,
  backgroundColor: brandColors.background,
  borderRadius: brandConfig.borderRadius,
});
```

### 4. 响应式设计

```tsx
// 在移动端隐藏某些功能
const mobileConfig = {
  ...authConfig,
  authMethods: {
    ...authConfig.authMethods,
    phone: { 
      enabled: true,
      allowRegistration: true,
    },
  },
};
```

## 🔧 故障排除

### 常见问题

#### 1. TypeScript 类型错误

**问题:** `Property 'enableSSO' does not exist on type 'AuthConfig'`

**解决方案:** 使用新的配置结构：

```tsx
// ❌ 旧版本
const config = {
  enableSSO: true,
  ssoProviders: [...],
};

// ✅ 新版本
const config = {
  authMethods: {
    sso: {
      enabled: true,
      providers: [...],
    },
  },
};
```

#### 2. SSO 登录失败

**问题:** SSO 登录后无法获取用户信息

**解决方案:** 确保后端实现了正确的回调处理：

```tsx
// 检查回调 URL 配置
const config = {
  redirectUrl: `${window.location.origin}/auth/callback`,
};
```

#### 3. 主题不生效

**问题:** 自定义主题没有应用

**解决方案:** 确保主题配置正确：

```tsx
const theme = createTheme({
  primaryColor: '#3b82f6',  // 使用有效的颜色值
  borderRadius: '0.5rem',   // 使用有效的 CSS 值
});
```

#### 4. 移动端显示异常

**问题:** 在移动设备上显示不正确

**解决方案:** 添加响应式样式：

```css
.auth-form {
  max-width: 100%;
  padding: 1rem;
}

@media (max-width: 768px) {
  .auth-form {
    padding: 0.5rem;
  }
}
```

### 调试技巧

1. **启用调试模式：**
```tsx
const config = {
  ...authConfig,
  debug: true,
};
```

2. **检查网络请求：**
```tsx
const handleLoginError = (error: Error) => {
  console.log('登录错误详情:', error);
  // 检查网络请求状态
};
```

3. **验证配置：**
```tsx
// 验证配置是否正确
console.log('认证配置:', authConfig);
```

## 📞 支持

如果你遇到问题或需要帮助：

1. 查看 [GitHub Issues](https://github.com/tjsglion/cloudflare-workers-turso/issues)
2. 阅读 [FAQ](https://github.com/tjsglion/cloudflare-workers-turso/wiki/FAQ)
3. 提交 [Bug Report](https://github.com/tjsglion/cloudflare-workers-turso/issues/new)

## �� 许可证

MIT License 