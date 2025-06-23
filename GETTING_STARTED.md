# 快速入门指南

## 🚀 5分钟快速集成

### 1. 安装

```bash
npm install @your-org/sso-auth-ui
```

### 2. 最简单的使用方式

```tsx
import React from 'react';
import { LoginForm } from '@your-org/sso-auth-ui';

function App() {
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
      onLoginSuccess={(user) => {
        console.log('登录成功:', user);
        window.location.href = '/dashboard';
      }}
      onLoginError={(error) => {
        console.error('登录失败:', error);
        alert('登录失败: ' + error.message);
      }}
    />
  );
}
```

### 3. 使用AuthProvider（推荐）

```tsx
import React from 'react';
import { AuthProvider, LoginForm } from '@your-org/sso-auth-ui';

function App() {
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
    <AuthProvider config={config}>
      <LoginForm
        onLoginSuccess={(user) => {
          console.log('登录成功:', user);
          window.location.href = '/dashboard';
        }}
        onLoginError={(error) => {
          console.error('登录失败:', error);
          alert('登录失败: ' + error.message);
        }}
      />
    </AuthProvider>
  );
}
```

## 📱 移动端优化

```tsx
import React from 'react';
import { LoginForm, createTheme } from '@your-org/sso-auth-ui';

function MobileApp() {
  const mobileTheme = createTheme({
    primaryColor: '#007AFF',
    backgroundColor: '#f5f5f7',
    borderRadius: '12px',
    fontSize: '16px',
    padding: '20px'
  });

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <LoginForm
        config={config}
        theme={mobileTheme}
        onLoginSuccess={(user) => {
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = '/app';
        }}
      />
    </div>
  );
}
```

## 🎨 自定义主题

```tsx
import { createTheme } from '@your-org/sso-auth-ui';

const customTheme = createTheme({
  primaryColor: '#3b82f6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  borderColor: '#d1d5db',
  borderRadius: '8px',
  fontFamily: 'Inter, sans-serif'
});
```

## 🔐 启用SSO登录

```tsx
const config = {
  apiUrl: 'https://api.yourdomain.com',
  appName: '我的应用',
  redirectUrl: 'https://app.yourdomain.com/callback',
  authMethods: {
    emailPassword: { enabled: true },
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
```

## 📧 启用注册功能

```tsx
const config = {
  apiUrl: 'https://api.yourdomain.com',
  appName: '我的应用',
  redirectUrl: 'https://app.yourdomain.com/callback',
  authMethods: {
    emailPassword: {
      enabled: true,
      allowRegistration: true,  // 启用注册
      allowPasswordReset: true  // 启用密码重置
    },
    sso: { enabled: false }
  }
};
```

## 🔄 登录/注册切换

```tsx
import React, { useState } from 'react';
import { AuthProvider, LoginForm, RegisterForm } from '@your-org/sso-auth-ui';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthProvider config={config}>
      <div>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '切换到注册' : '切换到登录'}
        </button>
        
        {isLogin ? (
          <LoginForm
            onLoginSuccess={(user) => {
              localStorage.setItem('user', JSON.stringify(user));
              window.location.href = '/dashboard';
            }}
            onLoginError={(error) => alert('登录失败: ' + error.message)}
          />
        ) : (
          <RegisterForm
            onRegisterSuccess={(user) => {
              alert('注册成功！');
              setIsLogin(true);
            }}
            onRegisterError={(error) => alert('注册失败: ' + error.message)}
          />
        )}
      </div>
    </AuthProvider>
  );
}
```

## 🎯 实际项目示例

### Next.js 项目

```tsx
// pages/auth/login.tsx
import { AuthProvider, LoginForm } from '@your-org/sso-auth-ui';

export default function LoginPage() {
  const config = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL!,
    appName: process.env.NEXT_PUBLIC_APP_NAME!,
    redirectUrl: `${window.location.origin}/auth/callback`,
    authMethods: {
      emailPassword: { enabled: true, allowRegistration: true },
      sso: {
        enabled: true,
        providers: [
          { id: 'google', name: 'Google', clientId: process.env.GOOGLE_CLIENT_ID! }
        ]
      }
    }
  };

  return (
    <AuthProvider config={config}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <LoginForm
            onLoginSuccess={(user) => {
              localStorage.setItem('user', JSON.stringify(user));
              window.location.href = '/dashboard';
            }}
            onLoginError={(error) => alert('登录失败: ' + error.message)}
            showRememberMe={true}
            showForgotPassword={true}
          />
        </div>
      </div>
    </AuthProvider>
  );
}
```

### React 项目

```tsx
// components/Auth.tsx
import React from 'react';
import { AuthProvider, LoginForm } from '@your-org/sso-auth-ui';

const config = {
  apiUrl: 'https://api.yourdomain.com',
  appName: '我的应用',
  authMethods: {
    emailPassword: { enabled: true },
    sso: { enabled: false }
  }
};

export function Auth() {
  return (
    <AuthProvider config={config}>
      <LoginForm
        onLoginSuccess={(user) => console.log('登录成功:', user)}
        onLoginError={(error) => console.error('登录失败:', error)}
      />
    </AuthProvider>
  );
}
```

## 🚨 常见问题

### 1. 类型错误
```bash
# 确保安装了类型定义
npm install @types/react @types/react-dom
```

### 2. 样式不生效
```tsx
// 确保导入了样式文件
import '@your-org/sso-auth-ui/dist/style.css';
```

### 3. 配置错误
```tsx
// 确保提供了必需的配置
const config = {
  apiUrl: 'https://api.yourdomain.com',  // 必需
  appName: '我的应用',                   // 必需
  authMethods: {                         // 必需
    emailPassword: { enabled: true }
  }
};
```

## 📖 更多资源

- [完整API文档](./API_DOCUMENTATION.md)
- [快速开始指南](./QUICK_START_GUIDE.md)
- [示例代码](./examples/)

---

**开始使用吧！** 🎉 如果遇到任何问题，请查看文档或联系支持团队。 