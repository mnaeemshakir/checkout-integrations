const path = require('path');

module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:jest/recommended', 'jest-enzyme'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.scss', '.json', '.svg', '.png'],
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  plugins: ['babel', 'import', 'jsx-a11y', 'react', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    PLATFORM: true,
    WEB_APP_VERSION: true,
    API_URL: true,
    _: false,
  },
  rules: {
    'linebreak-style': 'off',
    'arrow-parens': 'off',
    'object-curly-newline': 'off',
    'no-mixed-operators': 'off',
    'arrow-body-style': 'off',
    'function-paren-newline': 'off',
    'no-plusplus': 'off',
    'space-before-function-paren': 0,
    'operator-linebreak': 'off',
    'max-len': ['error', 120, 2, { ignoreUrls: true }],
    'no-console': 'error',
    'no-alert': 'error',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    "import/prefer-default-export": "off",
    "max-len": "off",
    "implicit-arrow-linebreak": "off",
    "no-use-before-define": "off",
    camelcase: 'off',
    radix: 'off',
    "eqeqeq": "off",

    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'prefer-destructuring': 'off',
    'import/no-cycle': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/extensions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': ['error', { components: ['Link'], specialLink: ['to'] }],
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          every: ['id'],
        },
      },
    ],
    'prettier/prettier': ['error'],
  },
};
