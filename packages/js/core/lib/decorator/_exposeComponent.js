export function exposeComponent(componentName, componentIdentifier) {
  // TODO: check if possibile to extract componentName from component
  Object.assign(self, { wcagUI: { ...self.wcagUI, [componentName]: componentIdentifier } });
}
