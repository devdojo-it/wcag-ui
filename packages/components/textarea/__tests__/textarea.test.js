'use strict';

const textarea = require('..');
const assert = require('assert').strict;

assert.strictEqual(textarea(), 'Hello from textarea');
console.info('textarea tests passed');
