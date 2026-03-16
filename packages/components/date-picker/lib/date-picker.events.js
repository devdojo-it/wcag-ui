export default {
  click(e) {
    if (e.target.closest('.wcag-date-picker__toggle')) {
      this.toggle();
      return;
    }
    if (this.querySelector('.wcag-date-picker__dropdown:not([hidden])')) {
      this._handleCalendarClick(e);
    }
  },

  keydown(e) {
    if (e.key === 'Escape' && this.querySelector('.wcag-date-picker__dropdown:not([hidden])')) {
      e.preventDefault();
      this.close();
      return;
    }
    this._handleCalendarKeydown(e);
  },
};
