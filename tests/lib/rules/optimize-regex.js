/**
 * @fileoverview Optimize regex literals
 * @author Ezinwa Okpoechi <brainmaestro@outlook.com>
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/optimize-regex'),
  RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('optimize-regex', rule, {
  valid: [
    'var foo = /foo/i',
    'var foo = /foo/mig',
    'var foo = /\\//',
  ],

  invalid: [
    {
      code: 'var re = /[a-zA-Z_0-9][A-Z_\\da-z]*\\e{1,}/',
      output: 'var re = /\\w+e+/',
      errors: [
        {
          message: '/[a-zA-Z_0-9][A-Z_\\da-z]*\\e{1,}/ can be optimized to /\\w+e+/',
          type: 'Literal',
        },
      ],
    },
  ],
});
