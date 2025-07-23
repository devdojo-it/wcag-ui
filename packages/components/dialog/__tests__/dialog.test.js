'use strict';

const dialog = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(dialog(), 'Hello from dialog');
console.info('dialog tests passed');
