'use strict';

const button = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(button(), 'Hello from button');
console.info('button tests passed');
