'use strict';

const checkbox = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(checkbox(), 'Hello from checkbox');
console.info('checkbox tests passed');
