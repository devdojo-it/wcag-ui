// component.mjs
// CLI per creare un nuovo componente wcagUI partendo da ./scripts/templates/component
// Uso:
//   node --experimental-modules ./scripts/component.mjs --component-name="treeView"
// Opzioni:
//   --component-name (obbligatorio)  Nome del componente (CamelCase, kebab, snake, ecc.)
//   --force                          Sovrascrive la cartella destinazione se esiste
//   --no-install                     Salta il `pnpm install`
//   --dry-run                        Mostra cosa farebbe senza toccare file
//   --css-file="./src/styles/index.css"  Se presente, aggiunge @import al CSS
//   --js-file="./src/scripts/index.js"   Se presente, aggiunge import JS
//
// Effetti:
// 0. Copia ./scripts/templates/component in ./packages/components
// 1. Rinomina "component" in <kebabName> (es. "tree-view")
// 2. Find&replace placeholder (componentName / ComponentName / component-name / component_name / COMPONENT_NAME)
// 3. Rinomina i file che contengono i placeholder nel nome
// 4. Aggiunge "@wcag-ui/<kebabName>": "workspace:^0.0.0" alla root package.json
// 5. Esegue `pnpm install` (se non --no-install)
// 6. (opz.) Inserisce import in CSS/JS passati via flag
// 7. Genera ./src/component-<condensed>.html (es. component-tree-view.html)

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = process.cwd();

function parseArgs(argv) {
  const args = {};
  for (const token of argv.slice(2)) {
    const m = token.match(/^--([^=\s]+)(?:=(.*))?$/);
    if (!m) continue;
    const key = m[1];
    const val = m[2] === undefined ? true : m[2];
    args[key] = val;
  }
  return args;
}

const args = parseArgs(process.argv);
if (!args['component-name']) {
  console.error('❌  Missing required --component-name option.');
  process.exit(1);
}

const DRY = Boolean(args['dry-run']);
const FORCE = Boolean(args.force);
const NO_INSTALL = Boolean(args['no-install']);

const cssFileOpt = args['css-file'];
const jsFileOpt = args['js-file'];

const rootPkgPath = path.join(cwd, 'package.json');
const templatesDir = path.join(cwd, 'scripts', 'templates', 'component');
const componentsDir = path.join(cwd, 'packages', 'components');

// ── naming helpers ────────────────────────────────────────────────────────────
const rawName = String(args['component-name']);

function toKebab(s) {
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}
function toCamel(s) {
  const k = toKebab(s);
  return k.replace(/-([a-z0-9])/g, (_, ch) => ch.toUpperCase());
}
function toPascal(s) {
  const c = toCamel(s);
  return c.charAt(0).toUpperCase() + c.slice(1);
}
function toSnake(s) {
  return toKebab(s).replace(/-/g, '_');
}
function toScreamingSnake(s) {
  return toSnake(s).toUpperCase();
}

const kebabName = toKebab(rawName); // "tree-view"
const camelName = toCamel(rawName); // "treeView"
const pascalName = toPascal(rawName); // "TreeView"
const snakeName = toSnake(rawName); // "tree_view"
const upperSnake = toScreamingSnake(rawName); // "TREE_VIEW"
const condensed = camelName.toLowerCase(); // "treeview"  <-- per file HTML e tag wcag-*

const pkgName = `@wcag-ui/${kebabName}`;

const PLACEHOLDERS = [
  { from: 'componentName', to: camelName },
  { from: 'ComponentName', to: pascalName },
  { from: 'component-name', to: kebabName },
  { from: 'component_name', to: snakeName },
  { from: 'COMPONENT_NAME', to: upperSnake },
];

// ── fs helpers ────────────────────────────────────────────────────────────────
async function ensureDir(p) {
  if (!existsSync(p)) await fs.mkdir(p, { recursive: true });
}

async function cpRecursive(src, dest) {
  await fs.cp(src, dest, { recursive: true, force: true });
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (e.isFile()) yield full;
  }
}

async function replaceInFile(file, replacements) {
  const data = await fs.readFile(file, 'utf8');
  let out = data;
  for (const { from, to } of replacements) {
    const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    out = out.replace(re, to);
  }
  if (out !== data) {
    if (!DRY) await fs.writeFile(file, out, 'utf8');
    return true;
  }
  return false;
}

async function renamePlaceholdersInFilenames(baseDir) {
  for await (const file of walk(baseDir)) {
    const dir = path.dirname(file);
    const name = path.basename(file);
    if (!name.includes('componentName') && !name.includes('component-name') && !name.includes('ComponentName') && !name.includes('componentname'))
      continue;

    let newName = name;
    for (const { from, to } of [
      { from: 'componentName', to: kebabName },
      { from: 'ComponentName', to: pascalName },
      { from: 'component-name', to: kebabName },
      { from: 'componentname', to: condensed },
    ]) {
      newName = newName.replace(from, to);
    }
    const dest = path.join(dir, newName);
    if (dest !== file) {
      if (DRY) console.log(`DRY • rename ${path.relative(cwd, file)} → ${path.relative(cwd, dest)}`);
      else await fs.rename(file, dest);
    }
  }
}

async function addDependencyToRoot(pkgPath, depName, depVersion) {
  const raw = await fs.readFile(pkgPath, 'utf8');
  const pkg = JSON.parse(raw);
  if (!pkg.dependencies) pkg.dependencies = {};

  const already = pkg.dependencies[depName] ?? pkg.devDependencies?.[depName];
  if (already === depVersion) return { changed: false, message: 'dependency already set' };

  pkg.dependencies[depName] = depVersion;
  if (!DRY) await fs.writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
  return { changed: true, message: already ? 'dependency updated' : 'dependency added' };
}

async function appendLineIfMissing(filePath, line) {
  const exists = existsSync(filePath);
  if (!exists) return { ok: false, reason: 'file not found' };
  const content = await fs.readFile(filePath, 'utf8');
  if (content.includes(line)) return { ok: true, changed: false };
  const sep = content.endsWith('\n') ? '' : '\n';
  if (!DRY) await fs.writeFile(filePath, `${content}${sep}${line}\n`, 'utf8');
  return { ok: true, changed: true };
}

// ── main flow ────────────────────────────────────────────────────────────────
(async function main() {
  // 0. precondizioni
  if (!existsSync(templatesDir)) {
    console.error(`❌  Template non trovato: ${path.relative(cwd, templatesDir)}`);
    process.exit(1);
  }
  await ensureDir(componentsDir);

  const tmpTarget = path.join(componentsDir, 'component');
  const finalTarget = path.join(componentsDir, kebabName);

  if (existsSync(finalTarget)) {
    if (!FORCE) {
      console.error(
        `❌  Il componente "${kebabName}" esiste già in ${path.relative(cwd, finalTarget)}. Usa --force per sovrascrivere.`,
      );
      process.exit(1);
    } else if (!DRY) {
      await fs.rm(finalTarget, { recursive: true, force: true });
    }
  }

  console.log(`▶ Creating component "${kebabName}" from template…`);

  // copia template → packages/components/component (tmp)
  if (existsSync(tmpTarget)) {
    if (!FORCE) {
      console.error(`❌  Esiste già la cartella temporanea ${path.relative(cwd, tmpTarget)}. Eliminala o usa --force.`);
      process.exit(1);
    } else if (!DRY) {
      await fs.rm(tmpTarget, { recursive: true, force: true });
    }
  }

  if (DRY) console.log(`DRY • copy ${path.relative(cwd, templatesDir)} → ${path.relative(cwd, tmpTarget)}`);
  else await cpRecursive(templatesDir, tmpTarget);

  // rinomina "component" → "<kebabName>"
  if (DRY) console.log(`DRY • rename ${path.relative(cwd, tmpTarget)} → ${path.relative(cwd, finalTarget)}`);
  else await fs.rename(tmpTarget, finalTarget);

  // find & replace in TUTTI i file del nuovo componente
  let replacedCount = 0;
  for await (const file of walk(finalTarget)) {
    const changed = await replaceInFile(file, PLACEHOLDERS);
    if (changed) replacedCount++;
  }
  console.log(`✔ Placeholder sostituiti in ${replacedCount} file`);

  // rinomina i file che contengono placeholder nel nome
  await renamePlaceholdersInFilenames(finalTarget);

  // aggiorna root package.json con dipendenza workspace
  console.log(`▶ Aggiornamento dipendenze in package.json…`);
  const depRes = await addDependencyToRoot(rootPkgPath, pkgName, 'workspace:^0.0.0');
  if (depRes.changed) console.log(`✔ ${depRes.message} (${pkgName})`);
  else console.log(`ℹ ${depRes.message} (${pkgName})`);

  // pnpm install (se non disabilitato)
  if (!NO_INSTALL) {
    try {
      if (DRY) console.log(`DRY • pnpm install`);
      else {
        console.log(`▶ Esecuzione "pnpm install"…`);
        execSync('pnpm install', { stdio: 'inherit', cwd });
      }
    } catch {
      console.warn('⚠  pnpm install fallito. Esegui manualmente: pnpm install');
    }
  } else {
    console.log('⏭  Skip pnpm install (--no-install)');
  }

  // (opzionale) inserisci import nei file passati
  if (cssFileOpt) {
    const cssLine = `@import "npm:${pkgName}/${kebabName}.min.css";`;
    const res = await appendLineIfMissing(path.resolve(cwd, cssFileOpt), cssLine);
    if (!res.ok) console.warn(`⚠  CSS import non aggiunto: ${res.reason}`);
    else if (res.changed) console.log(`✔ Aggiunto import CSS a ${cssFileOpt}`);
    else console.log(`ℹ Import CSS già presente in ${cssFileOpt}`);
  }

  if (jsFileOpt) {
    const jsLine = `import "${pkgName}";`;
    const res = await appendLineIfMissing(path.resolve(cwd, jsFileOpt), jsLine);
    if (!res.ok) console.warn(`⚠  JS import non aggiunto: ${res.reason}`);
    else if (res.changed) console.log(`✔ Aggiunto import JS a ${jsFileOpt}`);
    else console.log(`ℹ Import JS già presente in ${jsFileOpt}`);
  }

  // genera il file HTML in ./src/components-<kebabName>.html (es. components-tree-view.html)
  const srcDir = path.join(cwd, 'src');
  await ensureDir(srcDir);
  const htmlFilePath = path.join(srcDir, `components-${kebabName}.html`);

  const htmlTemplate = `<extends src="_layout.html" locals='{"title": "Docs"}'>
  <block name="aside">
    <include src="common/docs-nav.html"></include>
  </block>
  <block name="main">
    <h1>${pascalName} Docs Example</h1>
    <section>
      <h2>${pascalName}</h2>
      <p>
        <element is="wcag-${kebabName}"></element>
      </p>
    </section>
  </block>
</extends>
`;

  if (DRY) {
    console.log(`DRY • create ${path.relative(cwd, htmlFilePath)}`);
  } else {
    await fs.writeFile(htmlFilePath, htmlTemplate, 'utf8');
    console.log(`✔ File HTML creato: ${path.relative(cwd, htmlFilePath)}`);
  }

  // 7. messaggio finale
  console.log('\n🎉  Componente creato!');
  console.log(`   Cartella: ${path.relative(cwd, finalTarget)}`);
  console.log(`   Package : ${pkgName}`);
  console.log(`   HTML    : ${path.relative(cwd, htmlFilePath)}`);
  console.log('\nProssimi passi (se non hai usato --css-file / --js-file):');
  console.log(`  • Aggiungi nel tuo CSS principale:\n    @import "npm:${pkgName}/${kebabName}.min.css";`);
  console.log(`  • Aggiungi nel tuo JS principale:\n    import "${pkgName}";`);
  console.log('  • Incolla l’HTML del componente dove necessario.');
})().catch((err) => {
  console.error('❌  Errore:', err);
  process.exit(1);
});
