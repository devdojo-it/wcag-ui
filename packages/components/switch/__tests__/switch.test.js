'use strict';

const sw = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(sw(), 'Hello from switch');
console.info('switch tests passed');
