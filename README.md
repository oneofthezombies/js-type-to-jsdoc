# JavaScript Type Transpiler

## How to Use

### CLI

```sh
# transform type annotation to jsdoc
npx jst2doc --write index.js

# transform type annotation of single file to jsdoc and format using prettier
npx jst2doc index.js && npx prettier --stdin-filepath index.js

# transform type annotation of multiple files to jsdoc and format using prettier
# index.js, utils.js in src directory
# 1st approach
npx jst2doc src && npx prettier src

# 2nd approach to prevent files from being written multiple times
npx jst2doc src --on-transpiled "npx prettier --stdin-filepath {filepath}"
```

### VS Code Extension

```json
{
  "[javascript]": {
    "editor.defaultFormatter": "oneofthezombies.format-pipe",
    "editor.formatOnSave": true
  },
  "oneofthezombies.js-type-transpiler": {
    "args": [
      // ignored when --pipe argument is exists
      "--write",

      // using prettier formatter
      "--pipe",
      "npx prettier --stdin-filepath {filepath} --write",

      // using eslint formatter
      "--pipe",
      "npx eslint --stdin --stdin-filename {filepath} --fix",

      // using prettier and eslint formatter
      "--pipe",
      "npx prettier --stdin-filepath {filepath}",
      "--pipe",
      "npx eslint --stdin --stdin-filename {filepath} --fix"
    ]
  }
}
```

### API

TODO

#### Polyfill

TODO

## Reference

<https://github.com/tc39/proposal-type-annotations>

```

```
