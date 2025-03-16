'use strict';

const toolbar = require('..');
const assert = require('assert').strict;

assert.strictEqual(toolbar(), 'Hello from toolbar');
console.info('toolbar tests passed');
