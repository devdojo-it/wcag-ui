import { strings } from "../helpers/_strings";

export function buildHandlers(attributesOrEvents, methodSuffix = "") {
  return Object.entries(attributesOrEvents).reduce((acc, item) => {
    acc[`handle${strings.pascalize(item[0])}${methodSuffix}`] = item[1];

    return acc;
  }, {});
}

export function buildEventHandlers(componentEvents) {
  return buildHandlers(componentEvents, "Event");
}

export function buildAttributeHandlers(componentAttributes) {
  return buildHandlers(componentAttributes, "AttributeChanged");
}
