import './polyfills';

import { componentDecorator } from './decorator';
import { encoding } from './encoding';
import { events } from './events';
import { helpers } from './helpers';

/**
 * Core global stylesheet used to declare CSS cascade layers for wcag-ui.
 *
 * Declares three layers in order: `wcag-ui.core`, `wcag-ui.foundations`, `wcag-ui.components`.
 * Consumers can import their own CSS within these layers to control precedence.
 */
export const coreStyleSheet = new CSSStyleSheet();
coreStyleSheet.replaceSync('@layer wcag-ui.core, wcag-ui.foundations, wcag-ui.components;');

// Attach the stylesheet using Constructable Stylesheets API.
// Note: add a feature detection or fallback if you need to support older browsers.
// Example:
// if ('adoptedStyleSheets' in Document.prototype) { document.adoptedStyleSheets.push(coreStyleSheet); }
document.adoptedStyleSheets.push(coreStyleSheet);

// Public surface of the core package
export { componentDecorator, encoding, events, helpers };
