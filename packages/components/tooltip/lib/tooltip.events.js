export default {
  mouseenter() {
    this.show();
  },
  mouseleave(event) {
    if (this.panel?.contains(event.relatedTarget)) {
      return;
    }

    this.hide();
  },
  focusin() {
    this.show();
  },
  focusout(event) {
    if (this.panel?.contains(event.relatedTarget)) {
      return;
    }

    this.hide();
  },
  keydown(event) {
    if (event.key !== 'Escape' || !this.isOpen) {
      return;
    }

    event.preventDefault();
    this.hide();
  },
};
