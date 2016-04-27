# eslint-plugin-const-immutable

Force const declarations to be immutable

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-const-immutable`:

```
$ npm install eslint-plugin-const-immutable --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-const-immutable` globally.

## Usage

Add `const-immutable` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "const-immutable"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "const-immutable/no-mutation": 2
    }
}
```

## Supported Rules

* Fill in provided rules here

### no-mutation

This rule forces the variables declared with `const` to remain immutable. The following code are considered problematic.

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

### Sample Configuration File
```
{
  "extends": "airbnb",
    "plugins": [
      "const-immutable"
    ],
    "rules": {
      "const-immutable/no-mutation": 2
    }
}
```


