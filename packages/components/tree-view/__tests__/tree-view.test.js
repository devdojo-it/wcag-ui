'use strict';

const treeView = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(treeView(), 'Hello from treeView');
console.info('treeView tests passed');
