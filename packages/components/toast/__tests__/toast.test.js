'use strict';

const toast = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(toast(), 'Hello from toast');
console.info('toast tests passed');
