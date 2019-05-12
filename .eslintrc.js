module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['prettier'],
  "parserOptions": {
    "sourceType": "module",
  },
  rules: {
    // 'no-undef':1,
    'quotes': ["error", "single", { "avoidEscape": true }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        arrowParens: 'always',
        printWidth: 80,
      },
    ],
  },
};
