/**
 * returns true if the provided string contains HTML tags
 *
 * @param {string} str
 * @return {boolean}
 */
export const containsHTML = (str) => /<[a-z][\s\S]*>/i.test(str);
