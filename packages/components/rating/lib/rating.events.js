export default {
  click(event) {
    const button = event.target.closest('button[rating-option]');

    if (!button || this.isReadonly) {
      return;
    }

    this.selectValue(button.getAttribute('data-value'));
  },
  keydown(event) {
    const buttons = [...this.querySelectorAll(':scope > button[rating-option]')];
    const currentIndex = buttons.findIndex((button) => button === event.target);

    if (currentIndex === -1 || this.isReadonly) {
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = Math.min(buttons.length - 1, currentIndex + 1);
      this.selectValue(nextIndex + 1);
      this.focusOption(nextIndex);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = Math.max(0, currentIndex - 1);
      this.selectValue(nextIndex + 1);
      this.focusOption(nextIndex);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.selectValue(1);
      this.focusOption(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.selectValue(buttons.length);
      this.focusOption(buttons.length - 1);
      return;
    }

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.selectValue(currentIndex + 1);
    }
  },
};
