/*!
 * More accurately check the type of a JavaScript object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object} obj The object
 * @return {String} The object type
 */
export const trueTypeOf = (obj) => Object.prototype.toString.call(obj).slice(8, -1);

export const isNull = (any) => {
  return trueTypeOf(any) === "Null";
};

export const isUndefined = (any) => {
  return trueTypeOf(any) === "Undefined";
};

export const isNullOrUndefined = (any) => {
  return isNull(any) || isUndefined(any);
};

export const isObject = (any) => {
  return trueTypeOf(any) === "Object";
};

export const isSymbol = (any) => {
  return trueTypeOf(any) === "Symbol";
};

export const isFunction = (any) => {
  return trueTypeOf(any) === "Function";
};

export const isBoolean = (any) => {
  return trueTypeOf(any) === "Boolean";
};

export const isNumber = (any) => {
  return trueTypeOf(any) === "Number";
};

export const isDate = (any) => {
  return trueTypeOf(any) === "Date";
};

export const isString = (any) => {
  return trueTypeOf(any) === "String";
};

export const isRegExp = (any) => {
  return trueTypeOf(any) === "RegExp";
};

export const isArray = (any) => {
  return trueTypeOf(any) === "Array";
};
