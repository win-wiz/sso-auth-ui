"use client";

import React, { useState, useEffect } from 'react';
import { SSOIcon } from '@tjsglion/sso-icons';
import { SSOButtonsProps, SSOProviderWithColor } from '../types';
import { useAuthContext } from './AuthProvider';

export const SSOButtons: React.FC<SSOButtonsProps> = ({
  providers: externalProviders,
  onSSOClick,
  theme,
  className = '',
  buttonClass = '',
}) => {
  const [providers, setProviders] = useState<SSOProviderWithColor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 尝试从 AuthContext 获取 ssoClient 和 getProviders 方法
  let authContext: any = null;
  try {
    authContext = useAuthContext();
  } catch (error) {
    // AuthContext 不存在，将使用外部传入的 providers
  }

  // 获取提供商数据
  useEffect(() => {
    const fetchProviders = async () => {
      // 如果外部传入了 providers，优先使用
      if (externalProviders && externalProviders.length > 0) {
        setProviders(externalProviders);
        return;
      }

      // 如果有 AuthContext 且有 getProviders 方法，使用它获取数据
      if (authContext && authContext.getProviders) {
        try {
          setLoading(true);
          setError(null);
          
          const fetchedProviders = await authContext.getProviders();
          
          // 处理返回的数据格式（兼容不同的 API 响应格式）
          let processedProviders: SSOProviderWithColor[];
          if (Array.isArray(fetchedProviders)) {
            processedProviders = fetchedProviders;
          } else if (fetchedProviders && typeof fetchedProviders === 'object' && 'data' in fetchedProviders && Array.isArray((fetchedProviders as any).data)) {
            processedProviders = (fetchedProviders as any).data;
          } else {
            processedProviders = [];
          }
          
          setProviders(processedProviders);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : '获取SSO提供商失败';
          setError(errorMessage);
          console.error('Failed to fetch SSO providers:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProviders();
  }, [externalProviders, authContext]);

  // 处理 SSO 点击事件
  const handleSSOClick = (provider: SSOProviderWithColor) => {
    if (onSSOClick) {
      onSSOClick(provider);
    } else if (authContext && authContext.loginWithSSO) {
      // 使用 AuthContext 中的 loginWithSSO 方法
      authContext.loginWithSSO(provider);
    }
  };

  // 加载状态
  if (loading) {
    return (
      <div className={`flex flex-col gap-3 mt-4 ${className}`}>
        <div className="flex items-center justify-center py-2 text-gray-500">
          正在加载登录选项...
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className={`flex flex-col gap-3 mt-4 ${className}`}>
        <div className="flex items-center justify-center py-2 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  // 没有提供商
  if (!providers || providers.length === 0) {
    return (
      <div className={`flex flex-col gap-3 mt-4 ${className}`}>
        <div className="flex items-center justify-center py-2 text-gray-500">
          暂无可用的登录方式
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 mt-4 ${className}`}>
      {providers.map((provider) => (
        <button
          key={provider.id}
          onClick={() => handleSSOClick(provider)}
          className={`w-full flex items-center justify-center gap-4 py-3 px-5 rounded-lg border font-semibold text-base shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary bg-white hover:bg-gray-50 active:bg-gray-100 ${buttonClass}`}
          style={{
            background: provider.brandColor || theme?.primaryColor || '#fff',
            color: provider.textColor || theme?.buttonTextColor || '#111827',
            borderColor: theme?.borderColor || '#d1d5db',
          }}
        >
          {/* @ts-ignore */}
          <SSOIcon provider={provider} size={24} />
          <span className="truncate">{`Continue with ${provider.name}`}</span>
        </button>
      ))}
    </div>
  );
}; 