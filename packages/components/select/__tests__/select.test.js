'use strict';

const select = require('..');
const assert = require('assert').strict;

assert.strictEqual(select(), 'Hello from select');
console.info('select tests passed');
