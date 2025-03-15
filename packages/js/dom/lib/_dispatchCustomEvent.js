/**
 * dispatches a CustomEvent according to the params
 *
 * @param {string} eventNamespace - the namespace of the event
 * @param {string} eventName - the event name
 * @param {object} [detail={}] - the data to be passed as CustomEvent detail
 * @param {Event} [originalEvent=undefined] - the original DOM event to be added to the CustomEvent detail
 * @param {EventTarget} [dispatcher=undefined] - pass an EventTarget (Node, Elements, ...) in order to override the dispatcher
 */
export const dispatchCustomEvent = function (
  eventNamespace,
  eventName,
  detail = {},
  originalEvent = undefined,
  dispatcher = undefined
) {
  dispatcher = dispatcher ?? this ?? self;

  const event = new CustomEvent(`${eventNamespace}.${eventName}`, {
    bubbles: true,
    cancelable: true,
    detail: {
      ...detail,
      ...(originalEvent && { originalEvent }),
    },
  });

  console.log(`CustomEvent emitted: ${eventNamespace}.${eventName}`);

  dispatcher.dispatchEvent(event);
};
