import React, { useState } from 'react';
import { AuthFormProps, LoginCredentials } from '../types';
import { LoginForm } from './LoginForm';
import { TwoFactorAuth } from './TwoFactorAuth';
import { PhoneAuth } from './PhoneAuth';
import { SSOButtons } from './SSOButtons';
import { useAuthContext } from './AuthProvider';

export type AuthMethod = 'email' | 'phone' | 'sso' | '2fa';

export interface UnifiedAuthFormProps extends AuthFormProps {
  /** 默认显示的认证方式 */
  defaultMethod?: AuthMethod;
  /** 是否显示认证方式切换 */
  showMethodSwitch?: boolean;
  /** 自定义认证方式顺序 */
  methodOrder?: AuthMethod[];
}

export const UnifiedAuthForm: React.FC<UnifiedAuthFormProps> = ({
  config,
  theme,
  onLoginSuccess,
  onLoginError,
  defaultMethod = 'email',
  showMethodSwitch = true,
  methodOrder = ['email', 'phone', 'sso'],
  className = '',
}) => {
  const [currentMethod, setCurrentMethod] = useState<AuthMethod>(defaultMethod);
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({});
  const [show2FA, setShow2FA] = useState(false);

  // 尝试从AuthProvider上下文获取config
  const authContext = useAuthContext();
  const finalConfig = config || authContext?.config;

  if (!finalConfig) {
    throw new Error('UnifiedAuthForm requires a config prop or to be used within an AuthProvider.');
  }

  // 获取启用的认证方式
  const enabledMethods = methodOrder.filter(method => {
    switch (method) {
      case 'email':
        return finalConfig.authMethods.emailPassword?.enabled;
      case 'phone':
        return finalConfig.authMethods.phone?.enabled;
      case 'sso':
        return finalConfig.authMethods.sso?.enabled;
      case '2fa':
        return finalConfig.authMethods.twoFactor?.enabled;
      default:
        return false;
    }
  });

  const handleEmailLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch(`${finalConfig.apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.status === 202) {
        // 需要 2FA 验证
        setLoginCredentials(credentials);
        setShow2FA(true);
        return;
      }

      if (response.ok) {
        const user = await response.json();
        onLoginSuccess?.(user);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      onLoginError?.(error as Error);
    }
  };

  const handle2FAVerify = async (code: string) => {
    try {
      const response = await fetch(`${finalConfig.apiUrl}/auth/2fa/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...loginCredentials,
          totpCode: code,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        onLoginSuccess?.(user);
      } else {
        throw new Error('2FA verification failed');
      }
    } catch (error) {
      onLoginError?.(error as Error);
    }
  };

  const handlePhoneLogin = async (phone: string, code: string) => {
    try {
      const response = await fetch(`${finalConfig.apiUrl}/auth/phone/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });

      if (response.ok) {
        const user = await response.json();
        onLoginSuccess?.(user);
      } else {
        throw new Error('Phone login failed');
      }
    } catch (error) {
      onLoginError?.(error as Error);
    }
  };

  const handleSendCode = async (phone: string) => {
    try {
      await fetch(`${finalConfig.apiUrl}/auth/phone/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
    } catch (error) {
      onLoginError?.(error as Error);
    }
  };

  const handleSSOClick = (provider: any) => {
    window.location.href = `${finalConfig.apiUrl}/auth/sso/${provider.id}`;
  };

  const containerStyle = {
    backgroundColor: theme?.backgroundColor || '#ffffff',
    border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
    borderRadius: theme?.borderRadius || '0.5rem',
    boxShadow: theme?.boxShadow || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  const tabStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: theme?.textColor || '#1f2937',
    cursor: 'pointer',
    padding: '8px 16px',
  };

  const activeTabStyle = {
    ...tabStyle,
    color: theme?.primaryColor || '#3b82f6',
    borderBottom: `2px solid ${theme?.primaryColor || '#3b82f6'}`,
  };

  if (show2FA) {
    return (
      <TwoFactorAuth
        onVerify={handle2FAVerify}
        onCancel={() => setShow2FA(false)}
        theme={theme}
        className={className}
      />
    );
  }

  return (
    <div className={`unified-auth-form ${className}`} style={containerStyle}>
      {finalConfig.appLogo && (
        <div className="app-logo">
          <img src={finalConfig.appLogo} alt={finalConfig.appName || 'App Logo'} />
        </div>
      )}
      
      <h2>{finalConfig.appName || '登录'}</h2>

      {showMethodSwitch && enabledMethods.length > 1 && (
        <div className="method-tabs">
          {enabledMethods.map((method) => (
            <button
              key={method}
              onClick={() => setCurrentMethod(method)}
              style={currentMethod === method ? activeTabStyle : tabStyle}
              className={`method-tab ${currentMethod === method ? 'active' : ''}`}
            >
              {method === 'email' && '邮箱登录'}
              {method === 'phone' && '手机登录'}
              {method === 'sso' && 'SSO登录'}
            </button>
          ))}
        </div>
      )}

      <div className="auth-content">
        {currentMethod === 'email' && finalConfig.authMethods.emailPassword?.enabled && (
          <LoginForm
            config={finalConfig}
            theme={theme}
            onLoginSuccess={handleEmailLogin}
            onLoginError={onLoginError}
            showRememberMe={true}
            showForgotPassword={true}
          />
        )}

        {currentMethod === 'phone' && finalConfig.authMethods.phone?.enabled && (
          <PhoneAuth
            phone=""
            code=""
            onSendCode={handleSendCode}
            onVerify={handlePhoneLogin}
            theme={theme}
          />
        )}

        {currentMethod === 'sso' && finalConfig.authMethods.sso?.enabled && finalConfig.authMethods.sso.providers && (
          <div className="sso-section">
            <SSOButtons
              providers={finalConfig.authMethods.sso.providers}
              onSSOClick={handleSSOClick}
              theme={theme}
            />
          </div>
        )}
      </div>
    </div>
  );
}; 