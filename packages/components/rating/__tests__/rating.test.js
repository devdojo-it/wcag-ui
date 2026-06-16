'use strict';

const rating = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(rating(), 'Hello from rating');
console.info('rating tests passed');
