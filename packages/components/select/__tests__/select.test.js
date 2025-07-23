'use strict';

const select = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(select(), 'Hello from select');
console.info('select tests passed');
