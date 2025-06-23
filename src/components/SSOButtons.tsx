"use client";

import React from 'react';
import { SSOIcon } from '@tjsglion/sso-icons';
import { SSOButtonsProps } from '../types';

export const SSOButtons: React.FC<SSOButtonsProps> = ({
  providers,
  onSSOClick,
  theme,
  className = '',
}) => {
  const buttonStyle = {
    backgroundColor: theme?.backgroundColor || '#ffffff',
    border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
    borderRadius: theme?.borderRadius || '0.5rem',
    color: theme?.textColor || '#1f2937',
    boxShadow: theme?.boxShadow || '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  };

  return (
    <div className={`sso-buttons ${className}`}>
      {providers.map((provider) => (
        <button
          key={provider.id}
          onClick={() => onSSOClick(provider)}
          style={buttonStyle}
          className="sso-button"
        >
          {/* @ts-ignore */}
          <SSOIcon 
            provider={provider} 
            size={20} 
          />
          <span>Continue with {provider.name}</span>
        </button>
      ))}
    </div>
  );
}; 