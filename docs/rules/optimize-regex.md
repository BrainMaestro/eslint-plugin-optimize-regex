# Optimize regex literals (optimize-regex)

This rule enforces an idiomatic and sometimes clearer usage of regexes.


## Rule Details

Examples of **incorrect** code for this rule:

```js

const re = /[a-zA-Z_0-9][A-Z_\da-z]*\e{1,}/

```

Examples of **correct** code for this rule:

```js

const re = /\w+e+/

```

The two regexes have the exact same functionality.
