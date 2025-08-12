import { strings } from '../helpers/_strings';

/**
 * Builds a dictionary of handler methods from a map of attributes or events.
 *
 * Given an input like `{ click: fn }`, generates:
 * `{ handleClick<Event|AttributeChanged>: fn }` depending on the provided suffix.
 *
 * @template T
 * @param {Record<string, T>} attributesOrEvents - Map of attribute/event names to handler functions.
 * @param {string} [methodSuffix=''] - Optional suffix appended to the generated method name.
 * @returns {Record<string, T>} Map of generated handler method names to the original functions.
 */
export function buildHandlers(attributesOrEvents, methodSuffix = '') {
  return Object.entries(attributesOrEvents).reduce((acc, item) => {
    acc[`handle${strings.toPascalCase(item[0])}${methodSuffix}`] = item[1];

    return acc;
  }, {});
}

/**
 * Convenience wrapper to build event handlers:
 * `{ click: fn }` -> `{ handleClickEvent: fn }`
 *
 * @template T
 * @param {Record<string, T>} componentEvents - Event handlers map.
 * @returns {Record<string, T>} Generated methods map.
 */
export function buildEventHandlers(componentEvents) {
  return buildHandlers(componentEvents, 'Event');
}

/**
 * Convenience wrapper to build attribute handlers:
 * `{ open: fn }` -> `{ handleOpenAttributeChanged: fn }`
 *
 * @template T
 * @param {Record<string, T>} componentAttributes - Attribute change handlers map.
 * @returns {Record<string, T>} Generated methods map.
 */
export function buildAttributeHandlers(componentAttributes) {
  return buildHandlers(componentAttributes, 'AttributeChanged');
}

// data-id
// open
// click

// Dialog.prototype.handleDataIdAttributeChanged();
// Dialog.prototype.handleOpenAttributeChanged();
// Button.prototype.handleClickEvent();
