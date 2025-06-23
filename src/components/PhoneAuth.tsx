"use client";

import React, { useState, useEffect } from 'react';
import { PhoneAuthProps } from '../types';
import { AuthCard } from './AuthCard';

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

  if (step === 'phone') {
    return (
      <AuthCard title="手机号登录" className={className} cardBg={theme?.cardBg || 'bg-gray-50'}>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSendCode(); }}>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">手机号</label>
            <input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
              placeholder="请输入手机号"
              maxLength={11}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={!phoneNumber || phoneNumber.length < 11}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            发送验证码
          </button>
        </form>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="验证码登录" className={className} cardBg={theme?.cardBg || 'bg-gray-50'}>
      <div className="mb-2 text-sm text-gray-600">验证码已发送至 {phoneNumber}</div>
      <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleVerify(); }}>
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">验证码</label>
          <input
            id="code"
            type="text"
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="6位验证码"
            maxLength={6}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            autoFocus
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={verificationCode.length !== 6}
            className="flex-1 py-2 px-4 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            登录
          </button>
          <button
            type="button"
            onClick={() => setStep('phone')}
            className="flex-1 py-2 px-4 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          >
            返回
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={handleSendCode}
          disabled={countdown > 0}
          className="text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {countdown > 0 ? `${countdown}秒后重发` : '重新发送验证码'}
        </button>
      </div>
    </AuthCard>
  );
}; 