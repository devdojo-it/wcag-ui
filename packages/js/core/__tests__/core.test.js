'use strict';

const core = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(core(), 'Hello from core');
console.info('core tests passed');
