/**
 * decodes a base64 string into a Json parsed object
 *
 * @param {string} s - the given string
 * @return {object}
 */
export function debounce(callback, threshold = 300) {
  let debounce;
  
  return (...args) => {
    clearTimeout(debounce);

    debounce = setTimeout(() => {
      callback.apply(this, args);
    }, threshold);
  };
}
