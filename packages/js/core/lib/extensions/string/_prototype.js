export default {
  /**
   * Capitalizes a string
   *
   * @example <caption>eg. usage</caption>
   * const x = 'hi';
   *
   * console.log(x); // hi
   * console.log(x.capitalize()); // Hi
   * @memberOf string
   * @method capitalize()
   * @return {string}
   */
  capitalize: {
    value() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
  },
  camelize: {
    value() {
      return this.toLowerCase() // Convertiamo tutto in minuscolo
        .replace(/[-_\s]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : '')) // Rimuoviamo delimitatori e capitalizziamo la lettera successiva
        .replace(/^(.)/, (match, chr) => chr.toLowerCase()); // Assicuriamo che la prima lettera sia minuscola
    },
  },
  pascalize: {
    value() {
      return this.replace(/(^|-)([a-z])/g, (match, separator, letter) => letter.toUpperCase());
    },
  },
  stripEmojis: {
    value() {
      return this.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
      )
        .replace(/\s+/g, ' ')
        .trim();
    },
  },
  toBoolean: {
    value() {
      // TODO: handle returning undefined when this is not a boolean string ('true','false','0','1'...)
      return /^\s*(true|1|on|yes)\s*$/i.test(this);
    },
  },
};
