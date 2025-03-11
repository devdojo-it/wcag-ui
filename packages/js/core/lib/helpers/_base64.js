import { isObject, isString } from "./_trueTypeOf";

/**
 * encodes a string in base64
 *
 * @param {string} s - the given string
 * @return {string}
 */
export const encodeBase64 = (s) => {
  if (!isString(s)) {
    throw new Error(
      "@wcag-js/core error, encodeBase64: the provided parameter is not a valid string"
    );
  }

  return btoa(encodeURIComponent(s));
};

/**
 * decodes a string in base64
 *
 * @param {string} s - the given string
 * @return {string}
 */
export const decodeBase64 = (s) => {
  if (!isString(s)) {
    throw new Error(
      "@wcag-js/core error, decodeBase64: the provided parameter is not a valid string"
    );
  }

  return decodeURIComponent(atob(s));
};

/**
 * stringifies an Object in JSON and encodes it in base64
 *
 * @param {object} o - the given object
 * @return {string}
 */
export const jsonToBase64 = (o) => {
  if (!isObject(o)) {
    throw new Error(
      "@wcag-js/core error, jsonToBase64: the provided parameter is not a valid object"
    );
  }
  return encodeBase64(JSON.stringify(o));
};

/**
 * decodes a base64 string into a Json parsed object
 *
 * @param {string} s - the given string
 * @return {object}
 */
export const base64ToJson = (s) => {
  if (!isString(s)) {
    throw new Error(
      "@wcag-js/core error, base64ToJson: the provided parameter is not a valid string"
    );
  }

  return JSON.parse(decodeBase64(s));
};
