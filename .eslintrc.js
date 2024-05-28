'use strict';

module.exports = {
  root: true,
  ignorePatterns: ['**/*', '!.eslintrc.js', '!.prettierrc.cjs'],
  extends: ['eslint:recommended', 'plugin:n/recommended', 'prettier'],
  env: {
    node: true,
  },
  rules: {
    'no-console': 'error',
  },
};
