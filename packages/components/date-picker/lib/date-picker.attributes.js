export default {
  value(_oldValue, newValue) {
    this.value = newValue ?? '';
    this.isOpen && this.update();
  },
  min() {
    this.isOpen && this.update();
  },
  max() {
    this.isOpen && this.update();
  },
  locale() {
    this.isOpen && this.update();
  },
  'aria-label'(_oldValue, newValue) {
    const input = this.querySelector(':scope > input');
    if (input && !input.hasAttribute('aria-labelledby')) {
      input.setAttribute('aria-label', newValue || 'Date');
    }
  },
};
