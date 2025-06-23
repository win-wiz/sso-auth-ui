import React from 'react';
import {
  UnifiedAuthForm,
  createTheme,
} from '../src';
import type { AuthConfig } from '../src/types';

// 完整的认证配置示例
const authConfig: AuthConfig = {
  apiUrl: 'https://your-api.com',
  appName: 'My App',
  appLogo: '/logo.png',
  redirectUrl: 'https://your-app.com/callback',
  
  // 认证方式配置
  authMethods: {
    // 邮箱密码登录
    emailPassword: {
      enabled: true,
      requireEmailVerification: true,
      allowRegistration: true,
      allowPasswordReset: true,
    },
    // 双因素认证
    twoFactor: {
      enabled: true,
      allowSetup: true,
      totpIssuer: 'My App',
      totpLabel: 'user@example.com',
    },
    // SSO 单点登录
    sso: {
      enabled: true,
      providers: [
        { id: 'google', name: 'Google', type: 'oauth2', clientId: 'google-client-id', iconSvg: '...' },
        { id: 'github', name: 'GitHub', type: 'oauth2', clientId: 'github-client-id', iconSvg: '...' },
        { id: 'wechat', name: '微信', type: 'oauth2', clientId: 'wechat-client-id', iconSvg: '...' },
      ],
    },
    // 手机号登录
    phone: {
      enabled: true,
      allowRegistration: true,
      requireSmsVerification: true,
    },
    // 验证码登录
    captcha: {
      enabled: false,
      type: 'image',
    },
  },
  
  // 认证流程配置
  authFlow: {
    autoRedirect: true,
    successRedirectUrl: '/dashboard',
    rememberMe: true,
    sessionTimeout: 1440, // 24小时
  },
};

// 自定义主题
const customTheme = createTheme({
  primaryColor: '#8b5cf6',
  backgroundColor: '#f8fafc',
  borderRadius: '0.75rem',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
});

// 示例1：完整认证表单（支持所有方式）
const FullAuthExample: React.FC = () => {
  const handleLoginSuccess = (user: any) => {
    console.log('登录成功:', user);
  };

  const handleLoginError = (error: Error) => {
    console.error('登录失败:', error);
  };

  return (
    <UnifiedAuthForm
      config={authConfig}
      theme={customTheme}
      onLoginSuccess={handleLoginSuccess}
      onLoginError={handleLoginError}
      defaultMethod="email"
      showMethodSwitch={true}
      methodOrder={['email', 'phone', 'sso']}
    />
  );
};

// 示例2：仅邮箱密码登录
const EmailOnlyExample: React.FC = () => {
  const emailOnlyConfig: AuthConfig = {
    ...authConfig,
    authMethods: {
      emailPassword: {
        enabled: true,
        allowRegistration: true,
        allowPasswordReset: true,
      },
      sso: { enabled: false },
      phone: { enabled: false },
      twoFactor: { enabled: false },
    },
  };

  return (
    <UnifiedAuthForm
      config={emailOnlyConfig}
      theme={customTheme}
      showMethodSwitch={false}
    />
  );
};

// 示例3：仅SSO登录
const SSOOnlyExample: React.FC = () => {
  const ssoOnlyConfig: AuthConfig = {
    ...authConfig,
    authMethods: {
      emailPassword: { enabled: false },
      sso: {
        enabled: true,
        providers: [
          { id: 'google', name: 'Google', type: 'oauth2', clientId: 'google-client-id', iconSvg: '...' },
          { id: 'github', name: 'GitHub', type: 'oauth2', clientId: 'github-client-id', iconSvg: '...' },
        ],
      },
      phone: { enabled: false },
      twoFactor: { enabled: false },
    },
  };

  return (
    <UnifiedAuthForm
      config={ssoOnlyConfig}
      theme={customTheme}
      defaultMethod="sso"
      showMethodSwitch={false}
    />
  );
};

// 示例4：企业级配置（邮箱+SSO+2FA）
const EnterpriseExample: React.FC = () => {
  const enterpriseConfig: AuthConfig = {
    ...authConfig,
    authMethods: {
      emailPassword: {
        enabled: true,
        requireEmailVerification: true,
        allowRegistration: false, // 企业用户通常由管理员创建
        allowPasswordReset: true,
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

  return (
    <UnifiedAuthForm
      config={enterpriseConfig}
      theme={customTheme}
      defaultMethod="email"
      showMethodSwitch={true}
      methodOrder={['email', 'sso']}
    />
  );
};

export {
  FullAuthExample,
  EmailOnlyExample,
  SSOOnlyExample,
  EnterpriseExample,
};

export default FullAuthExample; 