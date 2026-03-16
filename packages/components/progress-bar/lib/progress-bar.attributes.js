export default {
  value: function (_oldValue, newValue) {
    const clamped = Math.max(0, Math.min(100, Number(newValue ?? 0)));
    this.setAttribute('aria-valuenow', String(clamped));
    this.style.setProperty('--wcag-progress-bar--value', `${clamped}%`);
  },
};
