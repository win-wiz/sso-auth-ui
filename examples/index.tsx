import React from 'react';
import SimpleUsage from './simple-usage';
import ReactExample from './react-example';
import ModularAuthExample from './modular-auth-example';

// 示例列表
const examples = {
  simple: {
    name: '简单使用',
    description: '最基础的登录表单使用方式',
    component: SimpleUsage
  },
  react: {
    name: 'React示例',
    description: '完整的React应用集成示例',
    component: ReactExample
  },
  modular: {
    name: '模块化认证',
    description: '展示多种认证方式的组合使用',
    component: ModularAuthExample
  }
};

// 示例导航组件
export function ExamplesNavigator() {
  const [currentExample, setCurrentExample] = React.useState('simple');

  const CurrentComponent = examples[currentExample as keyof typeof examples].component;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '10px'
        }}>
          SSO Auth UI 示例
        </h1>
        <p style={{ 
          fontSize: '1.1rem',
          color: '#6b7280',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          查看不同的使用场景和集成方式，选择最适合您项目的示例
        </p>
      </div>

      {/* 示例选择器 */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {Object.entries(examples).map(([key, { name, description }]) => (
          <button
            key={key}
            onClick={() => setCurrentExample(key)}
            style={{
              padding: '20px',
              border: currentExample === key ? '2px solid #3b82f6' : '1px solid #e5e7eb',
              borderRadius: '12px',
              backgroundColor: currentExample === key ? '#eff6ff' : 'white',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              boxShadow: currentExample === key ? '0 4px 12px rgba(59, 130, 246, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              if (currentExample !== key) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentExample !== key) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '600',
              color: currentExample === key ? '#1d4ed8' : '#374151',
              marginBottom: '8px'
            }}>
              {name}
            </h3>
            <p style={{ 
              fontSize: '0.875rem',
              color: currentExample === key ? '#3b82f6' : '#6b7280',
              lineHeight: '1.5'
            }}>
              {description}
            </p>
          </button>
        ))}
      </div>

      {/* 当前示例 */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <CurrentComponent />
      </div>

      {/* 快速链接 */}
      <div style={{ 
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '15px'
        }}>
          需要更多帮助？
        </h3>
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <a
            href="./API_DOCUMENTATION.md"
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            查看API文档
          </a>
          <a
            href="./QUICK_START_GUIDE.md"
            style={{
              padding: '10px 20px',
              backgroundColor: '#10b981',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
          >
            快速开始指南
          </a>
          <a
            href="https://github.com/your-org/sso-auth-ui/issues"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              backgroundColor: '#6b7280',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
          >
            问题反馈
          </a>
        </div>
      </div>
    </div>
  );
}

// 默认导出
export default ExamplesNavigator; 