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
    <div
      className={`w-full max-w-md rounded-2xl shadow-2xl p-10 bg-white ${className}`}
      style={style}
    >
      {logo && <div className="flex justify-center mb-6">{logo}</div>}
      {title && <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">{title}</h2>}
      {children}
    </div>
  </div>
); 