export function exposeComponent(component) {
  Object.assign(self, { wcagUI: { ...self.wcagUI, [component.name]: component } });
}

// new wcagUI.Button();
