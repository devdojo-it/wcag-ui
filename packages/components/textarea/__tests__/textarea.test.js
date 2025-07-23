'use strict';

const textarea = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(textarea(), 'Hello from textarea');
console.info('textarea tests passed');
