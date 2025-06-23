# SSO Auth UI 快速开始指南

## 🚀 5分钟快速集成

### 1. 安装依赖

```bash
npm install @your-org/sso-auth-ui
# 或
yarn add @your-org/sso-auth-ui
# 或
pnpm add @your-org/sso-auth-ui
```

### 2. 基础登录表单（最简单用法）

```tsx
import React from 'react';
import { LoginForm } from '@your-org/sso-auth-ui';

function SimpleLogin() {
  const config = {
    apiUrl: 'https://api.yourdomain.com',
    appName: '我的应用',
    redirectUrl: 'https://app.yourdomain.com/callback',
    authMethods: {
      emailPassword: { enabled: true },
      sso: { enabled: false }
    }
  };

  return (
    <LoginForm
      config={config}
      onLoginSuccess={(user) => console.log('登录成功:', user)}
      onLoginError={(error) => console.error('登录失败:', error)}
    />
  );
}
```

### 3. 完整认证页面（推荐用法）

```tsx
import React, { useState } from 'react';
import { AuthProvider, LoginForm, RegisterForm } from '@your-org/sso-auth-ui';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  
  const config = {
    apiUrl: 'https://api.yourdomain.com',
    appName: '我的应用',
    appLogo: '/logo.png',
    redirectUrl: 'https://app.yourdomain.com/callback',
    authMethods: {
      emailPassword: {
        enabled: true,
        allowRegistration: true,
        allowPasswordReset: true
      },
      sso: {
        enabled: true,
        providers: [
          {
            id: 'google',
            name: 'Google',
            type: 'oauth2',
            clientId: 'your-google-client-id',
            iconSvg: '<svg>...</svg>'
          },
          {
            id: 'github',
            name: 'GitHub', 
            type: 'oauth2',
            clientId: 'your-github-client-id',
            iconSvg: '<svg>...</svg>'
          }
        ]
      }
    }
  };

  return (
    <AuthProvider config={config}>
      <div className="auth-container">
        <div className="auth-tabs">
          <button 
            className={isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(true)}
          >
            登录
          </button>
          <button 
            className={!isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(false)}
          >
            注册
          </button>
        </div>

        {isLogin ? (
          <LoginForm
            onLoginSuccess={(user) => {
              console.log('登录成功:', user);
              // 跳转到首页
              window.location.href = '/dashboard';
            }}
            onLoginError={(error) => {
              alert('登录失败: ' + error.message);
            }}
            showRememberMe={true}
            showForgotPassword={true}
          />
        ) : (
          <RegisterForm
            onRegisterSuccess={(user) => {
              console.log('注册成功:', user);
              setIsLogin(true);
            }}
            onRegisterError={(error) => {
              alert('注册失败: ' + error.message);
            }}
            confirmPassword={true}
            termsUrl="/terms"
            privacyUrl="/privacy"
          />
        )}
      </div>
    </AuthProvider>
  );
}
```

## 📱 移动端优化示例

```tsx
import React from 'react';
import { LoginForm, createTheme } from '@your-org/sso-auth-ui';

function MobileLogin() {
  const mobileTheme = createTheme({
    primaryColor: '#007AFF',
    backgroundColor: '#f5f5f7',
    borderRadius: '12px',
    fontSize: '16px', // 移动端更大的字体
    padding: '20px',
    maxWidth: '100%'
  });

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <LoginForm
        config={config}
        theme={mobileTheme}
        onLoginSuccess={(user) => {
          // 移动端登录成功处理
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = '/app';
        }}
      />
    </div>
  );
}
```

## 🎨 自定义主题示例

```tsx
import React from 'react';
import { LoginForm, createTheme } from '@your-org/sso-auth-ui';

function CustomThemeLogin() {
  // 深色主题
  const darkTheme = createTheme({
    primaryColor: '#00ff88',
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    borderColor: '#333333',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 255, 136, 0.2)'
  });

  // 企业主题
  const enterpriseTheme = createTheme({
    primaryColor: '#2563eb',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    borderColor: '#d1d5db',
    borderRadius: '6px',
    fontFamily: 'Inter, system-ui, sans-serif'
  });

  return (
    <LoginForm
      config={config}
      theme={darkTheme} // 或 enterpriseTheme
      onLoginSuccess={handleLoginSuccess}
    />
  );
}
```

## 🔐 多因素认证示例

```tsx
import React from 'react';
import { LoginForm, TwoFactorAuth } from '@your-org/sso-auth-ui';

function SecureLogin() {
  const [show2FA, setShow2FA] = useState(false);
  const [tempToken, setTempToken] = useState('');

  const handleLoginSuccess = (user) => {
    if (user.requires2FA) {
      setTempToken(user.tempToken);
      setShow2FA(true);
    } else {
      // 直接登录成功
      window.location.href = '/dashboard';
    }
  };

  const handle2FASuccess = (user) => {
    console.log('2FA验证成功:', user);
    window.location.href = '/dashboard';
  };

  if (show2FA) {
    return (
      <TwoFactorAuth
        tempToken={tempToken}
        onSuccess={handle2FASuccess}
        onError={(error) => alert('2FA验证失败: ' + error.message)}
        onBack={() => setShow2FA(false)}
      />
    );
  }

  return (
    <LoginForm
      config={config}
      onLoginSuccess={handleLoginSuccess}
      onLoginError={(error) => alert('登录失败: ' + error.message)}
    />
  );
}
```

## 📧 邮箱验证示例

```tsx
import React from 'react';
import { RegisterForm, EmailVerification } from '@your-org/sso-auth-ui';

function EmailVerifiedRegister() {
  const [showVerification, setShowVerification] = useState(false);
  const [email, setEmail] = useState('');

  const handleRegisterSuccess = (user) => {
    setEmail(user.email);
    setShowVerification(true);
  };

  const handleVerificationSuccess = (user) => {
    console.log('邮箱验证成功:', user);
    window.location.href = '/dashboard';
  };

  if (showVerification) {
    return (
      <EmailVerification
        email={email}
        onSuccess={handleVerificationSuccess}
        onError={(error) => alert('验证失败: ' + error.message)}
        onResend={() => console.log('重新发送验证码')}
      />
    );
  }

  return (
    <RegisterForm
      config={config}
      onRegisterSuccess={handleRegisterSuccess}
      onRegisterError={(error) => alert('注册失败: ' + error.message)}
      requireEmailVerification={true}
    />
  );
}
```

## 📱 手机号登录示例

```tsx
import React from 'react';
import { PhoneAuth } from '@your-org/sso-auth-ui';

function PhoneLogin() {
  return (
    <PhoneAuth
      config={config}
      onSuccess={(user) => {
        console.log('手机号登录成功:', user);
        window.location.href = '/dashboard';
      }}
      onError={(error) => alert('登录失败: ' + error.message)}
      countryCode="+86"
      showCountrySelector={true}
    />
  );
}
```

## 🔄 统一认证表单示例

```tsx
import React from 'react';
import { UnifiedAuthForm } from '@your-org/sso-auth-ui';

function AllInOneAuth() {
  const config = {
    apiUrl: 'https://api.yourdomain.com',
    appName: '我的应用',
    redirectUrl: 'https://app.yourdomain.com/callback',
    authMethods: {
      emailPassword: { enabled: true, allowRegistration: true },
      phone: { enabled: true, allowRegistration: true },
      sso: { 
        enabled: true,
        providers: [
          { id: 'google', name: 'Google', clientId: 'google-id' },
          { id: 'github', name: 'GitHub', clientId: 'github-id' }
        ]
      },
      twoFactor: { enabled: true }
    }
  };

  return (
    <UnifiedAuthForm
      config={config}
      onSuccess={(user) => console.log('认证成功:', user)}
      onError={(error) => console.error('认证失败:', error)}
      defaultMethod="emailPassword"
      showMethodSelector={true}
    />
  );
}
```

## 🎯 实际项目集成步骤

### 步骤1: 配置环境变量

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME=我的应用
GOOGLE_CLIENT_ID=your-google-client-id
GITHUB_CLIENT_ID=your-github-client-id
```

### 步骤2: 创建认证配置

```tsx
// lib/auth-config.ts
export const authConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
  appLogo: '/logo.png',
  redirectUrl: `${window.location.origin}/auth/callback`,
  authMethods: {
    emailPassword: {
      enabled: true,
      allowRegistration: true,
      allowPasswordReset: true
    },
    sso: {
      enabled: true,
      providers: [
        {
          id: 'google',
          name: 'Google',
          type: 'oauth2',
          clientId: process.env.GOOGLE_CLIENT_ID!,
          iconSvg: '...'
        },
        {
          id: 'github',
          name: 'GitHub',
          type: 'oauth2', 
          clientId: process.env.GITHUB_CLIENT_ID!,
          iconSvg: '...'
        }
      ]
    }
  }
};
```

### 步骤3: 创建认证页面

```tsx
// pages/auth/login.tsx
import { AuthProvider, LoginForm } from '@your-org/sso-auth-ui';
import { authConfig } from '../../lib/auth-config';

export default function LoginPage() {
  return (
    <AuthProvider config={authConfig}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <LoginForm
            onLoginSuccess={(user) => {
              // 保存用户信息
              localStorage.setItem('user', JSON.stringify(user));
              // 跳转到首页
              window.location.href = '/dashboard';
            }}
            onLoginError={(error) => {
              alert('登录失败: ' + error.message);
            }}
            showRememberMe={true}
            showForgotPassword={true}
          />
        </div>
      </div>
    </AuthProvider>
  );
}
```

### 步骤4: 处理回调

```tsx
// pages/auth/callback.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const { code, error } = router.query;
    
    if (error) {
      console.error('SSO登录失败:', error);
      router.push('/auth/login?error=' + error);
      return;
    }

    if (code) {
      // 处理SSO回调
      handleSSOCallback(code as string);
    }
  }, [router.query]);

  const handleSSOCallback = async (code: string) => {
    try {
      const response = await fetch('/api/auth/sso/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/dashboard');
      } else {
        throw new Error('SSO回调处理失败');
      }
    } catch (error) {
      console.error('SSO回调错误:', error);
      router.push('/auth/login?error=sso_failed');
    }
  };

  return <div>处理登录中...</div>;
}
```

## 🎨 样式定制

### 使用CSS变量

```css
/* styles/auth.css */
.auth-container {
  --auth-primary-color: #3b82f6;
  --auth-background-color: #ffffff;
  --auth-text-color: #1f2937;
  --auth-border-color: #d1d5db;
  --auth-border-radius: 8px;
  --auth-font-family: 'Inter', system-ui, sans-serif;
}

.auth-container.dark {
  --auth-primary-color: #60a5fa;
  --auth-background-color: #1f2937;
  --auth-text-color: #f9fafb;
  --auth-border-color: #374151;
}
```

### 使用Tailwind CSS

```tsx
import { LoginForm, createTheme } from '@your-org/sso-auth-ui';

function TailwindLogin() {
  const theme = createTheme({
    primaryColor: '#3b82f6',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    borderColor: '#d1d5db',
    borderRadius: '0.5rem',
    fontFamily: 'Inter, system-ui, sans-serif'
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            登录到您的账户
          </h2>
        </div>
        <LoginForm
          config={config}
          theme={theme}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </div>
  );
}
```

## 🚨 常见问题解决

### 1. 类型错误
```bash
# 如果遇到类型错误，确保安装了类型定义
npm install @types/react @types/react-dom
```

### 2. 样式不生效
```tsx
// 确保导入了样式文件
import '@your-org/sso-auth-ui/dist/style.css';
```

### 3. SSO图标不显示
```tsx
// 确保提供了正确的图标SVG
const provider = {
  id: 'google',
  name: 'Google',
  iconSvg: '<svg viewBox="0 0 24 24">...</svg>'
};
```

### 4. 回调处理失败
```tsx
// 确保redirectUrl配置正确
const config = {
  redirectUrl: `${window.location.origin}/auth/callback`
};
```

## 📞 获取帮助

- 📖 [完整API文档](./API_DOCUMENTATION.md)
- 🐛 [问题反馈](https://github.com/your-org/sso-auth-ui/issues)
- 💬 [社区讨论](https://github.com/your-org/sso-auth-ui/discussions)
- 📧 [邮件支持](mailto:support@yourdomain.com)

---

**开始使用吧！** 🎉 如果遇到任何问题，请查看上面的常见问题解决方案或联系我们的支持团队。 