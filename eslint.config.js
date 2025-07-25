import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import PluginPrettier from 'eslint-plugin-prettier';
import ConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      prettier: PluginPrettier,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
    extends: ['js/recommended'],
  },
  tseslint.configs.recommended,
  ConfigPrettier,
]);
