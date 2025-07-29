
export default {
  /** @this {import('./calendar.js').Calendar} */
  click(event) {
    const changeViewBtn = event.target.closest('button[data-view]');
    if (changeViewBtn) {
      this.startView = changeViewBtn.dataset.view;
    }
  }
};
