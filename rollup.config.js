import buble from 'rollup-plugin-buble';
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
  {
    input: 'es/funJSON.js',
    output: {
      name: 'funJSON',
      file: pkg.main,
      format: 'cjs',
      esModule: false,
      sourcemap: true,
      interop: false,
    },
    plugins: [buble()],
  },
  {
    input: 'es/funJSON.js',
    output: {
      name: 'funJSON',
      file: pkg.browser,
      format: 'iife',
      esModule: false,
      sourcemap: true,
      interop: false,
    },
    plugins: [buble(), resolve(), commonjs(), terser()],
  },
  {
    input: 'es/funJSON.js',
    output: {
      name: 'funJSON',
      file: pkg.browser.replace('.min.', '.'),
      format: 'iife',
      esModule: false,
      sourcemap: true,
      interop: false,
    },
    plugins: [buble(), resolve(), commonjs()],
  },
];
