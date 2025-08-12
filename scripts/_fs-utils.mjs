// File system utility functions for CLI scripts
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

const cwd = process.cwd();

/**
 * Ensures that a directory exists. If it does not exist, creates it recursively.
 * Logs the creation if the directory is newly created.
 *
 * @example <caption>Ensure a directory exists</caption>
 * await ensureDir('./path/to/dir');
 *
 * @param {string} dirPath - Path to the directory to ensure
 * @returns {Promise<void>}
 */
export async function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    await fs.mkdir(dirPath, { recursive: true });

    console.log(`✔ Created directory: ${path.relative(cwd, dirPath)}`);
  }
}

/**
 * Copies a file or directory recursively from source to destination.
 * Logs the copy operation.
 *
 * @example <caption>Copy a directory recursively</caption>
 * await cpRecursive('./src', './dest');
 *
 * @param {string} srcPath - Source path
 * @param {string} destPath - Destination path
 * @returns {Promise<void>}
 */
export async function cpRecursive(srcPath, destPath) {
  await fs.cp(srcPath, destPath, { recursive: true, force: true });

  console.log(`✔ Copied ${path.relative(cwd, srcPath)} to ${path.relative(cwd, destPath)}`);
}

/**
 * Recursively walks a directory and yields all file paths found.
 *
 * @example <caption>Walk a directory</caption>
 * for await (const file of walk('./src')) {
 *   console.log(file);
 * }
 *
 * @param {string} dirPath - Directory to walk
 * @returns {AsyncGenerator<string>} Async generator yielding file paths
 */
export async function* walk(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const e of entries) {
    const full = path.join(dirPath, e.name);

    if (e.isDirectory()) {
      yield* walk(full);
    } else if (e.isFile()) {
      yield full;
    }
  }
}

/**
 * Replaces text in a file using an array of replacement objects.
 * Each replacement is applied globally in the file content.
 * If dryRun or dryRunContent is true, logs the operation instead of writing.
 *
 * @example <caption>Replace text in a file</caption>
 * await replaceInFile('./src/example.txt', [{ from: 'foo', to: 'bar' }]);
 *
 * @param {string} file - File path
 * @param {Array<{ from: string, to: string }>} replacements - Array of replacements
 * @param {boolean} [dryRun=false] - If true, does not write changes
 * @param {boolean} [dryRunContent=false] - If true, logs changes only
 * @param {string} [cwd=process.cwd()] - Current working directory
 * @returns {Promise<boolean>} True if changes were made
 */
export async function replaceInFile(file, replacements, dryRun = false, dryRunContent = false) {
  const data = await fs.readFile(file, 'utf8');
  let out = data;

  for (const { from, to } of replacements) {
    const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    out = out.replace(re, to);
  }

  if (out !== data) {
    if (dryRun || dryRunContent) {
      console.log(`dryRun${dryRunContent ? 'Content' : ''} • replace in ${path.relative(cwd, file)}`);

      return true;
    }

    await fs.writeFile(file, out, 'utf8');

    return true;
  }

  return false;
}

/**
 * Renames files in a directory by replacing placeholders in filenames.
 * Each placeholder in the filename is replaced according to the replacements array.
 * If dryRun is true, logs the operation instead of renaming.
 *
 * @example <caption>Rename placeholders in filenames</caption>
 * await renamePlaceholdersInFilenames('./src', [
 *   { from: 'componentName', to: 'testComponent' },
 *   { from: 'ComponentName', to: 'TestComponent' },
 *   { from: 'component-name', to: 'test-component' },
 *   { from: 'component_name', to: 'test_component' },
 *   { from: 'COMPONENT_NAME', to: 'TEST_COMPONENT' },
 * ], false);
 *
 * @param {string} baseDir - Directory to process
 * @param {Array<{ from: string, to: string }>} placeholders - Array of placeholder replacements
 * @param {boolean} [dryRun=false] - If true, does not write changes
 * @returns {Promise<void>}
 */
export async function renamePlaceholdersInFilenames(baseDir, placeholders, dryRun = false) {
  for await (const file of walk(baseDir)) {
    const dir = path.dirname(file);
    const name = path.basename(file);

  // Check if the filename contains at least one placeholder before processing
    if (!placeholders.some(ph => name.includes(ph.from))) {
      continue;
    }

    let newName = name;

    for (const { from, to } of placeholders) {
      newName = newName.replaceAll(from, to);
    }

    const dest = path.join(dir, newName);

    if (dest !== file) {
      if (dryRun) {
        console.log(`dryRun • rename ${path.relative(cwd, file)} → ${path.relative(cwd, dest)}`);
      } else {
        await fs.rename(file, dest);
      }
    }
  }
}

/**
 * Reads a JSON file and parses its content.
 *
 * @example <caption>Read a JSON file</caption>
 * const data = await readJson('./src/data.json');
 *
 * @param {string} p - Path to the JSON file
 * @returns {Promise<any>} Parsed JSON object
 */
export async function readJson(p) {
  const raw = await fs.readFile(p, 'utf8');

  return JSON.parse(raw);
}

/**
 * Writes an object to a JSON file, pretty-printed.
 * If dryRun is true, does not write the file.
 *
 * @example <caption>Write a JSON file</caption>
 * await writeJson('./src/data.json', { foo: 'bar' });
 *
 * @param {string} p - Path to the JSON file
 * @param {any} obj - Object to write
 * @param {boolean} [dryRun=false] - If true, does not write changes
 * @returns {Promise<void>}
 */
export async function writeJson(p, obj, dryRun = false) {
  const s = `${JSON.stringify(obj, null, 2)}\n`;

  if (!dryRun) {
    await fs.writeFile(p, s, 'utf8');
  }
}

/**
 * Sorts the keys of an object alphabetically and returns a new object.
 *
 * @example <caption>Sort the keys of an object</caption>
 * const sorted = sortObjectKeys({ b: 2, a: 1 });
 *
 * @param {Object} obj - Object to sort
 * @returns {Object} New object with sorted keys
 */
export function sortObjectKeys(obj) {
  return Object.keys(obj)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, k) => {
      acc[k] = obj[k];
      return acc;
    }, {});
}

/**
 * Appends a line to a file if it is missing. If dryRun is true, does not write the file.
 * Returns an object indicating the result and reason if not successful.
 *
 * @example <caption>Append a line to a file</caption>
 * await appendLineIfMissing('./src/data.txt', 'New line', true);
 *
 * @param {string} filePath - Path to the file
 * @param {string} line - Line to append
 * @param {boolean} [dryRun=false] - If true, does not write changes
 * @returns {{ok: boolean, changed: boolean, reason?: string}}
 */
export async function appendLineIfMissing(filePath, line, dryRun = false) {
  const exists = existsSync(filePath);

  if (!exists) {
    return {
      ok: false,
      reason: 'file not found',
    };
  }

  const content = await fs.readFile(filePath, 'utf8');

  if (content.includes(line))
    return {
      ok: true,
      changed: false,
    };

  const sep = content.endsWith('\n') ? '' : '\n';

  if (!dryRun) {
    await fs.writeFile(filePath, `${content}${sep}${line}\n`, 'utf8');
  }

  return {
    ok: true,
    changed: true,
  };
}
