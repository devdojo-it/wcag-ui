export default {
  value: function () {
    const min = Number(this.min || 0);
    const max = Number(this.max || 100);
    const val = Number(this.value || 0);
    const pct = ((val - min) / (max - min)) * 100;
    this.style.setProperty('--wcag-slider--fill', `${pct}%`);
  },
};
