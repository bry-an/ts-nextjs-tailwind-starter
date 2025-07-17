const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const prettier = require('eslint-config-prettier');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const unusedImports = require('eslint-plugin-unused-imports');
const globals = require('globals');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  js.configs.recommended,
  ...compat.extends('next', 'next/core-web-vitals'),
  prettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['.next/**', 'node_modules/**', 'out/**'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
        React: true,
        JSX: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^@?\\w', '^\\u0000'],
            ['^.+\\.s?css$'],
            ['^@/lib', '^@/hooks'],
            ['^@/data'],
            ['^@/components', '^@/container'],
            ['^@/store'],
            ['^@/'],
            [
              '^\\./?$',
              '^\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\./\\.\\.(?!/?$)',
            ],
            ['^@/types'],
            ['^'],
          ],
        },
      ],
    },
  },
];