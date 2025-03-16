import { isObject, isString } from "../helpers/_types";

const base64 = {
  /**
   * encodes a string in base64
   *
   * @param {string} s - the given string
   * @return {string}
   */
  encode: (s) => {
    if (!isString(s)) {
      throw new Error("@wcag-js/core error, encodeBase64: the provided parameter is not a valid string");
    }

    return btoa(encodeURIComponent(s));
  },
  /**
   * decodes a string in base64
   *
   * @param {string} s - the given string
   * @return {string}
   */
  decode: (s) => {
    if (!isString(s)) {
      throw new Error("@wcag-js/core error, decodeBase64: the provided parameter is not a valid string");
    }

    return decodeURIComponent(atob(s));
  },
  /**
   * stringifies an Object in JSON and encodes it in base64
   *
   * @param {object} o - the given object
   * @return {string}
   */
  fromJSON: (o) => {
    if (!isObject(o)) {
      throw new Error("@wcag-js/core error, base64.fromJSON: the provided parameter is not a valid object");
    }
    return encodeBase64(JSON.stringify(o));
  },
  /**
   * decodes a base64 string into a Json parsed object
   *
   * @param {string} s - the given string
   * @return {object}
   */
  toJSON: (s) => {
    if (!isString(s)) {
      throw new Error("@wcag-js/core error, base64ToJson: the provided parameter is not a valid string");
    }

    return JSON.parse(decodeBase64(s));
  },
};

export { base64 };

// console.log(
//   "encodeBase64",
//   encodeBase64("Hello, world!"),
//   encodeBase64("Hello, world!") === "SGVsbG8lMkMlMjB3b3JsZCE="
// );

// console.log(
//   "decodeBase64",
//   decodeBase64("SGVsbG8lMkMlMjB3b3JsZCE="),
//   decodeBase64("SGVsbG8lMkMlMjB3b3JsZCE=") === "Hello, world!"
// );

// console.log(
//   "jsonToBase64",
//   jsonToBase64({ hello: "world" }),
//   jsonToBase64({ hello: "world" }) === "JTdCJTIyaGVsbG8lMjIlM0ElMjJ3b3JsZCUyMiU3RA=="
// );
