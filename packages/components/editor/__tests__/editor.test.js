'use strict';

const editor = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(editor(), 'Hello from editor');
console.info('editor tests passed');
