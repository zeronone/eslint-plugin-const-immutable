/**
 * @fileoverview Force const declarations to be immutable
 * @author Arif Rezai
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    // variables should be defined here

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    // The `getVariableByName` is taken from eslint/lib/ast-utils.js
    function getVariableByName(initScope, name) {
        var scope = initScope;

        while (scope) {
            var variable = scope.set.get(name);

            if (variable) {
                return variable;
            }

            scope = scope.upper;
        }

        return null;
    }


    // Helper function to check if the given variable is declared as const in 
    // the given scope
    function checkVariable(scope, variable) {
        while (variable.type === "MemberExpression") {
            variable = variable.object;
        }

        var variableInScope = getVariableByName(scope, variable.name);

        if (variableInScope) {

            var definitions = variableInScope.defs;
            var constDefinitions = definitions.filter(def => def.kind === "const");

            if (constDefinitions.length > 0) {
                context.report(
                        variable,
                        "'{{name}}' is constant, modification is not allowed.",
                        { name: variable.name }
                );
            }
        }
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "AssignmentExpression": function(node) {
            if (node.left.type === "MemberExpression") {
                checkVariable(context.getScope(), node.left.object);
            } else {
                checkVariable(context.getScope(), node.left);
            }
        }
    };

};

module.exports.schema = [
    // fill in your schema
];