/** biome-ignore-all lint/complexity/useLiteralKeys: <done because of code consistency> */

/**
 * CLI to scaffold a new wcag-ui component from the component template.
 *
 * Responsibilities:
 * 1. Copy the chosen template into packages/components/component
 * 2. Rename the temporary folder to packages/components/<kebabName>
 * 3. Replace placeholders in file contents (componentName / ComponentName / component-name / component_name / COMPONENT_NAME)
 * 4. Rename files that contain placeholders in their names
 * 5. Set the component package.json version to the root version and align workspace deps
 * 6. Optionally add the new package as dependency in the root package.json
 * 7. Optionally run `pnpm install`
 * 8. Optionally inject CSS/JS imports into provided files
 * 9. Optionally generate example HTML page(s)
 * 10. Wire docs: COMPONENTS.md, docs nav, and WCAG docs folder
 *
 * Usage example:
 *   node ./scripts/component-add.mjs --component-name="treeView"
 *
 * Options:
 *   --component-name (required)          Component name (CamelCase, kebab, snake, etc.)
 *   --pkg-scope="@scope"                 Package scope (default: "@wcag-ui")
 *   --template="./path/to/template"      Alternate template folder (default: ./scripts/templates/component)
 *   --force                              Overwrites the target folder if it already exists
 *   --no-install                         Skips running `pnpm install`
 *   --dry-run                            Shows what would be done without modifying files
 *   --dry-content                        Only logs placeholder replacements, doesn't write file contents
 *   --css-file="./src/styles/index.css"  If provided, adds an @import to the CSS
 *   --js-file="./src/scripts/index.js"   If provided, adds a JS import
 *   --root-version="x.y.z"               Overrides the root package.json version for this run
 *   --skip-html                          Skips generation of example HTML files
 *   --examples-dir="./examples"          Also generate example HTML into this folder
 *   --no-root-dep                        Do not add the new package to root package.json dependencies
 *   --tag-name="custom-tag"              Override default tag (defaults to "wcag-<kebabName>")
 *
 * Notes:
 * - This file assumes helper utilities provide I/O and string functions.
 * - When --dry-run is used, filesystem changes are not performed.
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { strings } from '@wcag-ui/core/lib/helpers/_strings.js';
import { parseArgs } from './_cli-utils.mjs';
import { addComponentToDocsMD, addComponentToDocsNav, createComponentDocsFolder } from './_docs-utils.mjs';

import {
  appendLineIfMissing,
  cpRecursive,
  ensureDir,
  readJson,
  renamePlaceholdersInFilenames,
  replaceInFile,
  walk,
} from './_fs-utils.mjs';

import { addWorkspaceDependency, updatePackageVersionAndWorkspaceDeps } from './_package-utils.mjs';
import { writeHtmlFileWithPrettier } from './_template-utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = process.cwd();

const args = parseArgs(process.argv);

if (!args['component-name']) {
  console.error('❌  Missing required --component-name option.');
  process.exit(1);
}

const DRY = args['dry-run'] && Boolean(args['dry-run']);
const DRY_CONTENT = args['dry-content'] && Boolean(args['dry-content']);
const FORCE = args['force'] && Boolean(args['force']);
const NO_INSTALL = args['no-install'] && Boolean(args['no-install']);
const SKIP_HTML = args['skip-html'] && Boolean(args['skip-html']);
const NO_ROOT_DEP = args['no-root-dep'] && Boolean(args['no-root-dep']);

const cssFileOpt = args['css-file'];
const jsFileOpt = args['js-file'];
const ROOT_VERSION_ARG = args['root-version'] ? String(args['root-version']) : null;
const PKG_SCOPE = args['pkg-scope'] ? String(args['pkg-scope']) : '@wcag-ui';

const TEMPLATE_PATH = args['template']
  ? path.resolve(cwd, String(args['template']))
  : path.join(cwd, 'scripts', 'templates', 'component');

const EXAMPLES_DIR = args['examples-dir'] ? path.resolve(cwd, String(args['examples-dir'])) : null;

const rootPkgPath = path.join(cwd, 'package.json');
const componentsDir = path.join(cwd, 'packages', 'components');

// ── naming helpers ────────────────────────────────────────────────────────────
const rawName = String(args['component-name']);

const camelName = strings.toCamelCase(rawName); // "treeView"
const pascalName = strings.toPascalCase(rawName); // "TreeView"
const kebabName = strings.toKebabCase(rawName); // "tree-view"
const snakeName = strings.toSnakeCase(rawName); // "tree_view"
const upperSnake = snakeName.toUpperCase(); // "TREE_VIEW"
const defaultTag = `wcag-${kebabName}`;
const tagName = args['tag-name'] ? String(args['tag-name']) : defaultTag;

const pkgName = `${PKG_SCOPE}/${kebabName}`;

const PLACEHOLDERS = [
  { from: 'componentName', to: camelName },
  { from: 'ComponentName', to: pascalName },
  { from: 'component-name', to: kebabName },
  { from: 'component_name', to: snakeName },
  { from: 'COMPONENT_NAME', to: upperSnake },
];

/**
 * Main CLI routine that orchestrates component scaffolding, placeholder replacement, file renaming,
 * version/dependencies alignment, optional dependency injection into root, optional install, optional
 * CSS/JS import injection, optional example HTML generation, and docs wiring.
 *
 * Error handling: the outer IIFE is followed by a .catch to ensure a non-zero exit code on failure.
 */
(async function main() {
  if (!existsSync(TEMPLATE_PATH)) {
    console.error(`❌  Template not found: ${path.relative(cwd, TEMPLATE_PATH)}`);
    process.exit(1);
  }

  if (!existsSync(rootPkgPath)) {
    console.error(`❌  Root package.json not found at ${path.relative(cwd, rootPkgPath)}`);
    process.exit(1);
  }

  // Root version (overridable via --root-version)
  const rootPkg = await readJson(rootPkgPath);
  let rootVersion = String(rootPkg.version || '0.0.0');

  if (ROOT_VERSION_ARG) {
    console.log(`ℹ Overriding root version ${rootVersion} → ${ROOT_VERSION_ARG} via --root-version`);
    rootVersion = ROOT_VERSION_ARG;
  }

  await ensureDir(componentsDir);

  const tmpTarget = path.join(componentsDir, 'component');
  const finalTarget = path.join(componentsDir, kebabName);

  if (existsSync(finalTarget)) {
    if (!FORCE) {
      console.error(
        `❌  Component "${kebabName}" already exists in ${path.relative(cwd, finalTarget)}. Use --force to overwrite.`,
      );
      process.exit(1);
    } else if (!DRY) {
      await fs.rm(finalTarget, { recursive: true, force: true });
    }
  }

  console.log(`▶ Creating component "${kebabName}" from template…`);

  if (existsSync(tmpTarget)) {
    if (!FORCE) {
      console.error(`❌  Temporary folder already exists ${path.relative(cwd, tmpTarget)}. Delete it or use --force.`);
      process.exit(1);
    } else if (!DRY) {
      await fs.rm(tmpTarget, { recursive: true, force: true });
    }
  }

  if (DRY) {
    console.log(`DRY • copy ${path.relative(cwd, TEMPLATE_PATH)} → ${path.relative(cwd, tmpTarget)}`);
    console.log(`DRY • rename ${path.relative(cwd, tmpTarget)} → ${path.relative(cwd, finalTarget)}`);
  } else {
    await cpRecursive(TEMPLATE_PATH, tmpTarget);
    await fs.rename(tmpTarget, finalTarget);
  }

  // Replace placeholders
  let replacedCount = 0;

  for await (const file of walk(finalTarget)) {
    const changed = await replaceInFile(file, PLACEHOLDERS);

    if (changed) {
      replacedCount++;
    }
  }

  console.log(`✔ Placeholders processed in ${replacedCount} file(s)${DRY_CONTENT ? ' (logged only)' : ''}`);

  // Rename files containing placeholders in their names
  await renamePlaceholdersInFilenames(finalTarget, PLACEHOLDERS, DRY);

  // Update component package.json version + deps
  const componentPkgPath = path.join(finalTarget, 'package.json');

  if (!existsSync(componentPkgPath)) {
    console.warn(`⚠  ${path.relative(cwd, componentPkgPath)} not found. Skipping version/deps update.`);
  } else if (DRY) {
    console.log(`DRY • set ${path.relative(cwd, componentPkgPath)} version=${rootVersion} and workspace deps`);
  } else {
    await updatePackageVersionAndWorkspaceDeps(componentPkgPath, rootVersion, DRY);
    console.log(`✔ Updated component package.json to version ${rootVersion} with workspace deps`);
  }

  // Root dependency + sort
  if (!NO_ROOT_DEP) {
    console.log(`▶ Updating dependencies in root package.json…`);
    const depRes = await addWorkspaceDependency(rootPkgPath, pkgName, rootVersion, DRY);

    if (depRes.changed) {
      console.log(`✔ ${depRes.message} (${pkgName} -> workspace:^${rootVersion})`);
    } else {
      console.log(`ℹ ${depRes.message} (${pkgName})`);
    }
  } else {
    console.log('⏭  Skipping adding root dependency (--no-root-dep)');
  }

  // pnpm install (unless disabled)
  if (!NO_INSTALL) {
    try {
      if (DRY) {
        console.log(`DRY • pnpm install`);
      } else {
        console.log(`▶ Running "pnpm install"…`);
        execSync('pnpm install', { stdio: 'inherit', cwd });
      }
    } catch {
      console.warn('⚠  pnpm install failed. Run manually: pnpm install');
    }
  } else {
    console.log('⏭  Skipping pnpm install (--no-install)');
  }

  // Optional imports
  if (cssFileOpt) {
    const cssLine = `@import "npm:${pkgName}/${kebabName}.min.css";`;
    try {
      const res = await appendLineIfMissing(path.resolve(cwd, cssFileOpt), cssLine, DRY);

      if (!res.ok) {
        console.warn(`⚠  CSS import not added: file not found (${cssFileOpt})`);
      } else if (res.changed) {
        console.log(`✔ Added CSS import to ${cssFileOpt}`);
      } else {
        console.log(`ℹ CSS import already present in ${cssFileOpt}`);
      }
    } catch (e) {
      console.warn(`⚠  CSS import not added to ${cssFileOpt}: ${e?.message || e}`);
    }
  }
  if (jsFileOpt) {
    const jsLine = `import "${pkgName}";`;
    try {
      const res = await appendLineIfMissing(path.resolve(cwd, jsFileOpt), jsLine, DRY);

      if (!res.ok) {
        console.warn(`⚠  JS import not added: file not found (${jsFileOpt})`);
      } else if (res.changed) {
        console.log(`✔ Added JS import to ${jsFileOpt}`);
      } else {
        console.log(`ℹ JS import already present in ${jsFileOpt}`);
      }
    } catch (e) {
      console.warn(`⚠  JS import not added to ${jsFileOpt}: ${e?.message || e}`);
    }
  }

  // Example HTML(s) unless skipped
  if (!SKIP_HTML) {
    const htmlTemplate = `
      <extends src="_layout.html" locals='{"title": "Docs"}'>
        <block name="aside">
          <include src="common/docs-nav.html"></include>
        </block>
        <block name="main">
          <h1>${pascalName} Docs Example</h1>
          <section>
            <h2>${pascalName}</h2>
            <p>
              <element is="${tagName}"></element>
            </p>
          </section>
        </block>
      </extends>
    `;

    // ./src/components-<kebabName>.html
    const srcDir = path.join(cwd, 'src');
    await ensureDir(srcDir);
    const htmlFilePath = path.join(srcDir, `components-${kebabName}.html`);

    if (DRY) {
      console.log(`DRY • create ${path.relative(cwd, htmlFilePath)}`);
    } else {
      await writeHtmlFileWithPrettier(htmlFilePath, htmlTemplate);
    }

    // optional: also into --examples-dir
    if (EXAMPLES_DIR) {
      await ensureDir(EXAMPLES_DIR);
      const examplesHtml = path.join(EXAMPLES_DIR, `components-${kebabName}.html`);

      if (DRY) {
        console.log(`DRY • create ${path.relative(cwd, examplesHtml)}`);
      } else {
        await writeHtmlFileWithPrettier(examplesHtml, htmlTemplate);
      }
    }
  } else {
    console.log('⏭  Skipping HTML generation (--skip-html)');
  }

  // Update COMPONENTS.md, docs-nav.html and create WCAG documentation
  await addComponentToDocsMD(kebabName, pascalName, DRY);
  await addComponentToDocsNav(kebabName, pascalName, DRY);
  await createComponentDocsFolder(kebabName, pascalName, DRY);

  console.log('\n🎉  Component created!');
  console.log(`   Folder : ${path.relative(cwd, path.join(componentsDir, kebabName))}`);
  console.log(`   Package: ${pkgName}`);

  if (!SKIP_HTML) {
    console.log(
      `   HTML   : src/components-${kebabName}.html${EXAMPLES_DIR ? `, ${path.relative(cwd, EXAMPLES_DIR)}/component-${kebabName}.html` : ''}`,
    );
  }

  console.log('\nNext steps (if you did not use --css-file / --js-file):');
  console.log(`  • Add to your main CSS:\n    @import "npm:${pkgName}/${kebabName}.min.css";`);
  console.log(`  • Add to your main JS:\n    import "${pkgName}";`);
  console.log('  • Paste the component HTML where needed.');
})().catch((err) => {
  console.error('❌  Error:', err);
  process.exit(1);
});
