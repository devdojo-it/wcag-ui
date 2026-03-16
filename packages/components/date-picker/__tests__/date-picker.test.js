'use strict';

const datePicker = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(datePicker(), 'Hello from datePicker');
console.info('datePicker tests passed');
