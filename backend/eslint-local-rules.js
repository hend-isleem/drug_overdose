module.exports = {
  'custom-export-rule': {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'enforce specific use of exports and module.exports',
        category: 'Best Practices',
        recommended: false
      },
      schema: [],
      messages: {
        multipleModuleExports: 'Multiple `module.exports` assignments detected. Only one `module.exports =` should be used.',
        reassignExports: '`exports` should not be reassigned. Use `exports.something =` instead.'
      }
    },
    create(context) {
      let moduleExportsCount = 0
      return {
        AssignmentExpression(node) {
          if (
            node.left.type === 'MemberExpression' &&
            node.left.object.name === 'module' &&
            node.left.property.name === 'exports'
          ) {
            moduleExportsCount++

            if (moduleExportsCount > 1) {
              context.report({
                node,
                messageId: 'multipleModuleExports'
              })
            }
          } else if (node.left.type === 'Identifier' && node.left.name === 'exports') {
            context.report({
              node,
              messageId: 'reassignExports'
            })
          }
        }
      }
    }
  }
}
