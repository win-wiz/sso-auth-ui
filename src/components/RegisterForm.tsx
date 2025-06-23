import React, { useState } from 'react';
import { RegisterFormProps } from '../types';
import { SSOButtons } from './SSOButtons';

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
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const user = await response.json();
      onRegisterSuccess?.(user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      onRegisterError?.(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleSSOClick = (provider: any) => {
    window.location.href = `${config.apiUrl}/auth/sso/${provider.id}`;
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
    <div className={`register-form ${className}`} style={formStyle}>
      {config.appLogo && (
        <div className="app-logo">
          <img src={config.appLogo} alt={config.appName || 'App Logo'} />
        </div>
      )}
      
      <h2>Create Account</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        {confirmPassword && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
        )}

        {error && (
          <div className="error-message" style={{ color: theme?.errorColor || '#ef4444' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
          className="submit-button"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      {(termsUrl || privacyUrl) && (
        <div className="legal-links">
          {termsUrl && (
            <a href={termsUrl} target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>
          )}
          {privacyUrl && (
            <a href={privacyUrl} target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          )}
        </div>
      )}

      {config.authMethods.sso?.enabled && config.authMethods.sso.providers && (
        <div className="sso-section">
          <div className="divider">or</div>
          <SSOButtons
            providers={config.authMethods.sso.providers}
            onSSOClick={handleSSOClick}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
}; 