import { debounce } from './_debounce';
import { throttle } from './_throttle';

import { files } from './_files';
import { strings } from './_strings';
import { types } from './_types';

/**
 * General-purpose helpers bundle (debounce/throttle, string utils, types, files).
 */
const helpers = {
  debounce,
  throttle,
  files,
  strings,
  types,
};

export { helpers };
