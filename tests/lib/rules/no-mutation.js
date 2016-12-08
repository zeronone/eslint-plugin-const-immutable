/**
 * @fileoverview Force const declarations to be immutable
 * @author Arif Rezai
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-mutation"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-mutation", rule, {

    valid2: [
        { code: 'const x = {foo: {baz: "bar"}}; () => { var x = {a: "foo"}; x.a = 34; }', parserOptions: { ecmaVersion: 6 }},
        { code: 'const x = {foo: {baz: "bar"}}; () => { var x = 1; x = 34; }', parserOptions: { ecmaVersion: 6 }},
        { code: '() => { const x = {foo: {baz: "bar"}}; () => { var x = {a: "foo"}; x.a = 34; }}', parserOptions: { ecmaVersion: 6 }},
        { code: '() => { const x = {foo: {baz: "bar"}}; () => { var x = 1; x = 34; } }', parserOptions: { ecmaVersion: 6 }},
        { code: 'var foo = {a:"a", b:"b"}; const {a,b} = foo; c = a + 1;', parserOptions: { ecmaVersion: 6 }},
        { code: 'var foo = {a:"a", b:"b"}; var {a,b} = foo; a = a + 1;', parserOptions: { ecmaVersion: 6 }},
        { code: 'var foo = {a:"a", b:"b"}; let {a,b} = foo; a = a + 1;', parserOptions: { ecmaVersion: 6 }},
        { code: 'const a = 1; const b = a + 1; const c = a + b + 1;', parserOptions: { ecmaVersion: 6 }},
    ],

    valid: [],
    invalid: [
        {
            code: 'const x = {foo: "a"}; delete x.foo;',
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "'x' is constant, modification is not allowed.", type: "Identifier"
                }
            ]
        },
        {
            code: 'const x = {foo: { bar: "a"}}; delete x.foo.bar;',
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: "'x' is constant, modification is not allowed.", type: "Identifier"
                }
            ]
        },
    ],

    invalid2: [
        { code: 'const x = {foo: {baz: "bar"}}; x.foo.baz = []; () => { var x = "foo"; x = 34; }',
            parserOptions: { ecmaVersion: 6 },
            errors: [{message: "'x' is constant, modification is not allowed.", type: "Identifier" }]
        },
        {
            code: 'const x = {foo: {baz: "bar"}}; () => { var y = "foo"; y = 34; x.foo.baz = []; }',
            parserOptions: { ecmaVersion: 6 },
            errors: [{message: "'x' is constant, modification is not allowed.", type: "Identifier" }]
        },
        {
            code: 'const y = {a: {b: "c"}}; y.a.b = 2;',
            parserOptions: { ecmaVersion: 6 },
            errors: [{message: "'y' is constant, modification is not allowed.", type: "Identifier" }]
        },
        {
            code: 'const y = {a: {b: "c"}}; function foo() { if (true) { y.a.b = 2; } }',
            parserOptions: { ecmaVersion: 6 },
            errors: [{message: "'y' is constant, modification is not allowed.", type: "Identifier" }]
        },
        {
            code: 'function a() { const x = {foo: {baz: "bar"}}; () => { var y = "foo"; y = 34; x.foo.baz = []; }}',
            parserOptions: { ecmaVersion: 6 },
            errors: [{message: "'x' is constant, modification is not allowed.", type: "Identifier" }]
        },
        {
            code: 'const y = 1; y = 2;',
            parserOptions: { ecmaVersion: 6 },
            errors: [{message: "'y' is constant, modification is not allowed.", type: "Identifier" }]
        },
        {
            code: 'var foo = {a:"a", b:"b"}; const {a,b} = foo; a = 1;',
            parserOptions: { ecmaVersion: 6 },
            errors: [{message: "'a' is constant, modification is not allowed.", type: "Identifier" }]
        },
        {
            code: 'const foo = {a:"a", b:"b"}; if (false) { foo.a += 3; }',
            parserOptions: { ecmaVersion: 6 },
            errors: [{message: "'foo' is constant, modification is not allowed.", type: "Identifier" }]
        },

    ]
});
