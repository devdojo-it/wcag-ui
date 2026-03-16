'use strict';

const tag = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(tag(), 'Hello from tag');
console.info('tag tests passed');
