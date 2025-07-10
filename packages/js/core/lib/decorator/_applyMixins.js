import { buildAttributeHandlers, buildEventHandlers } from './_buildHandlers';
import { buildLifecycleMethods } from './_buildLifecycleMethods';

export function applyMixins(component) {
  Object.assign(
    component.prototype,
    { componentName: component.componentName },
    component.attributes && { ...buildAttributeHandlers(component.attributes) },
    component.events && { ...buildEventHandlers(component.events) },
    buildLifecycleMethods(component)
  );

  component.attributes && (component.observedAttributes = Object.keys(component.attributes));
}
