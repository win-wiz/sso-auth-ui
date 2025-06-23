"use client";

import React, { useState } from 'react';
import { LoginFormProps, AuthContextType } from '../types';
import { SSOButtons } from './SSOButtons';
import { useAuthContext } from './AuthProvider';
import { AuthCard } from './AuthCard';

export const LoginForm: React.FC<LoginFormProps> = ({
  config,
  theme,
  onLoginSuccess,
  onLoginError,
  showRememberMe = true,
  showForgotPassword = true,
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 尝试从AuthProvider上下文获取config，如果没有则使用props中的config
  let authContext: AuthContextType | undefined;
  try {
    authContext = useAuthContext();
  } catch (e) {
    // 如果不在AuthProvider中，authContext将为undefined
  }

  // 优先使用props中的config，如果没有则使用上下文中的config
  const finalConfig = config || authContext?.config;

  if (!finalConfig) {
    throw new Error('LoginForm requires either a config prop or to be used within AuthProvider');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 如果使用AuthProvider，使用其login方法
      if (authContext) {
        await authContext.login({ email, password, rememberMe });
        onLoginSuccess?.(authContext.user);
      } else {
        // 否则使用传统的fetch方式
        const response = await fetch(`${finalConfig.apiUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const user = await response.json();
        onLoginSuccess?.(user);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      onLoginError?.(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleSSOClick = (provider: any) => {
    // 如果使用AuthProvider，使用其loginWithSSO方法
    if (authContext) {
      authContext.loginWithSSO(provider);
    } else {
      // 否则使用传统的重定向方式
      window.location.href = `${finalConfig.apiUrl}/auth/sso/${provider.id}`;
    }
  };

  return (
    <AuthCard
      logo={finalConfig.appLogo && <img src={finalConfig.appLogo} alt={finalConfig.appName || 'App Logo'} className="h-12 mb-2" />}
      title={finalConfig.appName || '登录'}
      className={className}
      cardBg={theme?.cardBg || 'bg-gray-50'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">邮箱</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">密码</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        {showRememberMe && (
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">记住我</label>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
      {showForgotPassword && (
        <div className="mt-2 text-right">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">忘记密码？</a>
        </div>
      )}
      {finalConfig.authMethods.sso?.enabled && finalConfig.authMethods.sso.providers && (
        <div className="mt-6">
          <div className="relative flex items-center justify-center">
            <span className="px-2 bg-white text-gray-400 text-xs">或</span>
            <div className="absolute left-0 right-0 h-px bg-gray-200" />
          </div>
          <SSOButtons
            providers={finalConfig.authMethods.sso.providers}
            onSSOClick={handleSSOClick}
            theme={theme}
            className="mt-4"
          />
        </div>
      )}
    </AuthCard>
  );
}; 