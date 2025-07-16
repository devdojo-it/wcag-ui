import { events } from '@wcag-ui/core';

export default {
  open: function (_oldValue, newValue) {
    const state = newValue === null ? 'close' : 'open';
    this.setAttribute('aria-expanded', (state === 'open').toString());

    events.dispatchComponentEvent.call(this, 'toggle', { state });
  },
};
