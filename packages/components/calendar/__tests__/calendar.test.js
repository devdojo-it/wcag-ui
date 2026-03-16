'use strict';

const calendar = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(calendar(), 'Hello from calendar');
console.info('calendar tests passed');
