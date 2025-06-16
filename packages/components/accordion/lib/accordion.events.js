import { events } from '@wcag-ui/core';

export default {
  'wcag-details.toggle': function (e) {
    // NOTE: this works only with <details is="wcag-details">
    // because native element doesn't bubble the `toggle` event

    events.dispatchComponentEvent.call(this, 'toggle', {});
  }
};
