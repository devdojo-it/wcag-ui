/**
 * Creates a debounced version of a callback that delays invocation
 * until after `threshold` milliseconds have elapsed since the last call.
 *
 * @template {(...args: any[]) => any} F
 * @param {F} callback - Function to debounce.
 * @param {number} [threshold=300] - Delay in milliseconds.
 * @returns {(this: ThisType<F>, ...args: Parameters<F>) => void} Debounced function.
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
