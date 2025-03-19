export function buildLifecycleMethods(component) {
  return {
    handleEvent(e) {
      this[`handle${e.type.capitalize()}`](e);
    },
    attributeChangedCallback(name, oldValue, newValue) {
      this[`handle${name.pascalize()}Change`]?.(oldValue, newValue);

      this.onAttributeChanged instanceof Function && this.onAttributeChanged(name, oldValue, newValue);
    },
    connectedCallback() {
      for (const event of Object.keys(component.events)) {
        this.addEventListener(event, this);
      }

      this.onConnected instanceof Function && this.onConnected();
    },
    disconnectedCallback() {
      for (const event of Object.keys(component.events)) {
        this.removeEventListener(event, this);
      }

      this.onDisconnected instanceof Function && this.onDisconnected();
    },
  };
}
