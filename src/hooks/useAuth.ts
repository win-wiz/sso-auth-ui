import { useState, useEffect, useCallback, useMemo } from 'react';
import { SSOClient } from '@tjsglion/sso-client-sdk';
import { AuthConfig, AuthContextType, LoginCredentials, RegisterCredentials } from '../types';

export const useAuth = (config: AuthConfig): AuthContextType => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // 使用 useMemo 确保 ssoClient 实例在配置不变时不会重新创建
  const ssoClient = useMemo(() => new SSOClient({
    baseUrl: config.apiUrl,
    redirectUri: config.redirectUrl,
  }), [config.apiUrl, config.redirectUrl]);

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await ssoClient.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [ssoClient]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      if (credentials.email && credentials.password) {
        const user = await ssoClient.loginWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
        setUser(user);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [ssoClient]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      setLoading(true);
      if (credentials.email && credentials.password) {
        const user = await ssoClient.register({
          email: credentials.email,
          password: credentials.password,
          name: credentials.name,
        });
        setUser(user);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [ssoClient]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      ssoClient.logout();
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [ssoClient]);

  const loginWithSSO = useCallback(async (provider: any) => {
    try {
      setLoading(true);
      ssoClient.login({ providerId: provider.id });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [ssoClient]);

  const verify2FA = useCallback(async (code: string) => {
    try {
      setLoading(true);
      const success = await ssoClient.verifyTwoFactor({ token: code });
      if (success) {
        // 重新获取用户信息
        const user = await ssoClient.getCurrentUser();
        setUser(user);
      } else {
        throw new Error('2FA verification failed');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [ssoClient]);

  // 添加 getProviders 方法
  const getProviders = useCallback(async () => {
    return await ssoClient.getProviders();
  }, [ssoClient]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    config,
    user,
    loading,
    login,
    register,
    logout,
    loginWithSSO,
    verify2FA,
    checkAuth,
    getProviders,  // 新增：获取提供商列表
    ssoClient,     // 新增：暴露 ssoClient 实例
  };
}; 