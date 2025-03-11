export function buildHandlers(attributesOrEvents, methodSuffix = "") {
  return Object.entries(attributesOrEvents).reduce((acc, item) => {
    acc[`on${item[0].capitalize()}${methodSuffix}`] = item[1];

    return acc;
  }, {});
}

export function buildEventHandlers(componentEvents) {
  return buildHandlers(componentEvents);
}

export function buildAttributeHandlers(componentAttributes) {
  return buildHandlers(componentAttributes, "Change");
}
