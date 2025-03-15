export function buildHandlers(attributesOrEvents, methodSuffix = "") {
  return Object.entries(attributesOrEvents).reduce((acc, item) => {
    acc[`handle${item[0].pascalize()}${methodSuffix}`] = item[1];

    return acc;
  }, {});
}

export function buildEventHandlers(componentEvents) {
  return buildHandlers(componentEvents);
}

export function buildAttributeHandlers(componentAttributes) {
  return buildHandlers(componentAttributes, "Change");
}
