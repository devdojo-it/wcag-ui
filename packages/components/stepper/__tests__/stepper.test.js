'use strict';

const stepper = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(stepper(), 'Hello from stepper');
console.info('stepper tests passed');
