'use strict';

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:n/recommended'],
  env: {
    browser: true,
  },
  rules: {
    'no-console': 'error',
  },
};
