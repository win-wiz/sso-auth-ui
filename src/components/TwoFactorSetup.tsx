"use client";

import React, { useState } from 'react';
import { TwoFactorSetupProps } from '../types';
import { AuthCard } from './AuthCard';

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

  if (step === 'qr') {
    return (
      <AuthCard title="设置双因素认证" className={className} cardBg={theme?.cardBg || 'bg-gray-50'}>
        <div className="mb-2 text-sm text-gray-600">请使用您的认证器应用扫描以下二维码：</div>
        <div className="flex justify-center mb-4">
          <img src={qrCodeUrl} alt="QR Code" className="max-w-xs rounded" />
        </div>
        <div className="mb-4 text-center">
          <div className="text-xs text-gray-500 mb-1">或者手动输入密钥：</div>
          <code className="inline-block bg-gray-100 px-3 py-2 rounded font-mono text-sm">{secretKey}</code>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStep('verify')}
            className="flex-1 py-2 px-4 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            下一步
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 px-4 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          >
            取消
          </button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="验证双因素认证" className={className} cardBg={theme?.cardBg || 'bg-gray-50'}>
      <div className="mb-2 text-sm text-gray-600">请在您的认证器应用中输入验证码：</div>
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
            启用 2FA
          </button>
          <button
            type="button"
            onClick={() => setStep('qr')}
            className="flex-1 py-2 px-4 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          >
            返回
          </button>
        </div>
      </form>
    </AuthCard>
  );
}; 