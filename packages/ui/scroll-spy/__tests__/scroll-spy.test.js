'use strict';

const scrollSpy = require('..');
const assert = require('assert').strict;

assert.strictEqual(scrollSpy(), 'Hello from scrollSpy');
console.info('scrollSpy tests passed');
