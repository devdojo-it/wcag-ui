'use strict';

const details = require('../lib/details');
const assert = require('node:assert').strict;

assert.strictEqual(details(), 'Hello from details');
console.info('details tests passed');
