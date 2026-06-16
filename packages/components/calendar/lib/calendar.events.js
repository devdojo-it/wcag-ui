export default {
  click(e) {
    const btn = e.target.closest('button[data-date]');
    if (btn && !btn.disabled) {
      this.selectDate(new Date(btn.dataset.date));
      return;
    }

    if (e.target.closest('button[previous-month]')) {
      this.prevMonth();
      return;
    }

    if (e.target.closest('button[next-month]')) {
      this.nextMonth();
    }
  },

  keydown(e) {
    const btn = e.target.closest('button[data-date]');
    if (!btn) return;

    const current = new Date(btn.dataset.date);
    const weekdayIndex = current.getDay() === 0 ? 6 : current.getDay() - 1;
    let next = null;

    switch (e.key) {
      case 'ArrowRight':
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
        break;
      case 'ArrowLeft':
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 1);
        break;
      case 'ArrowDown':
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 7);
        break;
      case 'ArrowUp':
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 7);
        break;
      case 'Home':
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - weekdayIndex);
        break;
      case 'End':
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + (6 - weekdayIndex));
        break;
      case 'PageDown':
        next = new Date(current.getFullYear(), current.getMonth() + (e.shiftKey ? 12 : 1), current.getDate());
        break;
      case 'PageUp':
        next = new Date(current.getFullYear(), current.getMonth() - (e.shiftKey ? 12 : 1), current.getDate());
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.selectDate(current);
        return;
      default:
        return;
    }

    e.preventDefault();
    this.focusDate(next);
  },
};
