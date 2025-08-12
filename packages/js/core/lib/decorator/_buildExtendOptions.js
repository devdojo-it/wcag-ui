/**
 * Returns the `extends` option for Custom Elements when the component
 * targets a built-in element extension (e.g., `{ extends: 'button' }`).
 *
 * If `component.extendsElement` is falsy, returns `undefined`.
 *
 * @param {{ extendsElement?: string }} component - Component static metadata.
 * @returns {{ extends: string }|undefined} The extend options (or `undefined`).
 */
export function buildExtendOptions(component) {
  return component.extendsElement ? { extends: component.extendsElement } : undefined;
}
