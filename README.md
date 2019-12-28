# astyle-wasm

Artistic Style (AStyle) compiled for Web Assembly

## Usage Example

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

## Building and Running Tests

You will need docker installed. To build:

```bash
npm run build:image
npm run build:copy
```

Then run the tests by executing:

```
npm test
```