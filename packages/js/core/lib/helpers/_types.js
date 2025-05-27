/*!
 * More accurately check the type of a JavaScript object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object} obj The object
 * @return {String} The object type
 */
const trueTypeOf = (obj) => Object.prototype.toString.call(obj).slice(8, -1);

const isNull = (any) => {
  return trueTypeOf(any) === 'Null';
};

const isUndefined = (any) => {
  return trueTypeOf(any) === 'Undefined';
};

const isNullOrUndefined = (any) => {
  return isNull(any) || isUndefined(any);
};

const isObject = (any) => {
  return trueTypeOf(any) === 'Object';
};

const isSymbol = (any) => {
  return trueTypeOf(any) === 'Symbol';
};

const isFunction = (any) => {
  return trueTypeOf(any) === 'Function';
};

const isBoolean = (any) => {
  return trueTypeOf(any) === 'Boolean';
};

const isNumber = (any) => {
  return trueTypeOf(any) === 'Number';
};

const isDate = (any) => {
  return trueTypeOf(any) === 'Date';
};

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
 * @param {any} any - the provided "something"
 * @return {boolean}
 */
const isString = (any) => {
  return trueTypeOf(any) === 'String';
};

const isRegExp = (any) => {
  return trueTypeOf(any) === 'RegExp';
};

const isArray = (any) => {
  return trueTypeOf(any) === 'Array';
};

const types = {
  trueTypeOf,
  isNull,
  isUndefined,
  isNullOrUndefined,
  isObject,
  isSymbol,
  isFunction,
  isBoolean,
  isNumber,
  isDate,
  isString,
  isRegExp,
  isArray,
};

export { types };
