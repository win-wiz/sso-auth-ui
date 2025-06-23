"use client";

import React, { useState, useEffect } from 'react';
import { TwoFactorAuthProps } from '../types';
import { AuthCard } from './AuthCard';

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

  return (
    <AuthCard title="双因素认证" className={className} cardBg={theme?.cardBg || 'bg-gray-50'}>
      <div className="mb-2 text-sm text-gray-600">请输入您的验证码</div>
      <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleVerify(); }}>
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">验证码</label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
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
            disabled={code.length !== 6}
            className="flex-1 py-2 px-4 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            验证
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 px-4 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          >
            取消
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={countdown > 0}
          className="text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {countdown > 0 ? `${countdown}秒后重发` : '重新发送验证码'}
        </button>
      </div>
    </AuthCard>
  );
}; 