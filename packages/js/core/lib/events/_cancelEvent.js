/**
 * Cancels a DOM event by optionally calling preventDefault, stopPropagation,
 * and stopImmediatePropagation.
 *
 * Returns `false` for ergonomic usage inside handlers (e.g., `return cancelEvent(e)`).
 * If no event is provided, returns `undefined`.
 *
 * @param {Event} e - The DOM event to cancel.
 * @param {boolean} [preventDefault=true] - Whether to call `e.preventDefault()`.
 * @param {boolean} [stopPropagation=true] - Whether to call `e.stopPropagation()`.
 * @param {boolean} [stopImmediatePropagation=true] - Whether to call `e.stopImmediatePropagation()`.
 * @returns {false|undefined}
 */
export const cancelEvent = (
  e,
  preventDefault = true,
  stopPropagation = true,
  stopImmediatePropagation = true
) => {
  if (!e) {
    return;
  }

  !!preventDefault && e.preventDefault();
  !!stopPropagation && e.stopPropagation();
  !!stopImmediatePropagation && e.stopImmediatePropagation();

  return false;
};
