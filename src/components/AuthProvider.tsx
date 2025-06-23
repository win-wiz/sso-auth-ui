import React, { createContext, useContext } from 'react';
import { AuthProviderProps, AuthContextType } from '../types';
import { useAuth } from '../hooks/useAuth';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ config, children }) => {
  const auth = useAuth(config);

  const contextValue: AuthContextType = {
    ...auth,
    config
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}; 