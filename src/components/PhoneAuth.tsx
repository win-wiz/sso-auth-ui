import React, { useState, useEffect } from 'react';
import { PhoneAuthProps } from '../types';

export const PhoneAuth: React.FC<PhoneAuthProps> = ({
  phone,
  code,
  onSendCode,
  onVerify,
  theme,
  className = '',
}) => {
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [verificationCode, setVerificationCode] = useState(code);
  const [countdown, setCountdown] = useState(0);
  const [step, setStep] = useState<'phone' | 'code'>('phone');

  // 倒计时效果
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = () => {
    if (phoneNumber && phoneNumber.length >= 11) {
      onSendCode(phoneNumber);
      setCountdown(60);
      setStep('code');
    }
  };

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      onVerify(phoneNumber, verificationCode);
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

  if (step === 'phone') {
    return (
      <div className={`phone-auth ${className}`} style={containerStyle}>
        <h3>手机号登录</h3>
        <p>请输入您的手机号</p>
        
        <div className="phone-input">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 11);
              setPhoneNumber(value);
            }}
            placeholder="请输入手机号"
            maxLength={11}
            style={inputStyle}
            autoFocus
          />
        </div>
        
        <button
          onClick={handleSendCode}
          disabled={!phoneNumber || phoneNumber.length < 11}
          style={buttonStyle}
          className="send-code-button"
        >
          发送验证码
        </button>
      </div>
    );
  }

  return (
    <div className={`phone-auth ${className}`} style={containerStyle}>
      <h3>验证码登录</h3>
      <p>验证码已发送至 {phoneNumber}</p>
      
      <div className="code-input">
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
          登录
        </button>
        <button
          onClick={() => setStep('phone')}
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
      
      <div className="resend-section">
        <button
          onClick={handleSendCode}
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