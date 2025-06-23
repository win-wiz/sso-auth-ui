import React, { useState } from 'react';
import {
  AuthProvider,
  LoginForm,
  RegisterForm,
  useAuthContext,
  defaultTheme,
  createTheme,
  AuthConfig,
} from '../src';

// 认证配置
const authConfig: AuthConfig = {
  apiUrl: 'https://your-api.com',
  appName: 'My App',
  appLogo: '/logo.png',
  redirectUrl: 'https://your-app.com/callback',
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
  },
};

// 自定义主题
const customTheme = createTheme({
  primaryColor: '#8b5cf6',
  backgroundColor: '#f8fafc',
  borderRadius: '0.75rem',
});

// 登录页面组件
const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSuccess = (user: any) => {
    console.log('Login successful:', user);
    // 处理登录成功逻辑
  };

  const handleLoginError = (error: Error) => {
    console.error('Login failed:', error);
    // 处理登录失败逻辑
  };

  const handleRegisterSuccess = (user: any) => {
    console.log('Registration successful:', user);
    // 处理注册成功逻辑
  };

  const handleRegisterError = (error: Error) => {
    console.error('Registration failed:', error);
    // 处理注册失败逻辑
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button
          className={isLogin ? 'active' : ''}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? 'active' : ''}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      {isLogin ? (
        <LoginForm
          config={authConfig}
          theme={customTheme}
          onLoginSuccess={handleLoginSuccess}
          onLoginError={handleLoginError}
          showRememberMe={true}
          showForgotPassword={true}
        />
      ) : (
        <RegisterForm
          config={authConfig}
          theme={customTheme}
          onRegisterSuccess={handleRegisterSuccess}
          onRegisterError={handleRegisterError}
          confirmPassword={true}
          termsUrl="/terms"
          privacyUrl="/privacy"
        />
      )}
    </div>
  );
};

// 使用 AuthProvider 的完整示例
const App: React.FC = () => {
  return (
    <AuthProvider config={authConfig}>
      <LoginPage />
    </AuthProvider>
  );
};

export default App; 