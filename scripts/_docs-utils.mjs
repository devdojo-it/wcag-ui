// Documentation update utilities for CLI scripts
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { ensureDir } from './_fs-utils.mjs';

const cwd = process.cwd();

// ── Custom documentation helpers ───────────────────────────────────────────

/**
 * Adds a new component section to the main documentation file (COMPONENTS.md).
 * If the section does not exist, it is created and sorted alphabetically.
 *
 * @example <caption>Add a new component to docs</caption>
 * addComponentToDocsMD('tree-view', 'TreeView');
 *
 * @export
 * @param {string} kebabName - Component name in kebab-case
 * @param {string} pascalName - Component name in PascalCase
 * @param {boolean} [dryRun=false] - If true, does not write changes
 * @returns {Promise<void>}
 */
export async function addComponentToDocsMD(kebabName, pascalName, dryRun = false) {
  const filePath = path.join(cwd, 'docs', 'COMPONENTS.md');

  if (!existsSync(filePath)) {
    return;
  }

  const content = await fs.readFile(filePath, 'utf8');

  // Extract header and footer
  const headerMatch = content.match(/^[\s\S]*?(?=---)/);
  const header = headerMatch ? headerMatch[0] : '';
  const footerMatch = content.match(/---\n\nEach component[\s\S]*$/);
  const footer = footerMatch ? footerMatch[0] : '';

  // Extract component sections
  // biome-ignore lint/complexity/noUselessEscapeInRegex: <the escape is needed here>
  const sectionRegex = /---\n\n## ([A-Za-z0-9 \(\)-]+)[\s\S]*?(?=---|$)/g;
  const sections = [];
  let match;

  while ((match = sectionRegex.exec(content))) {
    sections.push({
      name: match[1],
      raw: match[0],
    });
  }

  // New section for the component
  const newSection = `---\n\n## ${pascalName}\n\nThe **${pascalName}** component is a reusable UI element. See documentation for usage and accessibility.\n\n[Explore ${pascalName} →](./components-${kebabName}.html)\n\n---`;

  if (!sections.some((s) => s.name === pascalName)) {
    sections.push({ name: pascalName, raw: newSection });
  }

  // Sort sections alphabetically
  sections.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  // Rebuild the file
  const newContent = header + sections.map((s) => s.raw).join('') + footer;

  if (!dryRun) {
    await fs.writeFile(filePath, newContent, 'utf8');
  }
}

/**
 * Adds a new component link to the documentation navigation menu (docs-nav.html).
 * If the link does not exist, it is created and sorted alphabetically.
 *
 * @example <caption>Add a new component to docs nav menu</caption>
 * addComponentToDocsNav('tree-view', 'TreeView');
 *
 * @export
 * @param {string} kebabName - Component name in kebab-case
 * @param {string} pascalName - Component name in PascalCase
 * @param {boolean} [dryRun=false] - If true, does not write changes
 * @returns {Promise<void>}
 */
export async function addComponentToDocsNav(kebabName, pascalName, dryRun = false) {
  const filePath = path.join(cwd, 'src', 'common', 'docs-nav.html');

  if (!existsSync(filePath)) {
    return;
  }

  const content = await fs.readFile(filePath, 'utf8');

  // Find the components section
  const compSectionRegex = /(<summary>Components<\/summary>[\s\S]*?<\/details>)/;
  const match = compSectionRegex.exec(content);

  if (!match) {
    return;
  }

  let compSection = match[1];

  // Extract all links
  // biome-ignore lint/complexity/noUselessEscapeInRegex: <the escape is needed here>
  const linkRegex = /<a href="\.\/components-([a-z0-9-]+)\.html">([A-Za-z0-9 \(\)-]+)<\/a>/g;
  const links = [];
  let l;

  while ((l = linkRegex.exec(compSection))) {
    links.push({ kebab: l[1], name: l[2], raw: l[0] });
  }

  // Add the new link if it does not exist
  if (!links.some((x) => x.kebab === kebabName)) {
    links.push({
      kebab: kebabName,
      name: pascalName,
      raw: `<a href="./components-${kebabName}.html">${pascalName}</a>`,
    });
  }

  // Sort links alphabetically
  links.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  // Rebuild the section
  const newLinks = links.map((x) => `    ${x.raw}`).join('\n');
  compSection = compSection.replace(/(<summary>Components<\/summary>)([\s\S]*?)(<\/details>)/, `$1\n${newLinks}\n$3`);

  // Replace in the file
  const newContent = content.replace(compSectionRegex, compSection);

  if (!dryRun) {
    await fs.writeFile(filePath, newContent, 'utf8');
  }
}

/**
 * Creates a documentation folder and markdown file for a new component.
 * The markdown file includes usage and accessibility information.
 *
 * @example <caption>Create docs folder for tree-view component</caption>
 * createComponentDocsFolder('tree-view', 'TreeView');
 *
 * @export
 * @param {string} kebabName - Component name in kebab-case
 * @param {string} pascalName - Component name in PascalCase
 * @param {boolean} [dryRun=false] - If true, does not write changes
 * @returns {Promise<void>}
 */
export async function createComponentDocsFolder(kebabName, pascalName, dryRun = false) {
  const docsDir = path.join(cwd, 'docs', pascalName);
  await ensureDir(docsDir);
  const docFile = path.join(docsDir, `${pascalName}.md`);

  if (existsSync(docFile)) {
    return;
  }

  // Create documentation markdown for the component
  const docContent = `# ${pascalName}\n\nThe **${pascalName}** component is a reusable, accessible UI element.\n\n## Usage\n\n\`\`\`html\n<element is=\"wcag-${kebabName}\"></element>\n\`\`\`\n\n## WCAG Accessibility\n\n- Uses semantic HTML elements.\n- Supports ARIA attributes where appropriate.\n- Keyboard navigation enabled.\n- Focus management compliant with WCAG 2.1.\n\n## Examples\n\n\`\`\`html\n<!-- Example usage -->\n<element is=\"wcag-${kebabName}\"></element>\n\`\`\`\n`;

  if (!dryRun) {
    await fs.writeFile(docFile, docContent, 'utf8');
  }
}
