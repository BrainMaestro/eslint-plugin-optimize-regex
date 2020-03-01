/**
 * @fileoverview Optimize regex literals
 * @author Ezinwa Okpoechi <brainmaestro@outlook.com>
 */

'use strict'

module.exports = {
  rules: {
    'optimize-regex': require('./rules/optimize-regex'),
  },

  configs: {
    recommended: {
      plugins: ['optimize-regex'],
      rules: {
        'optimize-regex/optimize-regex': ['warn', {
          'blacklist': ['charClassClassrangesMerge']
        }]
      }
    },
    all: {
      plugins: ['optimize-regex'],
      rules: {
        'optimize-regex/optimize-regex': ['warn']
      }
    }
  }
}
