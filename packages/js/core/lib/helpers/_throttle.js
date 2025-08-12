/**
 * Creates a throttled function that only invokes `callback` at most once
 * every `threshold` milliseconds.
 *
 * @template {(...args: any[]) => any} F
 * @param {F} callback - Function to throttle.
 * @param {number} [threshold=300] - Minimum delay between calls.
 * @returns {(this: ThisType<F>, ...args: Parameters<F>) => void} Throttled function.
 */
export function throttle(callback, threshold = 300) {
  let throttlePause;

  return (...args) => {
    if (throttlePause) return;

    throttlePause = true;

    setTimeout(() => {
      callback.apply(this, args);
      throttlePause = false;
    }, threshold);
  };
}
