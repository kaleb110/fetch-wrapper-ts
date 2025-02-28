// eslint.config.js (CommonJS)
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'], // Include TypeScript files
    languageOptions: {
      parser: parser, // Directly use the parser here
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      // Custom rules for TypeScript files
      'prefer-const': 'warn',
      'no-constant-binary-expression': 'error',
    },
  },
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'], // Include JavaScript files
    rules: {
      'prefer-const': 'warn',
      'no-constant-binary-expression': 'error',
    },
  },
];
