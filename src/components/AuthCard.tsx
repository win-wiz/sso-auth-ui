import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  logo?: React.ReactNode;
  title?: string;
  cardBg?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  children,
  className = '',
  style = {},
  logo,
  title = '登录',
  cardBg = 'bg-white',
}) => (
  <div className={`flex min-h-screen items-center justify-center ${cardBg}`}>
    <div className={`w-full max-w-md rounded-xl shadow-lg p-8 bg-white ${className}`} style={style}>
      {logo && <div className="flex justify-center mb-4">{logo}</div>}
      {title && <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>}
      {children}
    </div>
  </div>
); 