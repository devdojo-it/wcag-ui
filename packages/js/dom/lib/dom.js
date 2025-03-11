export * from './_ancestors';
export * from './_cancelEvent';
export * from './_detector';
export * from './_dispatchCustomEvent';
export * from './_findNodes';
export * from './_siblings';

export * from './_containsHTML';
export * from './_outerHTML';
export * from './_sanitizeHTML';

import * as DOMHelpers from './_dom';

const DOM = { ...DOMHelpers };

export { DOM };
