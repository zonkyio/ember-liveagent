const baseConfig = require("../.lintstagedrc.cjs");

module.exports = {
  ...baseConfig,
  "*.hbs": ["ember-template-lint --fix", "prettier --write"],
  "*.css": ["stylelint --fix", "prettier --write"],
  "*.html": "prettier --write",
};
