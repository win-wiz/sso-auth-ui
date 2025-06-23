// Components
export { AuthProvider, useAuthContext } from './components/AuthProvider';
export { LoginForm } from './components/LoginForm';
export { RegisterForm } from './components/RegisterForm';
export { SSOButtons } from './components/SSOButtons';
export { TwoFactorAuth } from './components/TwoFactorAuth';
export { TwoFactorSetup } from './components/TwoFactorSetup';
export { PhoneAuth } from './components/PhoneAuth';
export { UnifiedAuthForm } from './components/UnifiedAuthForm';

// Hooks
export { useAuth } from './hooks/useAuth';

// Themes
export { defaultTheme, darkTheme, createTheme } from './themes';

// Types
export type {
  AuthConfig,
  ThemeConfig,
  AuthFormProps,
  LoginFormProps,
  RegisterFormProps,
  SSOButtonsProps,
  TwoFactorAuthProps,
  TwoFactorSetupProps,
  PhoneAuthProps,
  AuthProviderProps,
  AuthContextType,
  LoginCredentials,
  RegisterCredentials,
  AuthMethod,
  UnifiedAuthFormProps,
} from './types'; 