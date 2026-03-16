'use strict';

const progressBar = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(progressBar(), 'Hello from progressBar');
console.info('progressBar tests passed');
