/**
 * @typedef {Object.<string, string>} TElementAttributes
 */

/**
 * @typedef TElementOptions
 * @type {object}
 * @property {string} tag - element's tag name.
 * @property {string[]} [classes] - element's classes.
 * @property {TElementAttributes} [attributes] - element's attributes in the form of { [key: string]: string }.
 * @property {string} [content] - the content to be added as textContent in the element.
 */

// export * from './_detector';

// *** DOM Traversing Helpers ***
import { ancestor, ancestors } from "./_ancestors";
import { containsHTML } from "./_containsHTML";
import { findNodes } from "./_findNodes";
import { getReferencedElement } from "./_getReferencedElement";
import { outerHTML } from "./_outerHTML";
import { getAllSiblings, getPrevSiblings, getNextSiblings } from "./_siblings";

// *** DOM Manipulation Helpers ***
import { createFragment } from "./_createFragment";
import { createElement } from "./_createElement";
import { ensureElement } from "./_ensureElement";
import { insertElement } from "./_insertElement";
import { insertHTML } from "./_insertHTML";
import { sanitizeHTML } from "./_sanitizeHTML";
import { wrapElement } from "./_wrapElement";

// *** DOM Utility Helpers ***
import { isNativelyFocusable } from "./_isNativelyFocusable";

const DOM = {
  // *** DOM Traversing Helpers ***
  ancestor,
  ancestors,
  containsHTML,
  findNodes,
  getAllSiblings,
  getNextSiblings,
  getPrevSiblings,
  getReferencedElement,
  outerHTML,
  // *** DOM Manipulation Helpers ***
  insertHTML,
  createFragment,
  createElement,
  ensureElement,
  insertElement,
  sanitizeHTML,
  wrapElement,
  // *** DOM Utility Helpers ***
  isNativelyFocusable
};

export { DOM };
