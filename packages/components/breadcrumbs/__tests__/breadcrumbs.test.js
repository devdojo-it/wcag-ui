'use strict';

const breadcrumbs = require('..');
const assert = require('node:assert').strict;

assert.strictEqual(breadcrumbs(), 'Hello from breadcrumbs');
console.info('breadcrumbs tests passed');
