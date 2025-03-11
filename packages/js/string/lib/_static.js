import { isString } from '@wcag-js/core';

export default {
  /**
   * checks if "something" is a string
   *
   * @example <caption>eg. usage</caption>
   * const x = 'hi';
   * const y = new Date();
   *
   * console.log(String.isString(x)); // true
   * console.log(String.isString(y)); // false
   * @memberOf string
   * @method isString()
   * @param {any} s - the provided "something"
   * @return {boolean}
   */
  isString: {
    value(s) {
      return isString(s);
    },
    writable: false,
    configurable: true,
    enumerable: false
  },
  guid: {
    value() {
      return `${Math.random().toString(16).slice(2, 10)}-${Math.random().toString(16).slice(2, 6)}-4${Math.random()
        .toString(16)
        .slice(2, 5)}-${Math.random().toString(16).slice(2, 6)}-${Math.random().toString(16).slice(2, 14)}`;
    },
    writable: false,
    configurable: true,
    enumerable: false
  },
  capitalize: {
    configurable: true,
    enumerable: false,
    writable: true,
    value(s) {
      return String.isString(s) && String.prototype.capitalize.call(s);
    }
  },
  camelize: {
    configurable: true,
    enumerable: false,
    writable: true,
    value(s) {
      return String.isString(s) && String.prototype.camelize.call(s);
    }
  },
  toBoolean: {
    configurable: true,
    enumerable: false,
    writable: true,
    value(s) {
      return String.isString(s) && String.prototype.toBoolean.call(s);
    }
  }
};
