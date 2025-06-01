#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function collectPackageJson(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(e => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return collectPackageJson(full);
    return e.name === 'package.json' ? [full] : [];
  });
}

const packageJsonPaths = collectPackageJson(path.join(root, 'packages'));

for (const file of packageJsonPaths) {
  const { name, version } = JSON.parse(fs.readFileSync(file, 'utf8'));
  try {
    console.log(`\u23F4  Unpublish ${name}@${version}`);
    execSync(`npm unpublish ${name}@${version} --force`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`⚠️  Impossibile unpublish ${name}@${version}:`, err.message);
  }
}

// (Opzionale) elimina il tag git associato:
// const tag = `v${JSON.parse(fs.readFileSync(packageJsonPaths[0], 'utf8')).version}`;
// execSync(`git tag -d ${tag}`);
// execSync(`git push origin :refs/tags/${tag}`);
