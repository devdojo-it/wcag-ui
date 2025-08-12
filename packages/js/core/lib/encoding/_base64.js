import { types } from "../helpers/_types";

const base64 = {
  /**
   * Encodes a string in Base64 (URL-safe handling via encodeURIComponent before btoa).
   *
   * @param {string} s - The input string.
   * @returns {string}
   */
  encode: (s) => {
    if (!types.isString(s)) {
      throw new Error("@wcag-js/core error, encodeBase64: the provided parameter is not a valid string");
    }

    return btoa(encodeURIComponent(s));
  },
  /**
   * Decodes a Base64 string back to plain text.
   *
   * @param {string} s - The Base64-encoded string.
   * @returns {string}
   */
  decode: (s) => {
    if (!types.isString(s)) {
      throw new Error("@wcag-js/core error, decodeBase64: the provided parameter is not a valid string");
    }

    return decodeURIComponent(atob(s));
  },
  /**
   * Stringifies an object in JSON and encodes it in Base64.
   *
   * @param {object} o - The input object.
   * @returns {string}
   */
  fromJSON: (o) => {
    if (!types.isObject(o)) {
      throw new Error("@wcag-js/core error, base64.fromJSON: the provided parameter is not a valid object");
    }
    return base64.encode(JSON.stringify(o));
  },
  /**
   * Decodes a Base64 string and parses it as JSON.
   *
   * @param {string} s - The Base64-encoded JSON string.
   * @returns {object}
   */
  toJSON: (s) => {
    if (!types.isString(s)) {
      throw new Error("@wcag-js/core error, base64ToJson: the provided parameter is not a valid string");
    }

    return JSON.parse(base64.decode(s));
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
