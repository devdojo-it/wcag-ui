'use strict';

import './polyfills';

import { componentDecorator } from './decorator';
import { encoding } from './encoding';
import { events } from './events';
import { helpers } from './helpers';

import { extender } from './_extender';

export let coreStyleSheet = new CSSStyleSheet();
coreStyleSheet.replaceSync('@layer wcag-ui.core, wcag-ui.foundations, wcag-ui.components;');

// TODO: add a check on adoptedStyleSheets for supporting older browsers
document.adoptedStyleSheets.push(coreStyleSheet);

export { componentDecorator, encoding, events, extender, helpers };
