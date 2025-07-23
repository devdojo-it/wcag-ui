'use strict';

const dom = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(dom(), 'Hello from dom');
console.info('dom tests passed');
