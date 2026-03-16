'use strict';

const badge = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(badge(), 'Hello from badge');
console.info('badge tests passed');
