"use client";

import React, { useState } from 'react';
import { LoginFormProps, AuthContextType } from '../types';
import { SSOButtons } from './SSOButtons';
import { useAuthContext } from './AuthProvider';

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

  const formStyle = {
    backgroundColor: theme?.backgroundColor || '#ffffff',
    border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
    borderRadius: theme?.borderRadius || '0.5rem',
    boxShadow: theme?.boxShadow || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
    borderRadius: theme?.borderRadius || '0.375rem',
    color: theme?.textColor || '#1f2937',
  };

  const buttonStyle = {
    backgroundColor: theme?.primaryColor || '#3b82f6',
    color: '#ffffff',
    borderRadius: theme?.borderRadius || '0.375rem',
  };

  return (
    <div className={`login-form ${className}`} style={formStyle}>
      {finalConfig.appLogo && (
        <div className="app-logo">
          <img src={finalConfig.appLogo} alt={finalConfig.appName || 'App Logo'} />
        </div>
      )}
      
      <h2>{finalConfig.appName || 'Login'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        {error && (
          <div className="error-message" style={{ color: theme?.errorColor || '#ef4444' }}>
            {error}
          </div>
        )}

        {showRememberMe && (
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
          className="submit-button"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      {showForgotPassword && (
        <div className="forgot-password">
          <a href="/forgot-password">Forgot your password?</a>
        </div>
      )}

      {finalConfig.authMethods.sso?.enabled && finalConfig.authMethods.sso.providers && (
        <div className="sso-section">
          <div className="divider">or</div>
          <SSOButtons
            providers={finalConfig.authMethods.sso.providers}
            onSSOClick={handleSSOClick}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
}; 