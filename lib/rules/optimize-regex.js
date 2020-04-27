/**
 * @fileoverview Optimize regex literals
 * @author Ezinwa Okpoechi <brainmaestro@outlook.com>
 */

'use strict'

const { parse, generate, optimize } = require('regexp-tree')

const optimizerTransforms = require('regexp-tree/dist/optimizer/transforms/index.js')

const transforms = [...optimizerTransforms.keys()]

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Optimize regex literals',
      category: 'Possible Improvements',
      recommended: true,
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        type: 'object',
        properties: {
          whitelist: {
            type: 'array',
            items: {
              type: 'string',
              enum: transforms
            }
          },
          blacklist: {
            type: 'array',
            items: {
              type: 'string',
              enum: transforms
            }
          }
        }
      }
    ],
  },

  create (context) {
    const options = context.options[0] || {}

    /**
     * Optimize regular expression literals
     *
     * @param {ASTNode} node node to validate
     * @returns {void}
     * @private
     */

    function optimizeRegexLiteral(node) {
      const { raw /* , start */ } = node

      let parsedSource
      try {
        parsedSource = parse(raw)
      } catch (e) {
        // istanbul ignore next
        context.report({
          node,
          message: "{{original}} can't be parsed: {{message}}",
          data: {
            original: raw,
            message: e.message,
          },
        })

        // istanbul ignore next
        return
      }

      const originalRegex = generate(parsedSource).toString()
      const optimizedRegex = optimize(
        raw,
        options.whitelist,
        {
          blacklist: options.blacklist
        }
      ).toString()

      if (originalRegex === optimizedRegex) {
        return
      }

      context.report({
        node,
        message: '{{original}} can be optimized to {{optimized}}',
        data: {
          original: raw,
          optimized: optimizedRegex,
        },
        fix(fixer) {
          return fixer.replaceText(node, optimizedRegex)
        },
      })
    }

    return {
      'Literal[regex]': optimizeRegexLiteral,
    }
  },
}
