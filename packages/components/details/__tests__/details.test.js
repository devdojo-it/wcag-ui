'use strict';

const details = require('../lib/details');
const assert = require('assert').strict;

assert.strictEqual(details(), 'Hello from details');
console.info('details tests passed');
