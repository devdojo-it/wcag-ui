export default {
  "aria-label": function (oldValue, newValue) {
    if (this.label) {
      let textContent = this.label.textContent;

      if (textContent !== newValue) {
        this.label.childNodes[0].textContent = newValue;

        dispatchComponentEvent.call(this, "aria-label.change", { label: newValue });
      }
    }
  },
};
