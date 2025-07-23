'use strict';

const tooltip = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(tooltip(), 'Hello from tooltip');
console.info('tooltip tests passed');
