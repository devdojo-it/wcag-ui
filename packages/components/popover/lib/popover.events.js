export default {
  click(event) {
    const dismissButton = event.target.closest('button[dismiss]');

    if (dismissButton && this.panel?.contains(dismissButton)) {
      this.hide();
      return;
    }

    const trigger = event.target.closest('button[popover-trigger]');

    if (trigger !== this.trigger || this.supportsPopover) {
      return;
    }

    event.preventDefault();
    this.toggle();
  },
  keydown(event) {
    if (event.key !== 'Escape' || !this.isOpen || this.supportsPopover) {
      return;
    }

    event.preventDefault();
    this.hide();
  },
};
