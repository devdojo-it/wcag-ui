/**
 * returns true if the provided string contains HTML tags
 *
 * @param {Event} e - the event
 * @param {boolean} [preventDefault=true] - enable/disable preventDefault
 * @param {boolean} [stopPropagation=true] - enable/disable stopPropagation
 * @param {boolean} [stopImmediatePropagation=true] - enable/disable stopImmediatePropagation
 * @return {boolean|undefined}
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
