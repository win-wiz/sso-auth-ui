"use client";

import React, { useState } from 'react';
import { AuthFormProps, LoginCredentials } from '../types';
import { LoginForm } from './LoginForm';
import { TwoFactorAuth } from './TwoFactorAuth';
import { PhoneAuth } from './PhoneAuth';
import { SSOButtons } from './SSOButtons';
import { useAuthContext } from './AuthProvider';
import { AuthCard } from './AuthCard';

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
    <AuthCard
      logo={finalConfig.appLogo && <img src={finalConfig.appLogo} alt={finalConfig.appName || 'App Logo'} className="h-12 mb-2" />}
      title={finalConfig.appName || '登录'}
      className={className}
      cardBg={theme?.cardBg || 'bg-gray-50'}
    >
      {showMethodSwitch && enabledMethods.length > 1 && (
        <div className="flex justify-center mb-6 gap-2">
          {enabledMethods.map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setCurrentMethod(method)}
              className={`px-4 py-2 rounded-t-md text-sm font-medium border-b-2 transition-colors focus:outline-none ${currentMethod === method ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-500 bg-gray-100 hover:bg-gray-200'}`}
            >
              {method === 'email' && '邮箱登录'}
              {method === 'phone' && '手机登录'}
              {method === 'sso' && 'SSO登录'}
            </button>
          ))}
        </div>
      )}
      <div className="mt-2">
        {currentMethod === 'email' && (
          <LoginForm
            config={finalConfig}
            theme={theme}
            onLoginSuccess={handleEmailLogin}
            onLoginError={onLoginError}
          />
        )}
        {currentMethod === 'phone' && (
          <PhoneAuth
            phone=""
            code=""
            onSendCode={handleSendCode}
            onVerify={handlePhoneLogin}
            theme={theme}
          />
        )}
        {currentMethod === 'sso' && finalConfig.authMethods.sso?.enabled && finalConfig.authMethods.sso.providers && (
          <div className="mt-4">
            <SSOButtons
              providers={finalConfig.authMethods.sso.providers}
              onSSOClick={handleSSOClick}
              theme={theme}
            />
          </div>
        )}
      </div>
    </AuthCard>
  );
}; 