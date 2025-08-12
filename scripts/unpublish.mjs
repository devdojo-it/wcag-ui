#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { collectPackageJson } from './_package-utils.mjs';

const root = process.cwd();

/**
 * Unpublishes all local packages found in the packages directory.
 * Uses npm unpublish with --force for each package and logs the result.
 *
 * @example <caption>Unpublish all local packages</caption>
 * // Run this script from the project root
 */
const packageJsonPaths = collectPackageJson(path.join(root, 'packages'));

for (const file of packageJsonPaths) {
  const { name, version } = JSON.parse(fs.readFileSync(file, 'utf8'));
  try {
    console.log(`\u23F4  Unpublish ${name}@${version}`);
    execSync(`npm unpublish ${name}@${version} --force`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`⚠️  Impossible to unpublish ${name}@${version}:`, err.message);
  }
}

// Optionally, remove associated git tag for the version just unpublished:
// const tag = `v${JSON.parse(fs.readFileSync(packageJsonPaths[0], 'utf8')).version}`;
// execSync(`git tag -d ${tag}`);
// execSync(`git push origin :refs/tags/${tag}`);
