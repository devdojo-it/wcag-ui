import { setLocale } from './calendar.js';
/** @import { Calendar } from './calendar.js' */

export default {
  /** @this {Calendar} */
  lang() {
    setLocale(this);
  },
};
