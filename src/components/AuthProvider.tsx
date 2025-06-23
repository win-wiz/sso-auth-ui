"use client";

import React, { createContext, useContext } from 'react';
import { AuthProviderProps, AuthContextType, ThemeConfig } from '../types';
import { useAuth } from '../hooks/useAuth';

interface AuthContextWithTheme extends AuthContextType {
  theme?: ThemeConfig;
}

const AuthContext = createContext<AuthContextWithTheme | null>(null);

export const AuthProvider: React.FC<AuthProviderProps & { theme?: ThemeConfig }> = ({ config, children, theme }) => {
  const auth = useAuth(config);
  const contextValue: AuthContextWithTheme = {
    ...auth,
    config,
    theme,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextWithTheme => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}; 