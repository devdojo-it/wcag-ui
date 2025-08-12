/**
 * Exposes the component constructor on the global namespace:
 * `self.wcagUI[ComponentName] = Component`.
 *
 * This allows programmatic usage like: `new wcagUI.Button()`.
 * The function is idempotent and merges with the existing `wcagUI` bag.
 *
 * @param {CustomElementConstructor & { name: string }} component - The component class to expose.
 * @returns {void}
 */
export function exposeComponent(component) {
  Object.assign(self, { wcagUI: { ...self.wcagUI, [component.name]: component } });
}

// usage example: new wcagUI.Button();
