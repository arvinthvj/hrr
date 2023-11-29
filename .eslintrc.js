module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
  ],
  // parser:"babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/display-name': 'off',

    'no-unused-vars': 0, // 0 = off, 1 = warn, 2 = error
    'no-undef': 0, // 0 = off, 1 = warn, 2 = error
    'react/prop-types': 0, // 0 = off, 1 = warn, 2 = error
    'no-redeclare': 0, // 0 = off, 1 = warn, 2 = error
    'no-fallthrough': 0, // 0 = off, 1 = warn, 2 = error
    'react/no-unknown-property': 0, // 0 = off, 1 = warn, 2 = error
    'no-dupe-keys': 0, // 0 = off, 1 = warn, 2 = error
    'no-empty': 0, // 0 = off, 1 = warn, 2 = error
    'no-useless-escape': 0, // 0 = off, 1 = warn, 2 = error
    'no-mixed-spaces-and-tabs': 0, // 0 = off, 1 = warn, 2 = error
    'no-empty-pattern': 0, // 0 = off, 1 = warn, 2 = error
    'no-irregular-whitespace': 0, // 0 = off, 1 = warn, 2 = error
    'react/jsx-no-duplicate-props': 0, // 0 = off, 1 = warn, 2 = error
    'no-unsafe-optional-chaining': 0, // 0 = off, 1 = warn, 2 = error

    // '@typescript-eslint/no-unused-vars': ['error'],
    // '@typescript-eslint/no-var-requires': 'off',
    // 'react/prop-types': 'off',
    // 'react/react-in-jsx-scope': 'off',
    // "jsx-a11y/label-has-for":"off",
    // "react-hooks/exhaustive-deps": 0,
    // "@typescript-eslint/no-explicit-any": ["off"],
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'dot-notation': 0, // 0 = off, 1 = warn, 2 = error
    parser: 0, // 0 = off, 1 = warn, 2 = error
    'no-cond-assign': 0, // 0 = off, 1 = warn, 2 = error
    'no-control-regex': 0, // 0 = off, 1 = warn, 2 = error
    'no-unreachable': 0, // 0 = off, 1 = warn, 2 = error

    'getter-return': 0, // 0 = off, 1 = warn, 2 = error
    'no-unsafe-finally': 0, // 0 = off, 1 = warn, 2 = error
    'no-func-assign': 0, // 0 = off, 1 = warn, 2 = error
    'compat/compat': 0, // 0 = off, 1 = warn, 2 = error
    'getter-return': 0, // 0 = off, 1 = warn, 2 = error
    'no-inner-declarations': 0, // 0 = off, 1 = warn, 2 = error
    'no-prototype-builtins': 0, // 0 = off, 1 = warn, 2 = error

    // 'import/no-unused-modules': 0, // 0, // 0 = off, 1 = warn, 2 = error

    'no-self-assign': 0, // 0 = off, 1 = warn, 2 = error
    // "@typescript-eslint/no-use-before-define": 2
    // 'no-prototype-builtins': 0, // 0 = off, 1 = warn, 2 = error

    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-explicit-any': 0,
  },
};
