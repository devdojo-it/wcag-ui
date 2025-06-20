export function exposeComponent(componentName, component) {
  // TODO: check if possibile to extract componentName from component
  Object.assign(self, { wcagUI: { ...self.wcagUI, [componentName]: component } });
}

// new wcagUI.Button();
