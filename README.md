# eslint-plugin-optimize-regex
[![npm](https://img.shields.io/npm/v/eslint-plugin-optimize-regex.svg)](https://www.npmjs.com/package/eslint-plugin-optimize-regex)
[![npm](https://img.shields.io/npm/dt/eslint-plugin-optimize-regex.svg)](https://www.npmjs.com/package/eslint-plugin-optimize-regex)

> Optimize regex literals

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
npm i eslint --save-dev
```

Next, install `eslint-plugin-optimize-regex`:

```
npm install eslint-plugin-optimize-regex --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-optimize-regex` globally.

## Usage

Add `optimize-regex` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "optimize-regex"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "optimize-regex/optimize-regex": "warn"
    }
}
```

## Rules

* [optimize-regex](./docs/rules/optimize-regex.md)

## Inspiration

* [regexp-tree](https://github.com/DmitrySoshnikov/regexp-tree)

## License

MIT © Ezinwa Okpoechi
