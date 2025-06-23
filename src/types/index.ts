import { SSOProvider } from '@tjsglion/sso-client-sdk';

export interface AuthConfig {
  /** API 基础URL */
  apiUrl: string;
  /** 应用名称 */
  appName?: string;
  /** 应用Logo URL */
  appLogo?: string;
  /** 重定向URL */
  redirectUrl?: string;
  
  // 认证方式配置
  authMethods: {
    /** 邮箱密码登录 */
    emailPassword?: {
      enabled: boolean;
      requireEmailVerification?: boolean;
      allowRegistration?: boolean;
      allowPasswordReset?: boolean;
    };
    /** 双因素认证 */
    twoFactor?: {
      enabled: boolean;
      allowSetup?: boolean;
      totpIssuer?: string;
      totpLabel?: string;
    };
    /** SSO 单点登录 */
    sso?: {
      enabled: boolean;
      providers?: SSOProvider[];
    };
    /** 手机号登录 */
    phone?: {
      enabled: boolean;
      allowRegistration?: boolean;
      requireSmsVerification?: boolean;
    };
    /** 验证码登录 */
    captcha?: {
      enabled: boolean;
      type?: 'image' | 'sms' | 'email';
    };
  };
  
  // 认证流程配置
  authFlow?: {
    /** 登录后是否自动跳转 */
    autoRedirect?: boolean;
    /** 登录成功后的跳转URL */
    successRedirectUrl?: string;
    /** 是否记住登录状态 */
    rememberMe?: boolean;
    /** 会话超时时间（分钟） */
    sessionTimeout?: number;
  };
}

export interface ThemeConfig {
  /** 主色调 */
  primaryColor?: string;
  /** 背景色 */
  backgroundColor?: string;
  /** 文字颜色 */
  textColor?: string;
  /** 边框颜色 */
  borderColor?: string;
  /** 错误颜色 */
  errorColor?: string;
  /** 成功颜色 */
  successColor?: string;
  /** 圆角大小 */
  borderRadius?: string;
  /** 阴影 */
  boxShadow?: string;
}

export interface AuthFormProps {
  /** 认证配置 */
  config?: AuthConfig;
  /** 主题配置 */
  theme?: ThemeConfig;
  /** 登录成功回调 */
  onLoginSuccess?: (user: any) => void;
  /** 登录失败回调 */
  onLoginError?: (error: Error) => void;
  /** 注册成功回调 */
  onRegisterSuccess?: (user: any) => void;
  /** 注册失败回调 */
  onRegisterError?: (error: Error) => void;
  /** 自定义样式类名 */
  className?: string;
}

export interface LoginFormProps extends AuthFormProps {
  /** 是否显示"记住我"选项 */
  showRememberMe?: boolean;
  /** 是否显示"忘记密码"链接 */
  showForgotPassword?: boolean;
}

export interface RegisterFormProps extends AuthFormProps {
  /** 密码确认字段 */
  confirmPassword?: boolean;
  /** 用户协议URL */
  termsUrl?: string;
  /** 隐私政策URL */
  privacyUrl?: string;
}

export interface SSOButtonsProps {
  /** SSO提供商列表 */
  providers: SSOProvider[];
  /** 点击SSO按钮回调 */
  onSSOClick: (provider: SSOProvider) => void;
  /** 主题配置 */
  theme?: ThemeConfig;
  /** 自定义样式类名 */
  className?: string;
}

export interface TwoFactorAuthProps {
  /** 验证回调 */
  onVerify: (code: string) => void;
  /** 取消回调 */
  onCancel: () => void;
  /** 主题配置 */
  theme?: ThemeConfig;
  /** 自定义样式类名 */
  className?: string;
}

export interface TwoFactorSetupProps {
  /** QR码URL */
  qrCodeUrl: string;
  /** 密钥 */
  secretKey: string;
  /** 启用回调 */
  onEnable: (code: string) => void;
  /** 取消回调 */
  onCancel: () => void;
  /** 主题配置 */
  theme?: ThemeConfig;
  /** 自定义样式类名 */
  className?: string;
}

export interface PhoneAuthProps {
  /** 手机号 */
  phone: string;
  /** 验证码 */
  code: string;
  /** 发送验证码回调 */
  onSendCode: (phone: string) => void;
  /** 验证回调 */
  onVerify: (phone: string, code: string) => void;
  /** 主题配置 */
  theme?: ThemeConfig;
  /** 自定义样式类名 */
  className?: string;
}

export interface AuthProviderProps {
  /** 认证配置 */
  config: AuthConfig;
  /** 子组件 */
  children: React.ReactNode;
}

export interface AuthContextType {
  /** 认证配置 */
  config: AuthConfig;
  /** 当前用户 */
  user: any | null;
  /** 是否已加载 */
  loading: boolean;
  /** 登录方法 */
  login: (credentials: LoginCredentials) => Promise<void>;
  /** 注册方法 */
  register: (credentials: RegisterCredentials) => Promise<void>;
  /** 登出方法 */
  logout: () => Promise<void>;
  /** SSO登录方法 */
  loginWithSSO: (provider: SSOProvider) => Promise<void>;
  /** 2FA验证方法 */
  verify2FA: (code: string) => Promise<void>;
  /** 检查认证状态 */
  checkAuth: () => Promise<void>;
}

export interface LoginCredentials {
  email?: string;
  password?: string;
  phone?: string;
  code?: string;
  totpCode?: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  code?: string;
}

export type AuthMethod = 'email' | 'phone' | 'sso' | '2fa';

export interface UnifiedAuthFormProps extends AuthFormProps {
  /** 默认显示的认证方式 */
  defaultMethod?: AuthMethod;
  /** 是否显示认证方式切换 */
  showMethodSwitch?: boolean;
  /** 自定义认证方式顺序 */
  methodOrder?: AuthMethod[];
} 