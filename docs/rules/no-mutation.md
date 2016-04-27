# Force const declarations to be immutable (no-mutation)

Please describe the origin of the rule here.


## Rule Details

This rule aims to avoid mutations on variables that are declared with `const`.

The following patterns are considered warnings:


```js
const y = 1;
y = 2;
```

```js
const y = {a: { b: 'c' }};
y.a.b = 2;
```

```js
const y = {a: { b: 'c' }};
function foo() {
  if (true) {
    y.a.b = 2;
  }
}
```

```js
const obj = { a: '1', b: '2' };
const {a,b} = obj;
a += 1;
```

The following patterns are not warnings:

```js

const a = 1;
const b = a + 1;

```

## When Not To Use It

If you using `const` just for avoiding reassigning.

