#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { collectPackageJson, sortPackageJsonByWeights } from "./_utils.mjs";

const rootPath = process.cwd();

// TODO: handle the "verbose" CLI version enabling (console.log)s if needed

/* ------------------------------------------------------------------------ */
/* 1. Collects package.json files from packages                             */
/* ------------------------------------------------------------------------ */
const packageJsonPaths = collectPackageJson(path.join(rootPath, "packages"));
console.log("detected packageJsonPaths: ", packageJsonPaths);

/* ------------------------------------------------------------------------ */
/* 2. Sorts the packages according to: css → js → components                */
/* ------------------------------------------------------------------------ */
const packageJsonPathsRemap = sortPackageJsonByWeights(packageJsonPaths);
console.log(packageJsonPathsRemap);

for (const packageJson of packageJsonPathsRemap) {
  const pkg = JSON.parse(fs.readFileSync(packageJson.path, "utf8"));

  Object.keys(pkg.scripts).includes("build") &&
    execSync(`npm --prefix=${path.dirname(packageJson.path)} run build`, { stdio: "inherit" });
}
