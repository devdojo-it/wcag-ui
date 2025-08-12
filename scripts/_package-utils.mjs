/**
 * Package.json manipulation utilities for CLI scripts.
 *
 * This module centralizes all operations related to reading, modifying, and writing
 * package.json files across the monorepo, including dependency management,
 * version updates, and workspace range handling.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import { readJson, sortObjectKeys, writeJson } from './_fs-utils.mjs';

/**
 * Normalizes any pnpm "workspace:" range to workspace:^<rootVersion> for consistency.
 * If the provided range is not a workspace range, the original value is returned.
 *
 * @example <caption>Normalize workspace ranges</caption>
 * const normalized = normalizeWorkspaceRange('workspace:*', '1.2.3');
 * // Returns: 'workspace:^1.2.3'
 *
 * @param {string} range - Original dependency range (e.g., "workspace:^1.2.3", "^1.2.3").
 * @param {string} rootVersion - Root version to enforce when range uses the workspace protocol.
 * @returns {string} The updated (or original) range string.
 */
export function normalizeWorkspaceRange(range, rootVersion) {
  if (typeof range !== 'string') {
    return range;
  }

  if (range.startsWith('workspace:^') || range === 'workspace:*' || range.startsWith('workspace:')) {
    return `workspace:^${rootVersion}`;
  }

  return range;
}

/**
 * Updates a package.json file's version and aligns any workspace dependencies
 * to the specified version. Handles all dependency types: dependencies,
 * devDependencies, peerDependencies, optionalDependencies.
 *
 * @example <caption>Update package version and workspace deps</caption>
 * await updatePackageVersionAndWorkspaceDeps('./packages/components/button/package.json', '1.2.3');
 *
 * @param {string} packagePath - Absolute path to the package.json file.
 * @param {string} version - Version to set on the package.json.
 * @param {boolean} [dryRun=false] - If true, do not write changes to disk.
 * @returns {Promise<Record<string, any>>} The updated package.json object.
 */
export async function updatePackageVersionAndWorkspaceDeps(packagePath, version, dryRun = false) {
  const pkg = await readJson(packagePath);
  pkg.version = version;

  const dependencyFields = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];

  for (const field of dependencyFields) {
    if (!pkg[field]) {
      continue;
    }

    for (const depName of Object.keys(pkg[field])) {
      pkg[field][depName] = normalizeWorkspaceRange(pkg[field][depName], version);
    }
  }

  await writeJson(packagePath, pkg, dryRun);
  return pkg;
}

/**
 * Updates a package.json file's version and sets local dependencies to a specific range.
 * Used during release process to set exact versions before publishing.
 *
 * @example <caption>Update package for release</caption>
 * await updatePackageForRelease('./packages/button/package.json', '1.2.3', ['@wcag-ui/core']);
 *
 * @param {string} packagePath - Absolute path to the package.json file.
 * @param {string} version - Version to set on the package.json.
 * @param {string[]} localPackages - Array of local package names to update.
 * @param {string} [rangePrefix='^'] - Range prefix to use for local dependencies.
 * @returns {Promise<Record<string, any>>} The updated package.json object.
 */
export async function updatePackageForRelease(packagePath, version, localPackages, rangePrefix = '^') {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  pkg.version = version;

  const dependencyFields = ['dependencies', 'peerDependencies', 'devDependencies'];

  for (const field of dependencyFields) {
    if (!pkg[field]) {
      continue;
    }

    for (const dep in pkg[field]) {
      if (localPackages.includes(dep)) {
        pkg[field][dep] = `${rangePrefix}${version}`;
      }
    }
  }

  fs.writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
  return pkg;
}

/**
 * Adds or updates a dependency in a package.json file with a workspace range.
 * Automatically sorts dependencies alphabetically after modification.
 *
 * @example <caption>Add workspace dependency to root</caption>
 * const result = await addWorkspaceDependency('./package.json', '@wcag-ui/button', '1.2.3');
 *
 * @param {string} packagePath - Absolute path to the package.json file.
 * @param {string} dependencyName - Full package name to add (e.g., "@wcag-ui/button").
 * @param {string} version - Version to use in the workspace range.
 * @param {boolean} [dryRun=false] - If true, do not write changes to disk.
 * @returns {Promise<{changed: boolean, message: string}>} Result indicating if changes were made.
 */
export async function addWorkspaceDependency(packagePath, dependencyName, version, dryRun = false) {
  const pkg = await readJson(packagePath);

  if (!pkg.dependencies) {
    pkg.dependencies = {};
  }

  const desired = `workspace:^${version}`;
  const existing = pkg.dependencies[dependencyName] ?? pkg.devDependencies?.[dependencyName];

  // Set/overwrite the dependency
  pkg.dependencies[dependencyName] = desired;

  // Sort dependencies alphabetically
  pkg.dependencies = sortObjectKeys(pkg.dependencies);

  if (pkg.devDependencies) {
    pkg.devDependencies = sortObjectKeys(pkg.devDependencies);
  }

  await writeJson(packagePath, pkg, dryRun);

  if (existing === desired) {
    return {
      changed: false,
      message: 'dependency already set',
    };
  }

  return {
    changed: true,
    message: existing ? 'dependency updated' : 'dependency added',
  };
}

/**
 * Updates the root package.json with new version and local dependencies,
 * then optionally runs the build script if present.
 *
 * @example <caption>Update root package for release</caption>
 * await updateRootPackageForRelease('./package.json', '1.2.3', ['@wcag-ui/button'], true);
 *
 * @param {string} rootPackagePath - Absolute path to the root package.json.
 * @param {string} version - Version to set on the root package.json.
 * @param {string[]} localPackages - Array of local package names to add as dependencies.
 * @param {boolean} [runBuild=false] - If true, runs the build script if present.
 * @param {string} [workingDir=process.cwd()] - Working directory for build command.
 * @returns {Promise<Record<string, any>>} The updated package.json object.
 */
export async function updateRootPackageForRelease(
  rootPackagePath,
  version,
  localPackages,
  runBuild = false,
  workingDir = process.cwd(),
) {
  if (!fs.existsSync(rootPackagePath)) {
    throw new Error(`Root package.json not found at ${rootPackagePath}`);
  }

  const rootPkg = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));
  rootPkg.version = version;

  localPackages.forEach((name) => {
    rootPkg.dependencies ??= {};
    rootPkg.dependencies[name] = `^${version}`;
  });

  fs.writeFileSync(rootPackagePath, `${JSON.stringify(rootPkg, null, 2)}\n`);

  if (runBuild && rootPkg.scripts && Object.keys(rootPkg.scripts).includes('build')) {
    execSync(`pnpm build`, { stdio: 'inherit', cwd: workingDir });
  }

  return rootPkg;
}

/**
 * Resets all local dependencies in a package.json to use workspace ranges.
 * Used after publishing to restore pnpm workspace compatibility.
 *
 * @example <caption>Reset to workspace ranges</caption>
 * await resetToWorkspaceRanges('./packages/button/package.json', '1.2.3', ['@wcag-ui/core']);
 *
 * @param {string} packagePath - Absolute path to the package.json file.
 * @param {string} version - Version to use in workspace ranges.
 * @param {string[]} localPackages - Array of local package names to reset.
 * @returns {Promise<Record<string, any>>} The updated package.json object.
 */
export async function resetToWorkspaceRanges(packagePath, version, localPackages) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  if (!pkg.dependencies) return pkg;

  for (const dep in pkg.dependencies) {
    if (localPackages.includes(dep)) {
      pkg.dependencies[dep] = `workspace:^${version}`;
    }
  }

  fs.writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
  return pkg;
}

/**
 * Runs a build script for a package if it exists in its package.json.
 * Used during release process to build packages before publishing.
 *
 * @example <caption>Build a package if build script exists</caption>
 * const wasBuilt = buildPackageIfNeeded('./packages/button/package.json');
 *
 * @param {string} packagePath - Absolute path to the package.json file.
 * @returns {boolean} True if build was executed, false if no build script found.
 */
export function buildPackageIfNeeded(packagePath) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  if (pkg.scripts && Object.keys(pkg.scripts).includes('build')) {
    const packageDir = path.dirname(packagePath);
    execSync(`pnpm --prefix=${packageDir} build`, { stdio: 'inherit' });
    return true;
  }

  return false;
}

/**
 * Recursively collects all package.json file paths from a directory tree.
 *
 * @example <caption>Collect package.json files</caption>
 * const files = collectPackageJson('./packages');
 *
 * @export
 * @param {string} dir - Directory to search
 * @returns {string[]} Array of package.json file paths
 */
export function collectPackageJson(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) return collectPackageJson(full);

    return entry.name === 'package.json' ? [full] : [];
  });
}

/**
 * Sorts package.json file paths by type: css, js, components (default weights).
 * Returns an array of objects with type and path properties, sorted by weight.
 *
 * @example <caption>Sort package.json paths by weights</caption>
 * const sorted = sortPackageJsonByWeights(paths);
 *
 * @export
 * @param {string[]} packageJsonPaths - Array of package.json file paths
 * @param {Object} [weights] - Optional weights for sorting (default: css:0, js:1, components:2)
 * @returns {Array<{ type: string, path: string }>} Sorted array of objects
 */
export function sortPackageJsonByWeights(
  packageJsonPaths,
  weights = {
    css: 0,
    js: 1,
    components: 2,
  },
) {
  const packageJsonPathsRemap = packageJsonPaths
    .map((path) => {
      const result = /(.*)\/(?<bucket>css|js|components)/g.exec(path);

      return { type: result.groups.bucket, path };
    })
    .sort((a, b) => weights[a.type] - weights[b.type]);

  return packageJsonPathsRemap;
}
