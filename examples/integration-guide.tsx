import React, { useState } from 'react';
import { AuthProvider, LoginForm, RegisterForm } from '../src';

// 集成指南示例

// 1. Next.js 集成示例
export function NextJSIntegration() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Next.js 集成</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">1. 安装依赖</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`npm install @your-org/sso-auth-ui
# 或
yarn add @your-org/sso-auth-ui`}
          </pre>
        </div>

        <div>
          <h4 className="font-medium mb-2">2. 创建配置文件</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`// lib/auth-config.ts
export const authConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
  redirectUrl: \`\${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback\`,
  authMethods: {
    emailPassword: { enabled: true, allowRegistration: true },
    sso: {
      enabled: true,
      providers: [
        {
          id: 'google',
          name: 'Google',
          clientId: process.env.GOOGLE_CLIENT_ID!,
          iconSvg: '...'
        }
      ]
    }
  }
};`}
          </pre>
        </div>

        <div>
          <h4 className="font-medium mb-2">3. 创建登录页面</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`// pages/auth/login.tsx
import { AuthProvider, LoginForm } from '@your-org/sso-auth-ui';
import { authConfig } from '../../lib/auth-config';

export default function LoginPage() {
  return (
    <AuthProvider config={authConfig}>
      <LoginForm
        onLoginSuccess={(user) => {
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = '/dashboard';
        }}
        onLoginError={(error) => alert('登录失败: ' + error.message)}
      />
    </AuthProvider>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// 2. React 集成示例
export function ReactIntegration() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">React 集成</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">1. 安装依赖</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`npm install @your-org/sso-auth-ui react react-dom`}
          </pre>
        </div>

        <div>
          <h4 className="font-medium mb-2">2. 创建认证组件</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`// components/Auth.tsx
import React, { useState } from 'react';
import { AuthProvider, LoginForm, RegisterForm } from '@your-org/sso-auth-ui';

const config = {
  apiUrl: 'https://api.yourdomain.com',
  appName: '我的应用',
  authMethods: {
    emailPassword: { enabled: true, allowRegistration: true },
    sso: { enabled: false }
  }
};

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthProvider config={config}>
      <div>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '切换到注册' : '切换到登录'}
        </button>
        
        {isLogin ? (
          <LoginForm
            onLoginSuccess={(user) => console.log('登录成功:', user)}
            onLoginError={(error) => console.error('登录失败:', error)}
          />
        ) : (
          <RegisterForm
            onRegisterSuccess={(user) => console.log('注册成功:', user)}
            onRegisterError={(error) => console.error('注册失败:', error)}
          />
        )}
      </div>
    </AuthProvider>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// 3. Vue.js 集成示例
export function VueIntegration() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Vue.js 集成</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">1. 安装依赖</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`npm install @your-org/sso-auth-ui`}
          </pre>
        </div>

        <div>
          <h4 className="font-medium mb-2">2. 创建Vue组件包装器</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`<!-- components/AuthWrapper.vue -->
<template>
  <div ref="authContainer"></div>
</template>

<script>
import { createApp } from 'vue';
import { AuthProvider, LoginForm } from '@your-org/sso-auth-ui';

export default {
  name: 'AuthWrapper',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  mounted() {
    // 创建React应用并挂载到Vue组件中
    const React = require('react');
    const ReactDOM = require('react-dom');
    
    const AuthApp = () => React.createElement(AuthProvider, { config: this.config },
      React.createElement(LoginForm, {
        onLoginSuccess: this.handleLoginSuccess,
        onLoginError: this.handleLoginError
      })
    );
    
    ReactDOM.render(React.createElement(AuthApp), this.$refs.authContainer);
  },
  methods: {
    handleLoginSuccess(user) {
      this.$emit('login-success', user);
    },
    handleLoginError(error) {
      this.$emit('login-error', error);
    }
  }
}
</script>`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// 4. 环境配置示例
export function EnvironmentConfig() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">环境配置</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">开发环境 (.env.development)</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=开发环境
GOOGLE_CLIENT_ID=dev-google-client-id
GITHUB_CLIENT_ID=dev-github-client-id
MICROSOFT_CLIENT_ID=dev-microsoft-client-id`}
          </pre>
        </div>

        <div>
          <h4 className="font-medium mb-2">生产环境 (.env.production)</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME=生产环境
GOOGLE_CLIENT_ID=prod-google-client-id
GITHUB_CLIENT_ID=prod-github-client-id
MICROSOFT_CLIENT_ID=prod-microsoft-client-id`}
          </pre>
        </div>

        <div>
          <h4 className="font-medium mb-2">配置验证</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`// lib/config-validator.ts
export function validateAuthConfig(config: any) {
  const required = ['apiUrl', 'appName', 'redirectUrl'];
  const missing = required.filter(key => !config[key]);
  
  if (missing.length > 0) {
    throw new Error(\`缺少必需配置: \${missing.join(', ')}\`);
  }
  
  if (config.authMethods?.sso?.enabled) {
    const providers = config.authMethods.sso.providers;
    if (!providers || providers.length === 0) {
      throw new Error('SSO已启用但未配置提供商');
    }
  }
  
  return true;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// 5. 错误处理示例
export function ErrorHandling() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">错误处理</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">自定义错误处理</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`function handleAuthError(error: Error) {
  console.error('认证错误:', error);
  
  // 根据错误类型处理
  switch (error.message) {
    case 'invalid_credentials':
      showToast('邮箱或密码错误', 'error');
      break;
    case 'account_locked':
      showToast('账户已被锁定，请联系管理员', 'error');
      break;
    case 'rate_limit_exceeded':
      showToast('登录尝试过于频繁，请稍后再试', 'warning');
      break;
    case 'network_error':
      showToast('网络连接失败，请检查网络', 'error');
      break;
    default:
      showToast('登录失败，请重试', 'error');
  }
  
  // 发送错误报告
  reportError(error);
}

function showToast(message: string, type: 'success' | 'error' | 'warning') {
  // 实现toast通知
  console.log(\`[\${type.toUpperCase()}] \${message}\`);
}

function reportError(error: Error) {
  // 发送错误到监控服务
  fetch('/api/errors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    })
  }).catch(console.error);
}`}
          </pre>
        </div>

        <div>
          <h4 className="font-medium mb-2">重试机制</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`function createRetryableAuth(config: any, maxRetries = 3) {
  let retryCount = 0;
  
  const attemptAuth = async (credentials: any) => {
    try {
      const response = await fetch(\`\${config.apiUrl}/auth/login\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }
      
      return await response.json();
    } catch (error) {
      retryCount++;
      
      if (retryCount < maxRetries) {
        console.log(\`认证失败，第\${retryCount}次重试...\`);
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        return attemptAuth(credentials);
      }
      
      throw error;
    }
  };
  
  return attemptAuth;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// 6. 状态管理示例
export function StateManagement() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">状态管理</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Redux 集成</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;`}
          </pre>
        </div>

        <div>
          <h4 className="font-medium mb-2">Zustand 集成</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`// store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({
        user,
        token,
        isAuthenticated: true
      }),
      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false
      })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token })
    }
  )
);`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// 7. 测试示例
export function TestingExamples() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">测试示例</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Jest + React Testing Library</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`// __tests__/LoginForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '@your-org/sso-auth-ui';

const mockConfig = {
  apiUrl: 'https://api.test.com',
  appName: 'Test App',
  authMethods: {
    emailPassword: { enabled: true },
    sso: { enabled: false }
  }
};

describe('LoginForm', () => {
  it('应该渲染登录表单', () => {
    render(<LoginForm config={mockConfig} />);
    
    expect(screen.getByLabelText(/邮箱/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/密码/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /登录/i })).toBeInTheDocument();
  });

  it('应该处理登录成功', async () => {
    const onLoginSuccess = jest.fn();
    const onLoginError = jest.fn();
    
    render(
      <LoginForm
        config={mockConfig}
        onLoginSuccess={onLoginSuccess}
        onLoginError={onLoginError}
      />
    );
    
    fireEvent.change(screen.getByLabelText(/邮箱/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/密码/i), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /登录/i }));
    
    await waitFor(() => {
      expect(onLoginSuccess).toHaveBeenCalled();
    });
  });
});`}
          </pre>
        </div>

        <div>
          <h4 className="font-medium mb-2">Cypress E2E 测试</h4>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`// cypress/e2e/auth.cy.ts
describe('认证流程', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('应该成功登录', () => {
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="user-menu"]').should('be.visible');
  });

  it('应该显示错误信息', () => {
    cy.get('[data-testid="email-input"]').type('invalid@example.com');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();
    
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', '邮箱或密码错误');
  });

  it('应该支持SSO登录', () => {
    cy.get('[data-testid="google-login"]').click();
    cy.url().should('include', 'accounts.google.com');
  });
});`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// 主集成指南组件
export default function IntegrationGuide() {
  const [currentSection, setCurrentSection] = useState('nextjs');

  const sections = {
    nextjs: { name: 'Next.js', component: NextJSIntegration },
    react: { name: 'React', component: ReactIntegration },
    vue: { name: 'Vue.js', component: VueIntegration },
    config: { name: '环境配置', component: EnvironmentConfig },
    error: { name: '错误处理', component: ErrorHandling },
    state: { name: '状态管理', component: StateManagement },
    testing: { name: '测试', component: TestingExamples }
  };

  const CurrentComponent = sections[currentSection as keyof typeof sections].component;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">集成指南</h1>
        <p className="text-gray-600">
          详细的集成指南和最佳实践，帮助您快速将 SSO Auth UI 集成到您的项目中。
        </p>
      </div>

      <div className="flex space-x-4 mb-8">
        {Object.entries(sections).map(([key, { name }]) => (
          <button
            key={key}
            onClick={() => setCurrentSection(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentSection === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <CurrentComponent />
    </div>
  );
} 