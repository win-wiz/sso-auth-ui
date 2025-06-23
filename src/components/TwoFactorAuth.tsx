"use client";

import React, { useState, useEffect } from 'react';
import { TwoFactorAuthProps } from '../types';

export const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({
  onVerify,
  onCancel,
  theme,
  className = '',
}) => {
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  // 倒计时效果
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = () => {
    if (code.length === 6) {
      onVerify(code);
    }
  };

  const handleResend = () => {
    setCountdown(60);
    // 这里可以调用重新发送验证码的API
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

  const containerStyle = {
    backgroundColor: theme?.backgroundColor || '#ffffff',
    border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
    borderRadius: theme?.borderRadius || '0.5rem',
    boxShadow: theme?.boxShadow || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div className={`two-factor-auth ${className}`} style={containerStyle}>
      <h3>双因素认证</h3>
      <p>请输入您的验证码</p>
      
      <div className="code-input">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
            setCode(value);
          }}
          placeholder="6位验证码"
          maxLength={6}
          style={inputStyle}
          autoFocus
        />
      </div>

      <div className="actions">
        <button
          onClick={handleVerify}
          disabled={code.length !== 6}
          style={buttonStyle}
          className="verify-button"
        >
          验证
        </button>
        <button
          onClick={onCancel}
          style={{
            ...buttonStyle,
            backgroundColor: 'transparent',
            color: theme?.textColor || '#1f2937',
            border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
          }}
          className="cancel-button"
        >
          取消
        </button>
      </div>

      <div className="resend-section">
        <button
          onClick={handleResend}
          disabled={countdown > 0}
          style={{
            backgroundColor: 'transparent',
            color: theme?.primaryColor || '#3b82f6',
            border: 'none',
            cursor: countdown > 0 ? 'not-allowed' : 'pointer',
          }}
        >
          {countdown > 0 ? `${countdown}秒后重发` : '重新发送验证码'}
        </button>
      </div>
    </div>
  );
}; 