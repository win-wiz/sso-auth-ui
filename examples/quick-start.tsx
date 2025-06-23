import React from 'react';
import { LoginForm, AuthProvider } from '../src';

// 最简单的配置 - 只需要邮箱密码登录
const simpleConfig = {
  apiUrl: 'https://api.yourdomain.com',
  appName: '我的应用',
  redirectUrl: 'https://app.yourdomain.com/callback',
  authMethods: {
    emailPassword: { enabled: true },
    sso: { enabled: false }
  }
};

// 完整配置 - 支持多种登录方式
const fullConfig = {
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
          iconSvg: '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>'
        },
        {
          id: 'github',
          name: 'GitHub',
          type: 'oauth2',
          clientId: 'your-github-client-id',
          iconSvg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'
        }
      ]
    }
  }
};

// 示例1: 最简单的登录表单
export function SimpleLoginExample() {
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>简单登录</h2>
      <LoginForm
        config={simpleConfig}
        onLoginSuccess={(user) => {
          console.log('登录成功:', user);
          alert('登录成功！');
        }}
        onLoginError={(error) => {
          console.error('登录失败:', error);
          alert('登录失败: ' + error.message);
        }}
      />
    </div>
  );
}

// 示例2: 完整的认证页面
export function FullAuthExample() {
  return (
    <AuthProvider config={fullConfig}>
      <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2>完整认证页面</h2>
        <LoginForm
          config={fullConfig}
          onLoginSuccess={(user) => {
            console.log('登录成功:', user);
            alert('登录成功！');
          }}
          onLoginError={(error) => {
            console.error('登录失败:', error);
            alert('登录失败: ' + error.message);
          }}
          showRememberMe={true}
          showForgotPassword={true}
        />
      </div>
    </AuthProvider>
  );
}

// 示例3: 移动端优化
export function MobileLoginExample() {
  return (
    <div style={{ 
      padding: '20px', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>移动端登录</h2>
        <LoginForm
          config={simpleConfig}
          onLoginSuccess={(user) => {
            console.log('登录成功:', user);
            alert('登录成功！');
          }}
          onLoginError={(error) => {
            console.error('登录失败:', error);
            alert('登录失败: ' + error.message);
          }}
        />
      </div>
    </div>
  );
}

// 示例4: 自定义样式
export function CustomStyleExample() {
  return (
    <div style={{ 
      padding: '40px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#333',
          fontSize: '28px',
          fontWeight: '600'
        }}>
          欢迎回来
        </h2>
        <LoginForm
          config={simpleConfig}
          onLoginSuccess={(user) => {
            console.log('登录成功:', user);
            alert('登录成功！');
          }}
          onLoginError={(error) => {
            console.error('登录失败:', error);
            alert('登录失败: ' + error.message);
          }}
        />
      </div>
    </div>
  );
}

// 示例5: 企业级应用
export function EnterpriseExample() {
  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '48px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '20px'
          }}>
            企业级认证系统
          </h1>
          <p style={{ 
            fontSize: '18px',
            color: '#6b7280',
            lineHeight: '1.6'
          }}>
            安全、可靠、易用的企业级身份认证解决方案。
            支持多种登录方式，满足不同企业的需求。
          </p>
        </div>
        <div style={{ 
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <LoginForm
            config={fullConfig}
            onLoginSuccess={(user) => {
              console.log('登录成功:', user);
              alert('登录成功！');
            }}
            onLoginError={(error) => {
              console.error('登录失败:', error);
              alert('登录失败: ' + error.message);
            }}
            showRememberMe={true}
            showForgotPassword={true}
          />
        </div>
      </div>
    </div>
  );
}

// 主示例组件
export default function QuickStartExamples() {
  const [currentExample, setCurrentExample] = React.useState('simple');

  const examples = {
    simple: { name: '简单登录', component: SimpleLoginExample },
    full: { name: '完整认证', component: FullAuthExample },
    mobile: { name: '移动端', component: MobileLoginExample },
    custom: { name: '自定义样式', component: CustomStyleExample },
    enterprise: { name: '企业级', component: EnterpriseExample }
  };

  const CurrentComponent = examples[currentExample as keyof typeof examples].component;

  return (
    <div>
      <div style={{ 
        padding: '20px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
      }}>
        <h1 style={{ marginBottom: '20px' }}>SSO Auth UI 快速开始示例</h1>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {Object.entries(examples).map(([key, { name }]) => (
            <button
              key={key}
              onClick={() => setCurrentExample(key)}
              style={{
                padding: '8px 16px',
                border: currentExample === key ? '2px solid #3b82f6' : '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: currentExample === key ? '#3b82f6' : 'white',
                color: currentExample === key ? 'white' : '#374151',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <CurrentComponent />
    </div>
  );
} 