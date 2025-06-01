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
const localPackages = packageJsonPaths.map((p) => JSON.parse(fs.readFileSync(p, "utf8")).name);

/** 1. Costruisci ogni pacchetto */
execSync("pnpm --filter ./packages... run build", { stdio: "inherit" });

/** 2. Calcola next version */
const lastTag = execSync("git describe --tags --abbrev=0").toString().trim();
const commits = execSync(`git log ${lastTag}..HEAD --pretty=%s`).toString().split("\n");
let bump = "patch";
if (commits.some((c) => /BREAKING CHANGE/.test(c))) bump = "major";
else if (commits.some((c) => c.startsWith("feat"))) bump = "minor";

const [major, minor, patch] = lastTag.substring(1).split(".").map(Number);
const next =
  bump === "major"
    ? `${major + 1}.0.0`
    : bump === "minor"
    ? `${major}.${minor + 1}.0`
    : `${major}.${minor}.${patch + 1}`;

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

/** 4. Rigenera sito docs */
execSync("pnpm run docs:build", { stdio: "inherit" });

/** 5. Changelog, commit & TAG di release generale */
execSync("npx generate-changelog -p > CHANGELOG.md", { stdio: "inherit" });
execSync("git add .", { stdio: "inherit" });
execSync(`git commit -m "chore(release): v${next}"`, { stdio: "inherit" });
execSync(`git tag v${next}`);
execSync("git push --follow-tags", { stdio: "inherit" });

/** 6. Pubblica su registry */
for (const file of packageJsonPaths) {
  const dir = path.dirname(file);
  execSync(`npm publish --workspace ${dir} --access public`, { stdio: "inherit" });
}
