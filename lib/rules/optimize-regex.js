/**
 * @fileoverview Optimize regex literals
 * @author Ezinwa Okpoechi <brainmaestro@outlook.com>
 */

'use strict'

const { parse, generate, optimize } = require('regexp-tree')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Optimize regex literals',
      category: 'Possible Improvements',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },

  create: function(context) {
    const sourceCode = context.getSourceCode()

    /**
     * Optimize regular expression literals
     *
     * @param {ASTNode} node node to validate
     * @returns {void}
     * @private
     */

    function optimizeRegexLiteral(node) {
      const { type, value, start } = sourceCode.getFirstToken(node)

      if (type !== 'RegularExpression') {
        return
      }

      let parsedSource
      try {
        parsedSource = parse(value)
      } catch (e) {
        context.report({
          node,
          message: "{{original}} can't be parsed: {{message}}",
          data: {
            original: value,
            message: e.message,
          },
        })

        return
      }

      const originalRegex = generate(parsedSource).toString()
      const optimizedRegex = optimize(value).toString()

      if (originalRegex === optimizedRegex) {
        return
      }

      context.report({
        node,
        message: '{{original}} can be optimized to {{optimized}}',
        data: {
          original: value,
          optimized: optimizedRegex,
        },
        fix(fixer) {
          return fixer.replaceText(node, optimizedRegex)
        },
      })
    }

    return {
      Literal: optimizeRegexLiteral,
    }
  },
}
