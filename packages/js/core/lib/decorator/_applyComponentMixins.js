import { buildAttributeHandlers, buildEventHandlers } from "./_buildHandlers";
import { buildLifecycleMethods } from "./_buildLifecycleMethods";

export function applyMixinsToComponent(component) {
  Object.assign(
    component.prototype,
    { componentName: component.name },
    component.attributes && { ...buildAttributeHandlers(component.attributes) },
    component.events && { ...buildEventHandlers(component.events) },
    buildLifecycleMethods(component)
  );

  component.attributes &&
    Object.defineProperty(component, "observedAttributes", {
      get: () => Object.keys(component.attributes),
    });
}
