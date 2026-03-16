'use strict';

const pagination = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(pagination(), 'Hello from pagination');
console.info('pagination tests passed');
