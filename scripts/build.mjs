#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

/* ------------------------------------------------------------------------ */
/* Recursive helper for collecting package.json files from packages         */
/* ------------------------------------------------------------------------ */
function collectPackageJson(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectPackageJson(full);
    return entry.name === "package.json" ? [full] : [];
  });
}

// TODO: handle the "verbose" CLI version enabling (console.log)s if needed

/* ------------------------------------------------------------------------ */
/* 1. Collects package.json files from packages                             */
/* ------------------------------------------------------------------------ */
const packageJsonPaths = collectPackageJson(path.join(root, "packages"));
console.log("detected packageJsonPaths: ", packageJsonPaths);

/* ------------------------------------------------------------------------ */
/* 2. Sorts the packages according to: css → js → components                */
/* ------------------------------------------------------------------------ */
const weights = {
  css: 0,
  js: 1,
  components: 2,
};

const packageJsonPathsRemap = packageJsonPaths
  .map((path) => {
    const result = /(.*)\/(?<bucket>css|js|components)/g.exec(path);

    return { type: result.groups.bucket, path };
  })
  .sort((a, b) => weights[a.type] - weights[b.type]);

console.log(packageJsonPathsRemap);

for (const packageJson of packageJsonPathsRemap) {
  const pkg = JSON.parse(fs.readFileSync(packageJson.path, "utf8"));

  Object.keys(pkg.scripts).includes("build") &&
    execSync(`npm run --workspace ${path.dirname(packageJson.path)} build`, { stdio: "inherit" });
}
