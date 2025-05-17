import { buildAttributeHandlers, buildEventHandlers } from "./_buildHandlers";
import { buildLifecycleMethods } from "./_buildLifecycleMethods";

export function applyMixins(componentIdentifier) {
  Object.assign(
    componentIdentifier.prototype,
    { componentName: componentIdentifier.name },
    componentIdentifier.attributes && { ...buildAttributeHandlers(componentIdentifier.attributes) },
    componentIdentifier.events && { ...buildEventHandlers(componentIdentifier.events) },
    buildLifecycleMethods(componentIdentifier)
  );

  componentIdentifier.attributes &&
    Object.defineProperty(componentIdentifier, "observedAttributes", {
      get: () => Object.keys(componentIdentifier.attributes),
    });
}
