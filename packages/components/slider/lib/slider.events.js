import { events } from '@wcag-ui/core';

export default {
  input: function (e) {
    events.dispatchComponentEvent.call(this, 'input', { value: this.value }, e);
  },
  change: function (e) {
    events.dispatchComponentEvent.call(this, 'change', { value: this.value }, e);
  },
};
