/**
 * @fileoverview Optimize regex literals
 * @author Ezinwa Okpoechi
 */

'use strict';

const { optimize } = require('regexp-tree');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Optimize regex literals',
      category: 'Fill me in',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },

  create: function(context) {
    const sourceCode = context.getSourceCode();

    /**
     * Validate regular expression literals
     * @param {ASTNode} node node to validate
     * @returns {void}
     * @private
     */

    function checkLiteral(node) {
      const { type, value, start } = sourceCode.getFirstToken(node);

      if (type !== 'RegularExpression') {
        return;
      }

      const optimizedRegex = optimize(value).toRegExp();

      if (value === optimizedRegex.toString()) {
        return;
      }

      context.report({
        node,
        message: '{{original}} can be optimized to {{optimized}}',
        data: {
          original: value,
          optimized: optimizedRegex,
        },
        fix(fixer) {
          return fixer.replaceText(node, optimizedRegex.toString());
        },
      });
    }

    return {
      Literal: checkLiteral,
    };
  },
};
