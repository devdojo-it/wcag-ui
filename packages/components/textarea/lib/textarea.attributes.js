import { events } from '@wcag-ui/core';

export default {
  'aria-label': function (oldValue, newValue) {
    if (this.label) {
      const textContent = this.label.textContent;

      if (textContent !== newValue) {
        this.label.childNodes[0].textContent = newValue;

        events.dispatchComponentEvent.call(this, 'aria-label.change', { label: newValue });
      }
    }
  }
};
