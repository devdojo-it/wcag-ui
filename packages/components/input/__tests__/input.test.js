'use strict';

const input = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(input(), 'Hello from input');
console.info('input tests passed');
