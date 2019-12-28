/**
 * Artistic Style (AStyle) JavaScript Wrapper
 *
 * Copyright (C) 2019, 2020, Uri Shaked
 */

const libastyle = require('./dist/libastyle.js');

const AStyleMain = libastyle.cwrap('AStyleMain', 'string', [
  'string',
  'string',
  'number',
  'number'
]);

let mallocList = [];
const malloc = libastyle.addFunction((numBytes) => {
  const result = libastyle._malloc(numBytes);
  mallocList.push(result);
  return result;
}, 'ii');

// This has to be a global function since emscripten doesn't support removeFunction()
// with WASM, and we have a limited number of entries in the callback table, so we
// can't create a new function for every function call
let activeOutputCallback = null;
const outputHandler = libastyle.addFunction((code, msg) => {
  if (activeOutputCallback) {
    activeOutputCallback(code, libastyle.UTF8ToString(msg));
  }
}, 'vii');

let libReadyCallback;

const ready = new Promise((resolve) => {
  libReadyCallback = resolve;
});

async function format(code, options = '', outputCallback) {
  await ready;
  activeOutputCallback = outputCallback;
  try {
    return AStyleMain(code, options, outputHandler, malloc);
  } finally {
    activeOutputCallback = null;
    // Free all memory allocation by AStyle
    for (const item of mallocList) {
      libastyle._free(item);
    }
    mallocList = [];
  }
}

module.exports = {
  format,
  ready
};

libastyle.onRuntimeInitialized = libReadyCallback;
