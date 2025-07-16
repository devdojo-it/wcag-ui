'use strict';

const sw = require('..');
const assert = require('assert').strict;

assert.strictEqual(sw(), 'Hello from switch');
console.info('switch tests passed');
