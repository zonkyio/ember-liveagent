'use strict';

module.exports = {
  '*.{js,ts,cjs,mjs}': ['eslint --cache --fix', 'prettier --write'],
  '*.{md,yml}': 'prettier --write',
};
