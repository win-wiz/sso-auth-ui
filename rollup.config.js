const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');

module.exports = [
  // 主包构建
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist'
      })
    ],
    external: ['react', 'react-dom', '@tjsglion/sso-client-sdk', '@tjsglion/sso-icons']
  },
  // themes 模块构建
  {
    input: 'src/themes/index.ts',
    output: [
      {
        file: 'dist/themes/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/themes/index.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist/themes'
      })
    ],
    external: ['react', 'react-dom']
  },
  // hooks 模块构建
  {
    input: 'src/hooks/index.ts',
    output: [
      {
        file: 'dist/hooks/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/hooks/index.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist/hooks'
      })
    ],
    external: ['react', 'react-dom', '@tjsglion/sso-client-sdk']
  },
  // types 模块构建
  {
    input: 'src/types/index.ts',
    output: [
      {
        file: 'dist/types/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/types/index.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist/types'
      })
    ],
    external: ['react', 'react-dom']
  }
]; 