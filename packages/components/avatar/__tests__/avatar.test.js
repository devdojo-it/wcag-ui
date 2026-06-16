'use strict';

const avatar = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(avatar(), 'Hello from avatar');
console.info('avatar tests passed');
