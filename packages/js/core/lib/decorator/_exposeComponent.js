export function exposeComponent(component) {
  Object.assign(self, { wcagUI: { ...self.wcagUI, [component.name]: component } });
}

// usage example: new wcagUI.Button();
