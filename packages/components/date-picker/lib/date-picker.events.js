export default {
  click(e) {
    if (e.target.closest('button[toggle]')) {
      this.toggle();
      return;
    }
    if (this.querySelector(':scope > section[dropdown]:not([hidden])')) {
      this._handleCalendarClick(e);
    }
  },

  keydown(e) {
    const input = this.querySelector(':scope > input[role="combobox"]');
    const dropdown = this.querySelector(':scope > section[dropdown]:not([hidden])');

    if (e.target === input) {
      if ((e.key === 'ArrowDown' || (e.altKey && e.key === 'ArrowDown')) && !this.isOpen) {
        e.preventDefault();
        this.open();
        return;
      }

      if (e.key === 'ArrowDown' && this.isOpen) {
        e.preventDefault();
        const selected =
          dropdown?.querySelector('button[aria-selected="true"]') || dropdown?.querySelector('button[data-date]');
        selected?.focus();
        return;
      }
    }

    if ((e.key === 'Escape' || (e.altKey && e.key === 'ArrowUp')) && dropdown) {
      e.preventDefault();
      this.close();
      return;
    }

    this._handleCalendarKeydown(e);
  },

  focusout() {
    if (!this.isOpen) return;

    requestAnimationFrame(() => {
      if (!this.contains(document.activeElement)) {
        this.close(false);
      }
    });
  },
};
