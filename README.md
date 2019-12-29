# astyle-wasm

Artistic Style (AStyle) compiled for Web Assembly

[![Build Status](https://github.com/wokwi/astyle-wasm/workflows/Node%20CI/badge.svg)](https://github.com/wokwi/astyle-wasm/actions)

## Installation

To install the package, run the following command:

```
npm install --save astyle
```

For yarn users:

```
yarn add astyle
```

## Usage example

```javascript
const { format } = require('astyle');

format('void foo(){\nbar();}').then(result => {
  console.log(result);
});

// Output:
// void foo() {
//     bar();
// }
```

You can also pass AStyle options as a second argument for `format()`. For instance, you can
change the indentation to tabs by specifying `'indent=tab'`. The full list of options
can be found in [the AStyle docs](http://astyle.sourceforge.net/astyle.html#_Brace_Style_Options).

Note: The package is currently supported only on Node.js. A web version may be available in the future.

## Building the project and running the tests

You will need docker installed. To build:

```bash
npm run build:image
npm run build:copy
```

Then run the tests by executing:

```
npm test
```