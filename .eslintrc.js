'use strict'
module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended'
  ],
  rules: {
    semi: [2, 'never'],
    quotes: [2, 'single', {
      avoidEscape: true
    }],
    'prefer-const': [2],
    'no-var': [2],
    'prefer-destructuring': [2],
    'object-shorthand': [2]
  }
}
