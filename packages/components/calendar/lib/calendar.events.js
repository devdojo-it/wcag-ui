export default {
  click(e) {
    const btn = e.target.closest('button[data-date]');
    if (btn && !btn.disabled) {
      this.selectDate(new Date(btn.dataset.date));
      return;
    }

    if (e.target.closest('.wcag-calendar__prev')) {
      this.prevMonth();
      return;
    }

    if (e.target.closest('.wcag-calendar__next')) {
      this.nextMonth();
    }
  },

  keydown(e) {
    const btn = e.target.closest('button[data-date]');
    if (!btn) return;

    const current = new Date(btn.dataset.date);
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
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() - current.getDay() + 1);
        break;
      case 'End':
        next = new Date(current.getFullYear(), current.getMonth(), current.getDate() + (7 - current.getDay()));
        break;
      case 'PageDown':
        next = new Date(current.getFullYear(), current.getMonth() + (e.shiftKey ? 12 : 1), current.getDate());
        break;
      case 'PageUp':
        next = new Date(current.getFullYear(), current.getMonth() - (e.shiftKey ? 12 : 1), current.getDate());
        break;
      default:
        return;
    }

    e.preventDefault();

    const y = next.getFullYear();
    const m = String(next.getMonth() + 1).padStart(2, '0');
    const d = String(next.getDate()).padStart(2, '0');
    const iso = `${y}-${m}-${d}`;

    // Navigate month if needed
    if (next.getMonth() !== current.getMonth() || next.getFullYear() !== current.getFullYear()) {
      this.value = iso;
    }

    const nextBtn = this.querySelector(`button[data-date="${iso}"]`);
    nextBtn?.focus();
  },
};
