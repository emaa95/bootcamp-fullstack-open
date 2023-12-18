module.exports = {
  root: true,
  plugins: ['react', 'jest'],
  extends: [
    'eslint:recommended', 'plugin:react/recommended', 'plugin:jest/recommended'
  ],
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    "react-native/react-native": true
  },
  rules: {
    'react/prop-types': 'off',
    semi: ['error', 'always'],
    'no-unused-vars': 'off'
  }
};
