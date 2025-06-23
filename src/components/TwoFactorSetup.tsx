"use client";

import React, { useState } from 'react';
import { TwoFactorSetupProps } from '../types';

export const TwoFactorSetup: React.FC<TwoFactorSetupProps> = ({
  qrCodeUrl,
  secretKey,
  onEnable,
  onCancel,
  theme,
  className = '',
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'qr' | 'verify'>('qr');

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      onEnable(verificationCode);
    }
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

  if (step === 'qr') {
    return (
      <div className={`two-factor-setup ${className}`} style={containerStyle}>
        <h3>设置双因素认证</h3>
        <p>请使用您的认证器应用扫描以下二维码：</p>
        
        <div className="qr-section">
          <img src={qrCodeUrl} alt="QR Code" style={{ maxWidth: '200px' }} />
        </div>
        
        <div className="secret-section">
          <p>或者手动输入密钥：</p>
          <code style={{ 
            backgroundColor: theme?.backgroundColor || '#f3f4f6',
            padding: '8px 12px',
            borderRadius: theme?.borderRadius || '0.375rem',
            fontFamily: 'monospace'
          }}>
            {secretKey}
          </code>
        </div>
        
        <div className="actions">
          <button
            onClick={() => setStep('verify')}
            style={buttonStyle}
            className="next-button"
          >
            下一步
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
      </div>
    );
  }

  return (
    <div className={`two-factor-setup ${className}`} style={containerStyle}>
      <h3>验证双因素认证</h3>
      <p>请在您的认证器应用中输入验证码：</p>
      
      <div className="verification-section">
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
            setVerificationCode(value);
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
          disabled={verificationCode.length !== 6}
          style={buttonStyle}
          className="verify-button"
        >
          启用 2FA
        </button>
        <button
          onClick={() => setStep('qr')}
          style={{
            ...buttonStyle,
            backgroundColor: 'transparent',
            color: theme?.textColor || '#1f2937',
            border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
          }}
          className="back-button"
        >
          返回
        </button>
      </div>
    </div>
  );
}; 