/**
 * Convert the string to an HTML document
 * @return {Node} An HTML document
 */
const stringToDOM = (html) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, 'text/html');

  return dom.body || document.createElement('body');
};

/**
 * Check if the attribute is potentially dangerous
 * @param  {String} name - The attribute name
 * @param  {String} value - The attribute value
 * @return {Boolean} true, if the attribute is potentially dangerous
 */
const isPotentiallyDangerous = (name, value) => {
  const val = value.replace(/\s+/g, '').toLowerCase();
  const isPotentiallyScriptInjection = name.startsWith('on');

  const isPotentiallyXSS =
    ['src', 'href', 'xlink:href'].includes(name) && (val.includes('javascript:') || val.includes('data:text/html'));

  return isPotentiallyScriptInjection || isPotentiallyXSS;
};

/**
 * Remove potentially dangerous attributes from an element
 * @param  {Node} elem The element
 */
const removeAttributes = (elem) => {
  // If the node is not an element, bail
  if (elem.nodeType !== 1) return;

  // Otherwise, loop through each attribute
  // If it's dangerous, remove it
  for (const { name, value } of elem.attributes) {
    isPotentiallyDangerous(name, value) && elem.removeAttribute(name);
  }
};

/**
 * Remove dangerous stuff from the HTML document's nodes
 * @param  {Node} node The HTML document
 */
const cleanDOM = (node) => {
  for (const nodeItem of node.childNodes) {
    removeAttributes(nodeItem);
    cleanDOM(nodeItem);
  }
};

/**
 * Remove <script> elements
 * @param  {Node} node The HTML
 */
const removeScripts = (node) => {
  for (const script of node?.querySelectorAll('script') ?? []) {
    script.remove();
  }
};

/**
 * Sanitize an HTML string
 * @param  {String}          html   The HTML string to sanitize
 * @param  {Boolean}         returnAsElements: boolean = false If true, returns HTML nodes instead of a string
 * @return {String|NodeList}       The sanitized string or nodes
 */
export const sanitizeHTML = (html, returnAsElements = false) => {
  // Convert the string to HTML
  const dom = stringToDOM(html);

  // Sanitize it
  cleanDOM(dom);
  removeScripts(dom);

  // If the user wants HTML nodes back, return them
  // Otherwise, pass a sanitized string back
  return returnAsElements ? dom.childNodes : dom.innerHTML;
};
