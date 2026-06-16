'use strict';

const segmentedControl = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(segmentedControl(), 'Hello from segmentedControl');
console.info('segmentedControl tests passed');
