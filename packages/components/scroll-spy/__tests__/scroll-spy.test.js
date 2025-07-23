'use strict';

const scrollSpy = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(scrollSpy(), 'Hello from scrollSpy');
console.info('scrollSpy tests passed');
