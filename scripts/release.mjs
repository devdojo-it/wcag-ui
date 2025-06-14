#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { sortPackageJsonByWeights } from "./_utils.mjs";

const root = process.cwd();

// TODO: handle the "verbose" CLI version enabling (console.log)s if needed
/* ------------------------------------------------------------------------ */
/* 1. Collects package.json files from packages                             */
/* ------------------------------------------------------------------------ */
const packageJsonPaths = collectPackageJson(path.join(root, "packages"));
// console.log("detected packageJsonPaths: ", packageJsonPaths);

const localPackages = packageJsonPaths.map((p) => JSON.parse(fs.readFileSync(p, "utf8")).name);
// console.log("detected localPackages: ", localPackages);

/* ------------------------------------------------------------------------ */
/* 2. Fetches the lastTag (or the first commit if there's not tag) from git */
/* ------------------------------------------------------------------------ */
let lastTagOrCommit;

try {
  lastTagOrCommit = execSync("git describe --tags --abbrev=0").toString().trim();
} catch {
  lastTagOrCommit = execSync("git log --format='%H' | tail -1").toString().trim();
}
// console.log("detected lastTagOrCommit: ", lastTagOrCommit);

/* ------------------------------------------------------------------------ */
/* 3. Collects all the commits since lastTagOrCommit up to HEAD             */
/* ------------------------------------------------------------------------ */
const commitsLogCommand = `git log ${!!lastTagOrCommit ? `${lastTagOrCommit}..HEAD` : ""} --pretty=%s`;
// console.log("running: ", commitsLogCommand);

const commits = execSync(commitsLogCommand).toString().split("\n").filter(String);
// console.log("involved commits: ", commits);

/* ------------------------------------------------------------------------ */
/* 4. Computes the next semver for the packages                             */
/* ------------------------------------------------------------------------ */
let bump = commits.some((c) => /BREAKING CHANGE/.test(c))
  ? "major"
  : commits.some((c) => c.startsWith("feat"))
  ? "minor"
  : "patch";

// is semver or commit?
const isSemverRegex =
  /^(v)?([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/g;

let lastTag = !!lastTagOrCommit.match(isSemverRegex) ? lastTagOrCommit : "0.0.0";
console.log("detected lastTag", lastTag);

let [major, minor, patch] = lastTag.split(".").map(Number);

const next =
  bump === "major"
    ? `${major + 1}.0.0`
    : bump === "minor"
    ? `${major}.${minor + 1}.0`
    : `${major}.${minor}.${patch + 1}`;

console.log(`Bumping version from ${lastTag} to ${next} (${bump})`);

/* ------------------------------------------------------------------------ */
/* 5. Sorts the packages according to: css → js → components                */
/* ------------------------------------------------------------------------ */
const packageJsonPathsRemap = sortPackageJsonByWeights(packageJsonPaths);

/* ------------------------------------------------------------------------ */
/* 6. Updates the package.json files in the packages according to the next  */
/*    semver, and run build scripts if present                              */
/* ------------------------------------------------------------------------ */
for (const packageJson of packageJsonPathsRemap) {
  const pkg = JSON.parse(fs.readFileSync(packageJson.path, "utf8"));

  pkg.version = next;

  for (const field of ["dependencies", "peerDependencies", "devDependencies"]) {
    if (!pkg[field]) continue;

    for (const dep in pkg[field]) {
      localPackages.includes(dep) && (pkg[field][dep] = `^${next}`);
    }
  }

  fs.writeFileSync(packageJson.path, JSON.stringify(pkg, null, 2) + "\n");

  Object.keys(pkg.scripts).includes("build") &&
    execSync(`npm --prefix=${path.dirname(packageJson.path)} run build`, { stdio: "inherit" });
}

/* ------------------------------------------------------------------------ */
/* 6. Updates the root package.json and runs build script if present        */
/* ------------------------------------------------------------------------ */
const rootPkgPath = path.join(root, "package.json");

if (fs.existsSync(rootPkgPath)) {
  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf8"));

  rootPkg.version = next;

  localPackages.forEach((name) => {
    rootPkg.dependencies ??= {};
    rootPkg.dependencies[name] = `^${next}`;
  });

  fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + "\n");

  Object.keys(rootPkg.scripts).includes("build") && execSync(`npm run build`, { stdio: "inherit" });
}

/* ------------------------------------------------------------------------ */
/* 7. Updates the changelog file from lastTagOrCommit to HEAD               */
/* ------------------------------------------------------------------------ */
execSync(`changelog -t ${lastTagOrCommit}..HEAD -x rel,build,chore`, { stdio: "inherit" });

/* ------------------------------------------------------------------------ */
/* 8. Pushes all the updated files in a chore(release): commit              */
/* ------------------------------------------------------------------------ */
execSync("git add .", { stdio: "inherit" });
execSync(`git commit -m "chore(release): v${next}"`, { stdio: "inherit" });
execSync("git push", { stdio: "inherit" });

/* ------------------------------------------------------------------------ */
/* 9. Generates and pushes the {next} semver tag                            */
/* ------------------------------------------------------------------------ */
execSync(`git tag v${next}`);
execSync("git push --tags", { stdio: "inherit" });

/* ------------------------------------------------------------------------ */
/* 10. Publishes the packages into the configured registry (default: npm)   */
/* ------------------------------------------------------------------------ */
for (const packageJson of packageJsonPathsRemap) {
  execSync(`npm publish --prefix=${path.dirname(packageJson.path)} --access public`, { stdio: "inherit" });
}
