import fs from "node:fs";
import path from "node:path";

/* ------------------------------------------------------------------------ */
/* Recursive helper for collecting package.json files from packages         */
/* ------------------------------------------------------------------------ */
export function collectPackageJson(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) return collectPackageJson(full);

    return entry.name === "package.json" ? [full] : [];
  });
}

export function sortPackageJsonByWeights(
  packageJsonPaths,
  weights = {
    css: 0,
    js: 1,
    components: 2,
  }
) {
  const packageJsonPathsRemap = packageJsonPaths
    .map((path) => {
      const result = /(.*)\/(?<bucket>css|js|components)/g.exec(path);

      return { type: result.groups.bucket, path };
    })
    .sort((a, b) => weights[a.type] - weights[b.type]);

  // console.log(packageJsonPathsRemap);

  return packageJsonPathsRemap;
}
