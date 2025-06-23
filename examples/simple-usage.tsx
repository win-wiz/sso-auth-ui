import React from 'react';
import { LoginForm, AuthProvider } from '../src';
import type { AuthConfig } from '../src/types';

// 最简单的配置 - 只需要邮箱密码登录
const simpleConfig: AuthConfig = {
  apiUrl: 'https://api.yourdomain.com',
  appName: '我的应用',
  redirectUrl: 'https://app.yourdomain.com/callback',
  authMethods: {
    emailPassword: { enabled: true },
    sso: { enabled: false }
  }
};

// 基础登录示例
export function BasicLogin() {
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>基础登录</h2>
      <LoginForm
        config={simpleConfig}
        onLoginSuccess={(user: any) => {
          console.log('登录成功:', user);
          alert('登录成功！');
        }}
        onLoginError={(error: Error) => {
          console.error('登录失败:', error);
          alert('登录失败: ' + error.message);
        }}
      />
    </div>
  );
}

// 使用AuthProvider的示例
export function WithAuthProvider() {
  return (
    <AuthProvider config={simpleConfig}>
      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h2>使用AuthProvider</h2>
        <LoginForm
          config={simpleConfig}
          onLoginSuccess={(user: any) => {
            console.log('登录成功:', user);
            alert('登录成功！');
          }}
          onLoginError={(error: Error) => {
            console.error('登录失败:', error);
            alert('登录失败: ' + error.message);
          }}
        />
      </div>
    </AuthProvider>
  );
}

// 移动端优化示例
export function MobileOptimized() {
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
          onLoginSuccess={(user: any) => {
            console.log('登录成功:', user);
            alert('登录成功！');
          }}
          onLoginError={(error: Error) => {
            console.error('登录失败:', error);
            alert('登录失败: ' + error.message);
          }}
        />
      </div>
    </div>
  );
}

// 自定义样式示例
export function CustomStyled() {
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
          onLoginSuccess={(user: any) => {
            console.log('登录成功:', user);
            alert('登录成功！');
          }}
          onLoginError={(error: Error) => {
            console.error('登录失败:', error);
            alert('登录失败: ' + error.message);
          }}
        />
      </div>
    </div>
  );
}

// 主示例组件
export default function SimpleUsage() {
  const [currentExample, setCurrentExample] = React.useState('basic');

  const examples = {
    basic: { name: '基础登录', component: BasicLogin },
    provider: { name: '使用Provider', component: WithAuthProvider },
    mobile: { name: '移动端', component: MobileOptimized },
    custom: { name: '自定义样式', component: CustomStyled }
  };

  const CurrentComponent = examples[currentExample as keyof typeof examples].component;

  return (
    <div>
      <div style={{ 
        padding: '20px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
      }}>
        <h1 style={{ marginBottom: '20px' }}>简单使用示例</h1>
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