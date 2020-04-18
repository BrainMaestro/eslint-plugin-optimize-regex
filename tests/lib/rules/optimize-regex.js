/**
 * @fileoverview Optimize regex literals
 * @author Ezinwa Okpoechi <brainmaestro@outlook.com>
 */

'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/optimize-regex'),
  {RuleTester} = require('eslint')

const ruleTester = new RuleTester()
ruleTester.run('optimize-regex', rule, {
  valid: [
    'var foo = 5',
    'var foo = /baz/i',
    'var foo = /bar/mig',
    'var foo = /\\/\\./',
    'var foo = /[/\\\\]$/',
    {
      code: 'var re = /[0-9]/',
      options: [{
        blacklist: [
          'charClassToMeta',       // [0-9] -> [\d]
          'charClassToSingleChar', // [\d] -> \d
        ]
      }]
    },
    {
      code: 'var re = /[0-9]/',
      options: [{
        whitelist: [
          'charCodeToSimpleChar' // Not relevant
        ]
      }]
    },
  ],

  invalid: [
    {
      code: 'var re = /[a-zA-Z_0-9][A-Z_\\da-z]*\\e{1,}/',
      output: 'var re = /\\w+e+/',
      errors: [
        {
          message:
            '/[a-zA-Z_0-9][A-Z_\\da-z]*\\e{1,}/ can be optimized to /\\w+e+/',
          type: 'Literal',
        },
      ],
    },
    {
      code: 'var re = /foooooo/',
      output: 'var re = /fo{6}/',
      errors: [
        {
          message: '/foooooo/ can be optimized to /fo{6}/',
          type: 'Literal',
        },
      ],
    },
    {
      code: 'var re = /[0-9]/',
      output: 'var re = /\\d/',
      errors: [
        {
          message: '/[0-9]/ can be optimized to /\\d/',
          type: 'Literal',
        }
      ],
      options: [{
        whitelist: [
          'charClassToMeta',       // [0-9] -> [\d]
          'charClassToSingleChar', // [\d] -> \d
        ]
      }]
    },
    {
      code: 'var re = /[0-9]/',
      output: 'var re = /[\\d]/',
      errors: [
        {
          message: '/[0-9]/ can be optimized to /[\\d]/',
          type: 'Literal',
        }
      ],
      options: [{
        blacklist: [
          'charClassToSingleChar', // [\d] -> \d
        ]
      }]
    },
    {
      code: 'var re = /[0-9]/',
      output: 'var re = /[\\d]/',
      errors: [
        {
          message: '/[0-9]/ can be optimized to /[\\d]/',
          type: 'Literal',
        }
      ],
      options: [{
        blacklist: [
          'charClassToSingleChar', // [\d] -> \d
        ]
      }]
    },
  ],
})
