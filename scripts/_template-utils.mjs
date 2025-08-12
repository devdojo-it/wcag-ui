// Template and formatting utilities for CLI scripts
import fs from 'node:fs/promises';
import path from 'node:path';
import * as prettier from 'prettier';

const cwd = process.cwd();

/**
 * Writes an HTML file to disk, formatting it with Prettier before saving.
 * If dryRun is true, the file is not written.
 *
 * @example <caption>Write and format HTML file</caption>
 * await writeHtmlFileWithPrettier('./src/index.html', '<h1>Hello, world!</h1>');
 *
 * @export
 * @param {string} filePath - Path to the HTML file to write
 * @param {string} htmlContent - HTML content to format and write
 * @param {boolean} [dryRun=false] - If true, does not write the file
 * @returns {Promise<void>}
 */
export async function writeHtmlFileWithPrettier(filePath, htmlContent, dryRun = false) {
  if (dryRun) {
    return;
  }

  try {
    const formatted = await prettier.format(htmlContent, { parser: 'html', printWidth: 100, tabWidth: 2 });

    await fs.writeFile(filePath, formatted, 'utf8');

    console.log(`✔ HTML file (${filePath}) created and formatted with prettier: ${path.relative(cwd, filePath)}`);
  } catch (e) {
    console.warn(`⚠  Prettier formatting failed: ${e?.message || e}`);
    try {
      await fs.writeFile(filePath, htmlContent, 'utf8');
      console.log(`✔ HTML file created without prettier: ${path.relative(cwd, filePath)}`);
    } catch (writeErr) {
      console.warn(`⚠  Failed to write HTML file: ${writeErr?.message || writeErr}`);
    }
  }
}
