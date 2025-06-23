"use client";

import React from 'react';
import { SSOIcon } from '@tjsglion/sso-icons';
import { SSOButtonsProps } from '../types';

export const SSOButtons: React.FC<SSOButtonsProps> = ({
  providers,
  onSSOClick,
  theme,
  className = '',
  buttonClass = '',
}) => {
  return (
    <div className={`flex flex-col gap-3 mt-4 ${className}`}>
      {providers.map((provider) => (
        <button
          key={provider.id}
          onClick={() => onSSOClick(provider)}
          className={`flex items-center justify-center gap-2 py-2 rounded-md border font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${buttonClass}`}
          style={{
            background: provider.brandColor || theme?.primaryColor || '#f3f4f6',
            color: provider.textColor || theme?.buttonTextColor || '#111827',
            borderColor: theme?.borderColor || '#d1d5db',
          }}
        >
          {/* @ts-ignore */}
          <SSOIcon provider={provider} size={20} />
          <span>Continue with {provider.name}</span>
        </button>
      ))}
    </div>
  );
}; 