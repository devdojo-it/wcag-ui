'use strict';

const list = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(list(), 'Hello from list');
console.info('list tests passed');
