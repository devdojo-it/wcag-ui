'use strict';

const componentName = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(componentName(), 'Hello from componentName');
console.info('componentName tests passed');
