'use strict';

const accordion = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(accordion(), 'Hello from accordion');
console.info('accordion tests passed');
