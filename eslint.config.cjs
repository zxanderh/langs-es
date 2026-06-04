const {
  defineConfig,
  globalIgnores,
} = require('eslint/config');

const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const mocha = require('eslint-plugin-mocha').default;
const js = require('@eslint/js');
const markdownlint = require('eslint-plugin-markdownlint').default;
const markdownlintParser = require('eslint-plugin-markdownlint/parser.js').default;

const {
  FlatCompat,
} = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([{
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },

    parser: tsParser,
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {},
  },

  extends: compat.extends('eslint:recommended'),

  plugins: {
    '@typescript-eslint': typescriptEslint,
    mocha,
  },

  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],

    quotes: ['error', 'single', {
      avoidEscape: true,
    }],

    semi: ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    'comma-dangle': ['error', 'always-multiline'],

    'object-curly-spacing': ['error', 'always', {
      arraysInObjects: false,
      objectsInObjects: false,
    }],

    'eol-last': ['error', 'always'],

    'no-trailing-spaces': ['warn', {
      ignoreComments: true,
    }],
    'no-var': 'off',
  },
}, globalIgnores(['**/dist/']), {
  files: ['**/*.js', '**/*.cjs', '**/*.mjs'],

  rules: {
    'no-unused-vars': ['warn'],
  },
}, {
  files: ['**/*.ts'],
  extends: compat.extends('plugin:@typescript-eslint/recommended'),

  rules: {
    'no-var': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
}, {
  files: ['test/**/*.*js'],
  ...mocha.configs.recommended,
}, {
  files: ['**/*.md'],
  plugins: { markdownlint },
  languageOptions: { parser: markdownlintParser },
  rules: {
    ...markdownlint.configs.recommended.rules,
  },
}]);
