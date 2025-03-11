export function buildLifecycleMethods(component) {
  return {
    handleEvent(e) {
      this[`on${e.type.capitalize()}`](e);
    },
    attributeChangedCallback(name, oldValue, newValue) {
      this[`on${name.capitalize()}Change`]?.(oldValue, newValue);
    },
    connectedCallback() {
      for (const event of Object.keys(component.events)) {
        this.addEventListener(event, this);
      }
    },
    disconnectedCallback() {
      for (const event of Object.keys(component.events)) {
        this.removeEventListener(event, this);
      }
    },
  };
}
