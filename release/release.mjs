#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

/* ------------------------------------------------------------------ */
/* Helper ricorsivo: raccoglie tutti i package.json in /packages       */
/* ------------------------------------------------------------------ */
function collectPackageJson(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectPackageJson(full);
    return entry.name === "package.json" ? [full] : [];
  });
}

const packageJsonPaths = collectPackageJson(path.join(root, "packages"));
// console.log("detected packageJsonPaths: ", packageJsonPaths);

const localPackages = packageJsonPaths.map((p) => JSON.parse(fs.readFileSync(p, "utf8")).name);
// console.log("detected localPackages: ", localPackages);

// /** 2. Calcola next version */
let lastTagOrCommit;

try {
  lastTagOrCommit = execSync("git describe --tags --abbrev=0").toString().trim();
} catch {
  lastTagOrCommit = execSync("git log --format='%H' | tail -1").toString().trim();
}
// console.log("detected lastTagOrCommit: ", lastTagOrCommit);

const commitsLogCommand = `git log ${!!lastTagOrCommit ? `${lastTagOrCommit}..HEAD` : ""} --pretty=%s`;

// // console.log("running: ", commitsLogCommand);

const commits = execSync(commitsLogCommand).toString().split("\n").filter(String);
// console.log("involved commits: ", commits);

let bump = "patch";
if (commits.some((c) => /BREAKING CHANGE/.test(c))) bump = "major";
else if (commits.some((c) => c.startsWith("feat"))) bump = "minor";

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

/** 3. Aggiorna versioni & dipendenze interne */
for (const file of packageJsonPaths) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));

  data.version = next;

  for (const field of ["dependencies", "peerDependencies", "devDependencies"]) {
    if (!data[field]) continue;

    for (const dep in data[field]) {
      if (localPackages.includes(dep)) data[field][dep] = `^${next}`;
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");

  Object.keys(data.scripts).includes("build:css") &&
    execSync(`npm run --workspace ${path.dirname(file)} build:css`, { stdio: "inherit" });
}
// Aggiorna root se presente
const rootPkgPath = path.join(root, "package.json");

if (fs.existsSync(rootPkgPath)) {
  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf8"));

  rootPkg.version = next;

  localPackages.forEach((name) => {
    rootPkg.dependencies ??= {};
    rootPkg.dependencies[name] = `^${next}`;
  });

  fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + "\n");
}

// // /** 5. Changelog, commit & TAG di release generale */
execSync(`changelog -t ${lastTagOrCommit}..HEAD -x rel,build`, { stdio: "inherit" });
// execSync("git add .", { stdio: "inherit" });
// execSync(`git commit -m "chore(release): v${next}"`, { stdio: "inherit" });
// execSync(`git tag v${next}`);
// execSync("git push --follow-tags", { stdio: "inherit" });

// /** 6. Pubblica su registry */
// for (const file of packageJsonPaths) {
//   const dir = path.dirname(file);
//   execSync(`npm publish --workspace ${dir} --access public`, { stdio: "inherit" });
// }
