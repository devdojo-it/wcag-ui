'use strict';

const radio = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(radio(), 'Hello from radio');
console.info('radio tests passed');
