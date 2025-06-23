"use client";

import React, { useState } from 'react';
import { RegisterFormProps, AuthContextType } from '../types';
import { SSOButtons } from './SSOButtons';
import { useAuthContext } from './AuthProvider';
import { AuthCard } from './AuthCard';

export const RegisterForm: React.FC<RegisterFormProps> = ({
  config,
  theme,
  onRegisterSuccess,
  onRegisterError,
  confirmPassword = true,
  termsUrl,
  privacyUrl,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  let authContext: AuthContextType | undefined;
  try {
    authContext = useAuthContext();
  } catch (e) {}
  const finalConfig = config || authContext?.config;
  if (!finalConfig) {
    throw new Error('RegisterForm requires a config prop or to be used within an AuthProvider.');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (confirmPassword && formData.password !== formData.confirmPassword) {
      setError('两次密码输入不一致');
      setLoading(false);
      return;
    }
    try {
      if (authContext) {
        await authContext.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        onRegisterSuccess?.(authContext.user);
      } else {
        const response = await fetch(`${finalConfig.apiUrl}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });
        if (!response.ok) throw new Error('Registration failed');
        const user = await response.json();
        onRegisterSuccess?.(user);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      onRegisterError?.(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleSSOClick = (provider: any) => {
    if (authContext) {
      authContext.loginWithSSO(provider);
    } else {
      window.location.href = `${finalConfig.apiUrl}/auth/sso/${provider.id}`;
    }
  };

  return (
    <AuthCard
      logo={finalConfig.appLogo && <img src={finalConfig.appLogo} alt={finalConfig.appName || 'App Logo'} className="h-12 mb-2" />}
      title={finalConfig.appName || '注册'}
      className={className}
      cardBg={theme?.cardBg || 'bg-gray-50'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">姓名</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">邮箱</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">密码</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        {confirmPassword && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">确认密码</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? '注册中...' : '注册'}
        </button>
      </form>
      {(termsUrl || privacyUrl) && (
        <div className="mt-2 text-xs text-gray-500 text-center space-x-2">
          {termsUrl && (
            <a href={termsUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">服务条款</a>
          )}
          {privacyUrl && (
            <a href={privacyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">隐私政策</a>
          )}
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