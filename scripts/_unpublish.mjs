#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { collectPackageJson } from './_utils.mjs';

const root = process.cwd();

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

// Remove associated git tag:
// const tag = `v${JSON.parse(fs.readFileSync(packageJsonPaths[0], 'utf8')).version}`;
// execSync(`git tag -d ${tag}`);
// execSync(`git push origin :refs/tags/${tag}`);
