const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');

// 环境变量
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// 通用插件配置
const commonPlugins = [
  resolve({
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }),
  commonjs({
    include: /node_modules/
  }),
  typescript({
    tsconfig: './tsconfig.json',
    sourceMap: !isProduction,
    exclude: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**', 'examples/**/*']
  })
];

// 生产环境添加压缩
if (isProduction) {
  commonPlugins.push(
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    })
  );
}

// 通用输出配置
const createOutput = (file, format) => ({
  file,
  format,
  sourcemap: !isProduction,
  exports: 'named',
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
});

module.exports = [
  // 主包构建
  {
    input: 'src/index.ts',
    output: [
      createOutput('dist/index.js', 'cjs'),
      createOutput('dist/index.esm.js', 'esm')
    ],
    plugins: commonPlugins,
    external: ['react', 'react-dom', '@tjsglion/sso-client-sdk', '@tjsglion/sso-icons'],
    onwarn(warning, warn) {
      // 忽略某些警告
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
      warn(warning);
    }
  },
  // themes 模块构建
  {
    input: 'src/themes/index.ts',
    output: [
      createOutput('dist/themes/index.js', 'cjs'),
      createOutput('dist/themes/index.esm.js', 'esm')
    ],
    plugins: commonPlugins,
    external: ['react', 'react-dom'],
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    }
  },
  // hooks 模块构建
  {
    input: 'src/hooks/index.ts',
    output: [
      createOutput('dist/hooks/index.js', 'cjs'),
      createOutput('dist/hooks/index.esm.js', 'esm')
    ],
    plugins: commonPlugins,
    external: ['react', 'react-dom', '@tjsglion/sso-client-sdk'],
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    }
  },
  // types 模块构建
  {
    input: 'src/types/index.ts',
    output: [
      createOutput('dist/types/index.js', 'cjs'),
      createOutput('dist/types/index.esm.js', 'esm')
    ],
    plugins: commonPlugins,
    external: ['react', 'react-dom'],
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    }
  }
]; 