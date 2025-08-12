/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <keeping unused params because of code readability> */

/**
 * Generate a random GUID
 *
 * @example <caption>eg. usage</caption>
 * const id = guid();
 * console.log(id); // 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'
 *
 * @return {string}
 */
function guid() {
  // TODO: check if necessary
  return `${Math.random().toString(16).slice(2, 10)}-${Math.random().toString(16).slice(2, 6)}-4${Math.random()
    .toString(16)
    .slice(2, 5)}-${Math.random().toString(16).slice(2, 6)}-${Math.random().toString(16).slice(2, 14)}`;
}

/**
 * Generate a random micro ID
 *
 * @example <caption>eg. usage</caption>
 * const id = microId();
 * console.log(id); // 'xxxxxxxx'
 *
 * const idPrefixed = microId('user');
 * console.log(idPrefixed); // 'user-xxxxxxxx'
 *
 * @param {string} prefix
 * @return {string}
 */
function microId(prefix) {
  return `${prefix ? `${prefix}-` : ''}${Math.random().toString(16).slice(2)}`;
}

/**
 * Strip emojis from a string
 *
 * @example <caption>eg. usage</caption>
 * stripEmojis('Hello 🌍');
 * // 'Hello '
 *
 * @param {string} s
 * @return {string}
 */
function stripEmojis(s) {
  return s
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      '',
    )
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Convert a string to capital case.
 *
 * @example <caption>eg. usage</caption>
 * const x = 'hi';
 *
 * console.log(toCapitalCase(x)); // Hi
 *
 * @param {string} s
 * @return {string}
 */
function toCapitalCase(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Convert a string to camel case.
 *
 * @example <caption>eg. usage</caption>
 * const x = 'hello world';
 *
 * console.log(toCamelCase(x)); // helloWorld
 *
 * @param {string} s
 * @return {string}
 */
function toCamelCase(s) {
  return s
    .replace(/[-_\s]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : '')) // Remove delimiters and capitalize the next letter
    .replace(/^(.)/, (match, chr) => chr.toLowerCase()); // Ensure the first letter is lowercase
}

/**
 * Convert a string to Pascal case.
 *
 * @example <caption>eg. usage</caption>
 * const x = 'hello world';
 *
 * console.log(toPascalCase(x)); // HelloWorld
 *
 * @param {string} s
 * @return {string}
 */
function toPascalCase(s) {
  return s.replace(/(^|-)([a-z])/g, (match, separator, letter) => letter.toUpperCase());
}

/**
 * Convert a string to kebab case.
 *
 * @example <caption>eg. usage</caption>
 * const x = 'hello world';
 *
 * console.log(toKebabCase(x)); // hello-world
 *
 * @param {string} s
 * @return {string}
 */
function toKebabCase(s) {
  return s
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Remove boundaries between lowercase and uppercase
    .replace(/[-_\s]+/g, '-') // Replace delimiters with a dash
    .toLowerCase(); // Convert everything to lowercase
}

/**
 * Convert a string to snake case.
 *
 * @example <caption>eg. usage</caption>
 * const x = 'hello world';
 *
 * console.log(toSnakeCase(x)); // hello_world
 *
 * @param {string} s
 * @return {string}
 */
function toSnakeCase(s) {
  return s
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Remove boundaries between lowercase and uppercase
    .replace(/[-_\s]+/g, '_') // Replace delimiters with an underscore
    .toLowerCase(); // Convert everything to lowercase
}

/**
 * Convert a string to a boolean.
 *
 * @example <caption>eg. usage</caption>
 * const x = 'true';
 *
 * console.log(toBoolean(x)); // true
 *
 * @param {string} s
 * @return {boolean|undefined}
 */
function toBoolean(s) {
  // TODO: handle returning undefined when string is not a boolean string ('true','false','0','1'...)
  return /^\s*(true|1|on|yes)\s*$/i.test(s);
}

const strings = {
  guid,
  microId,
  stripEmojis,
  toCapitalCase,
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  toBoolean,
};

export { strings };
