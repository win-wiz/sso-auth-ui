import React from 'react';
import { SSOButtons } from '../src/components/SSOButtons';

// 示例1: 自动获取提供商数据
export const AutoFetchExample: React.FC = () => {
  const handleSSOClick = (provider: any) => {
    console.log('SSO登录:', provider);
    // 可以在这里处理自定义的登录逻辑
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">自动获取SSO提供商</h2>
      <SSOButtons
        onSSOClick={handleSSOClick}
        theme={{
          primaryColor: '#3b82f6',
          buttonTextColor: '#ffffff',
          borderColor: '#e5e7eb'
        }}
      />
    </div>
  );
};

// 示例2: 手动传入提供商数据（向后兼容）
export const ManualProvidersExample: React.FC = () => {
  const providers = [
    {
      id: 'google',
      name: 'Google',
      type: 'oauth',
      clientId: 'google-client-id',
      brandColor: '#4285f4',
      textColor: '#ffffff'
    },
    {
      id: 'github',
      name: 'GitHub',
      type: 'oauth',
      clientId: 'github-client-id',
      brandColor: '#24292e',
      textColor: '#ffffff'
    }
  ];

  const handleSSOClick = (provider: any) => {
    console.log('SSO登录:', provider);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">手动传入SSO提供商</h2>
      <SSOButtons
        providers={providers}
        onSSOClick={handleSSOClick}
        theme={{
          primaryColor: '#10b981',
          buttonTextColor: '#ffffff',
          borderColor: '#d1d5db'
        }}
      />
    </div>
  );
};

// 示例3: 在 AuthProvider 中使用
export const WithAuthProviderExample: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">在AuthProvider中使用</h2>
      <SSOButtons
        theme={{
          primaryColor: '#8b5cf6',
          buttonTextColor: '#ffffff',
          borderColor: '#e5e7eb'
        }}
      />
    </div>
  );
};

// 示例4: 错误处理和加载状态
export const ErrorHandlingExample: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">错误处理示例</h2>
      <SSOButtons
        theme={{
          primaryColor: '#ef4444',
          buttonTextColor: '#ffffff',
          borderColor: '#fecaca'
        }}
      />
    </div>
  );
}; 