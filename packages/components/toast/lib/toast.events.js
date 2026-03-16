export default {
  click(e) {
    if (e.target.closest('.wcag-toast__close')) {
      this.dismiss();
    }
  },
};
