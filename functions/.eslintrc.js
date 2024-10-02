// eslint-disable-next-line no-undef
module.exports = {
  env: {
    es6: true,
    node: true, // Ensure Node.js environment
    browser: false, // Disable browser environment if you are only working with Node.js
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module", // Use 'module' if you want to use import/export
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
  },
  globals: {
    require: "readonly", // Declare 'require' as a global variable
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
};
