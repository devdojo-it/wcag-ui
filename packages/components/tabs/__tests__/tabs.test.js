'use strict';

const tabs = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(tabs(), 'Hello from tabs');
console.info('tabs tests passed');
