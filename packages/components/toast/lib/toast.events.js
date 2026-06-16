export default {
  click(e) {
    if (e.target.closest('button[dismiss]')) {
      this.dismiss();
    }
  },
};
