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
    declaration: true,
    declarationDir: 'dist',
    rootDir: 'src',
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

module.exports = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: !isProduction,
    preserveModules: true,
    preserveModulesRoot: 'src'
  },
  plugins: commonPlugins,
  external: ['react', 'react-dom', 'react/jsx-runtime', '@tjsglion/sso-client-sdk', '@tjsglion/sso-icons'],
  onwarn(warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY' || warning.code === 'UNUSED_EXTERNAL_IMPORT') {
      return;
    }
    warn(warning);
  }
}; 