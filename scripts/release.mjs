#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import { buildPackageIfNeeded, collectPackageJson, resetToWorkspaceRanges, sortPackageJsonByWeights, updatePackageForRelease, updateRootPackageForRelease } from './_package-utils.mjs';

/**
 * Release script for wcag-ui monorepo. Handles version bump, package updates, changelog, and git operations.
 *
 * Usage: node scripts/release.mjs
 */

const root = process.cwd();

/**
 * Collect all package.json files from the packages directory.
 * @type {string[]}
 */
const packageJsonPaths = collectPackageJson(path.join(root, 'packages'));

/**
 * Get all local package names from package.json files.
 * @type {string[]}
 */
const localPackages = packageJsonPaths.map((p) => JSON.parse(fs.readFileSync(p, 'utf8')).name);

/**
 * Get the last tag or first commit from git history.
 * @type {string}
 */
let lastTagOrCommit;
try {
  lastTagOrCommit = execSync('git describe --tags --abbrev=0').toString().trim();
} catch {
  lastTagOrCommit = execSync("git log --format='%H' | tail -1").toString().trim();
}

/**
 * Collect all commit messages since lastTagOrCommit up to HEAD.
 * @type {string[]}
 */
const commitsLogCommand = `git log ${lastTagOrCommit ? `${lastTagOrCommit}..HEAD` : ''} --pretty=%s`;
const commits = execSync(commitsLogCommand).toString().split('\n').filter(Boolean);

/**
 * Determine the next semver bump type (major, minor, patch) based on commit messages.
 * @type {'major'|'minor'|'patch'}
 */
const bump = commits.some((c) => /BREAKING CHANGE/.test(c))
  ? 'major'
  : commits.some((c) => c.startsWith('feat'))
    ? 'minor'
    : 'patch';

/**
 * Regex to check if lastTagOrCommit is a semver tag.
 * @type {RegExp}
 */
const isSemverRegex =
  /^(v)?([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/g;

/**
 * Last semver tag or '0.0.0' if not found.
 * @type {string}
 */
const lastTag = lastTagOrCommit.match(isSemverRegex) ? lastTagOrCommit.substring(1) : '0.0.0';
console.log('detected lastTag', lastTag);

/**
 * Next version string based on bump type.
 * @type {string}
 */
const [major, minor, patch] = lastTag.split('.').map(Number);
const next =
  bump === 'major'
    ? `${major + 1}.0.0`
    : bump === 'minor'
      ? `${major}.${minor + 1}.0`
      : `${major}.${minor}.${patch + 1}`;
console.log(`Bumping version from ${lastTag} to ${next} (${bump})`);

/**
 * Sort package.json files by type: css, js, components.
 * @type {Array<{ type: string, path: string }>}
 */
const packageJsonPathsRemap = sortPackageJsonByWeights(packageJsonPaths);

/**
 * Update each package.json file with the new version and update local dependencies.
 * Also runs build scripts if present.
 */
for (const packageJson of packageJsonPathsRemap) {
  await updatePackageForRelease(packageJson.path, next, localPackages);
  buildPackageIfNeeded(packageJson.path);
}

/**
 * Update root package.json with new version and local dependencies, then run build script if present.
 */
await updateRootPackageForRelease(path.join(root, 'package.json'), next, localPackages, true, root);

/**
 * Publish all packages in the monorepo to the configured registry (default: npm).
 */
for (const packageJson of packageJsonPathsRemap) {
  if (path.dirname(packageJson.path).includes('packages')) {
    execSync(`pnpm --prefix=${path.dirname(packageJson.path)} publish:package`, { stdio: 'inherit' });
  }
}

/**
 * Update the changelog file from lastTagOrCommit to HEAD.
 */
execSync(`changelog -t ${lastTagOrCommit}..HEAD -x rel,build,chore`, { stdio: 'inherit' });

/**
 * Commit and push all updated files as a release commit.
 */
execSync('git add .', { stdio: 'inherit' });
execSync(`git commit -m "chore(release): v${next}"`, { stdio: 'inherit' });
execSync('git push', { stdio: 'inherit' });

/**
 * Generate and push the new semver tag for this release.
 */
execSync(`git tag v${next}`);
execSync('git push --tags', { stdio: 'inherit' });

/**
 * Reset internal dependencies to use workspace:^ prefix for pnpm compatibility.
 */
for (const packageJson of packageJsonPathsRemap) {
  await resetToWorkspaceRanges(packageJson.path, next, localPackages);
}

const rootPkgPath = path.join(root, 'package.json');
await resetToWorkspaceRanges(rootPkgPath, next, localPackages);

execSync('git add .', { stdio: 'inherit' });

// Amend the previous release commit to include workspace range resets
execSync(`git commit --amend --no-edit`, { stdio: 'inherit' });
execSync('git push -f', { stdio: 'inherit' });
