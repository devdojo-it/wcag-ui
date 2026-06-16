'use strict';

const popover = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(popover(), 'Hello from popover');
console.info('popover tests passed');
