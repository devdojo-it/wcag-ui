export function exposeComponent(className, component) {
  // TODO: check if possibile to extract className from component
  Object.assign(self, { wcagUI: { ...self.wcagUI, [className]: component } });
}

// new wcagUI.Button();
