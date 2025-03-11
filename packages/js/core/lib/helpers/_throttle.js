/**
 * Handles callback function throttling
 *
 * @param {Function} callback
 * @param {number} [threshold=300]
 * @return {Function} the throttled function
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
