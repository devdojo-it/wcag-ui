export function guid() {
  // TODO: check if necessary
  return `${Math.random().toString(16).slice(2, 10)}-${Math.random().toString(16).slice(2, 6)}-4${Math.random()
    .toString(16)
    .slice(2, 5)}-${Math.random().toString(16).slice(2, 6)}-${Math.random().toString(16).slice(2, 14)}`;
}

/**
 * Capitalizes a string
 *
 * @example <caption>eg. usage</caption>
 * const x = 'hi';
 *
 * console.log(capitalize(x)); // Hi
 * @memberOf string
 * @method capitalize()
 * @return {string}
 */
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @param {string} string
 */
export function camelize(string) {
  return string
    .toLowerCase() // Convertiamo tutto in minuscolo
    .replace(/[-_\s]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : '')) // Rimuoviamo delimitatori e capitalizziamo la lettera successiva
    .replace(/^(.)/, (match, chr) => chr.toLowerCase()); // Assicuriamo che la prima lettera sia minuscola
}

/**
 * @param {string} string
 */
export function pascalize(string) {
  return string.replace(/(^|-)([a-z])/g, (match, separator, letter) => letter.toUpperCase());
}

/**
 * @param {string} string
 */
export function stripEmojis(string) {
  return string
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    )
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * @param {string} string
 */
export function toBoolean(string) {
  // TODO: handle returning undefined when string is not a boolean string ('true','false','0','1'...)
  return /^\s*(true|1|on|yes)\s*$/i.test(string);
}
