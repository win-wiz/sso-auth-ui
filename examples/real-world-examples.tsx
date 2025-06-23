import React, { useState, useEffect } from 'react';
import { 
  AuthProvider, 
  LoginForm, 
  RegisterForm, 
  TwoFactorAuth,
  PhoneAuth,
  UnifiedAuthForm,
  createTheme,
  AuthMethod
} from '../src';

// 真实项目配置示例
const realWorldConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.yourdomain.com',
  appName: '企业管理系统',
  appLogo: '/logo.png',
  redirectUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
  authMethods: {
    emailPassword: {
      enabled: true,
      allowRegistration: true,
      allowPasswordReset: true
    },
    phone: {
      enabled: true,
      allowRegistration: true
    },
    sso: {
      enabled: true,
      providers: [
        {
          id: 'google',
          name: 'Google',
          type: 'oauth2',
          clientId: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
          iconSvg: '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>'
        },
        {
          id: 'github',
          name: 'GitHub',
          type: 'oauth2',
          clientId: process.env.GITHUB_CLIENT_ID || 'your-github-client-id',
          iconSvg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'
        },
        {
          id: 'microsoft',
          name: 'Microsoft',
          type: 'oauth2',
          clientId: process.env.MICROSOFT_CLIENT_ID || 'your-microsoft-client-id',
          iconSvg: '<svg viewBox="0 0 24 24"><path fill="#f25022" d="M0 0h11v11H0z"/><path fill="#7fba00" d="M12 0h11v11H12z"/><path fill="#00a4ef" d="M0 12h11v11H0z"/><path fill="#ffb900" d="M12 12h11v11H12z"/></svg>'
        }
      ]
    },
    twoFactor: {
      enabled: true
    }
  }
};

// 企业主题
const enterpriseTheme = createTheme({
  primaryColor: '#2563eb',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  borderColor: '#d1d5db',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
});

// 示例1: SaaS应用登录页面
export function SaaSLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = async (user: any) => {
    setLoading(true);
    try {
      // 保存用户信息到localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
      
      // 设置用户偏好
      if (user.preferences) {
        localStorage.setItem('userPreferences', JSON.stringify(user.preferences));
      }
      
      // 跳转到仪表板
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('登录后处理失败:', error);
      alert('登录成功，但初始化失败，请刷新页面重试');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = (error: Error) => {
    console.error('登录失败:', error);
    
    // 根据错误类型显示不同的提示
    if (error.message.includes('invalid_credentials')) {
      alert('邮箱或密码错误，请重试');
    } else if (error.message.includes('account_locked')) {
      alert('账户已被锁定，请联系管理员');
    } else if (error.message.includes('rate_limit')) {
      alert('登录尝试过于频繁，请稍后再试');
    } else {
      alert('登录失败: ' + error.message);
    }
  };

  const handleRegisterSuccess = (user: any) => {
    console.log('注册成功:', user);
    alert('注册成功！请检查邮箱完成验证');
    setIsLogin(true);
  };

  return (
    <AuthProvider config={realWorldConfig}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img 
              className="mx-auto h-12 w-auto" 
              src="/logo.png" 
              alt="Logo" 
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {isLogin ? '登录到您的账户' : '创建新账户'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? '欢迎回来！请输入您的凭据' : '开始您的免费试用'}
            </p>
          </div>

          <div className="bg-white py-8 px-6 shadow-xl rounded-lg">
            <div className="flex mb-6">
              <button
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  isLogin 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setIsLogin(true)}
              >
                登录
              </button>
              <button
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  !isLogin 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setIsLogin(false)}
              >
                注册
              </button>
            </div>

            {isLogin ? (
              <LoginForm
                config={realWorldConfig}
                theme={enterpriseTheme}
                onLoginSuccess={handleLoginSuccess}
                onLoginError={handleLoginError}
                showRememberMe={true}
                showForgotPassword={true}
              />
            ) : (
              <RegisterForm
                config={realWorldConfig}
                theme={enterpriseTheme}
                onRegisterSuccess={handleRegisterSuccess}
                onRegisterError={handleLoginError}
                confirmPassword={true}
                termsUrl="/terms"
                privacyUrl="/privacy"
              />
            )}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

// 示例2: 移动端应用登录
export function MobileAppLogin() {
  const [show2FA, setShow2FA] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [user, setUser] = useState<any>(null);

  const handleLoginSuccess = (userData: any) => {
    if (userData.requires2FA) {
      setUser(userData);
      setTempToken(userData.tempToken);
      setShow2FA(true);
    } else {
      // 直接登录成功
      handleAuthSuccess(userData);
    }
  };

  const handle2FASuccess = (userData: any) => {
    handleAuthSuccess(userData);
  };

  const handleAuthSuccess = (userData: any) => {
    // 保存到本地存储
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
    
    // 发送分析事件
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'login', {
        method: userData.loginMethod,
        user_id: userData.id
      });
    }
    
    // 跳转到主应用
    window.location.href = '/app';
  };

  if (show2FA) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">两步验证</h2>
            <p className="text-gray-600 mt-2">
              请输入发送到 {user?.email} 的验证码
            </p>
          </div>
          
          <TwoFactorAuth
            onVerify={(code: string) => {
              // 这里应该调用验证API
              console.log('验证码:', code);
              handle2FASuccess(user);
            }}
            onCancel={() => setShow2FA(false)}
            theme={enterpriseTheme}
          />
        </div>
      </div>
    );
  }

  return (
    <AuthProvider config={realWorldConfig}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img 
              className="mx-auto h-16 w-auto mb-4" 
              src="/logo.png" 
              alt="Logo" 
            />
            <h1 className="text-3xl font-bold text-gray-900">欢迎回来</h1>
            <p className="text-gray-600 mt-2">登录您的账户</p>
          </div>
          
          <LoginForm
            config={realWorldConfig}
            onLoginSuccess={handleLoginSuccess}
            onLoginError={(error) => alert('登录失败: ' + error.message)}
            showRememberMe={false}
            showForgotPassword={true}
          />
        </div>
      </div>
    </AuthProvider>
  );
}

// 示例3: 企业内部门户
export function EnterprisePortal() {
  const [selectedMethod, setSelectedMethod] = useState<AuthMethod>('email');
  const [loading, setLoading] = useState(false);

  const handleAuthSuccess = (user: any) => {
    setLoading(true);
    
    // 企业特定的处理逻辑
    if (user.department) {
      localStorage.setItem('department', user.department);
    }
    
    if (user.permissions) {
      localStorage.setItem('permissions', JSON.stringify(user.permissions));
    }
    
    // 记录登录日志
    fetch('/api/auth/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        method: selectedMethod,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      })
    }).catch(console.error);
    
    // 跳转到相应的部门页面
    const redirectPath = user.department === 'admin' ? '/admin' : '/dashboard';
    window.location.href = redirectPath;
  };

  const handleAuthError = (error: Error) => {
    console.error('认证失败:', error);
    
    // 企业错误处理
    if (error.message.includes('account_disabled')) {
      alert('账户已被禁用，请联系IT部门');
    } else if (error.message.includes('password_expired')) {
      alert('密码已过期，请重置密码');
    } else {
      alert('认证失败: ' + error.message);
    }
  };

  return (
    <AuthProvider config={realWorldConfig}>
      <div className="min-h-screen bg-gray-900 flex">
        {/* 侧边栏 */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-600 items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">企业门户</h1>
            <p className="text-xl opacity-90">
              安全、高效的企业级身份认证系统
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>支持多种登录方式</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>企业级安全保障</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>统一身份管理</span>
              </div>
            </div>
          </div>
        </div>

        {/* 登录区域 */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <img 
                className="mx-auto h-12 w-auto mb-4" 
                src="/logo.png" 
                alt="Logo" 
              />
              <h2 className="text-2xl font-bold text-gray-900">企业登录</h2>
              <p className="text-gray-600 mt-2">请选择登录方式</p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6">
              <UnifiedAuthForm
                config={realWorldConfig}
                onLoginSuccess={handleAuthSuccess}
                onLoginError={handleAuthError}
                defaultMethod={selectedMethod}
                showMethodSwitch={true}
              />
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>遇到问题？请联系 IT 支持</p>
              <p className="mt-1">电话: 400-123-4567 | 邮箱: support@company.com</p>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

// 示例4: 电商平台登录
export function EcommerceLogin() {
  const [guestMode, setGuestMode] = useState(false);

  const handleLoginSuccess = (user: any) => {
    // 保存用户信息
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
    
    // 合并购物车
    const guestCart = localStorage.getItem('guestCart');
    if (guestCart && user.id) {
      fetch('/api/cart/merge', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ guestCart: JSON.parse(guestCart) })
      }).then(() => {
        localStorage.removeItem('guestCart');
      });
    }
    
    // 跳转到之前的页面或首页
    const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
    window.location.href = returnUrl || '/';
  };

  const handleGuestMode = () => {
    setGuestMode(true);
    // 创建访客会话
    const guestId = 'guest_' + Date.now();
    localStorage.setItem('guestId', guestId);
    window.location.href = '/';
  };

  return (
    <AuthProvider config={realWorldConfig}>
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto pt-16 px-4">
          <div className="text-center mb-8">
            <img 
              className="mx-auto h-16 w-auto mb-4" 
              src="/logo.png" 
              alt="Logo" 
            />
            <h1 className="text-3xl font-bold text-gray-900">欢迎回来</h1>
            <p className="text-gray-600 mt-2">登录您的账户继续购物</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <LoginForm
              config={realWorldConfig}
              onLoginSuccess={handleLoginSuccess}
              onLoginError={(error) => alert('登录失败: ' + error.message)}
              showRememberMe={true}
              showForgotPassword={true}
            />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">或者</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleGuestMode}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  以访客身份继续
                </button>
                
                <button
                  onClick={() => window.location.href = '/register'}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  创建新账户
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>登录即表示您同意我们的</p>
            <p className="mt-1">
              <a href="/terms" className="text-blue-600 hover:text-blue-500">服务条款</a>
              {' '}和{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-500">隐私政策</a>
            </p>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

// 主示例组件
export default function RealWorldExamples() {
  const [currentExample, setCurrentExample] = useState('saas');

  const examples = {
    saas: { name: 'SaaS应用', component: SaaSLoginPage },
    mobile: { name: '移动端应用', component: MobileAppLogin },
    enterprise: { name: '企业门户', component: EnterprisePortal },
    ecommerce: { name: '电商平台', component: EcommerceLogin }
  };

  const CurrentComponent = examples[currentExample as keyof typeof examples].component;

  return (
    <div>
      <div style={{ 
        padding: '20px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
      }}>
        <h1 style={{ marginBottom: '20px' }}>真实世界使用场景</h1>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {Object.entries(examples).map(([key, { name }]) => (
            <button
              key={key}
              onClick={() => setCurrentExample(key)}
              style={{
                padding: '8px 16px',
                border: currentExample === key ? '2px solid #3b82f6' : '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: currentExample === key ? '#3b82f6' : 'white',
                color: currentExample === key ? 'white' : '#374151',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <CurrentComponent />
    </div>
  );
} 