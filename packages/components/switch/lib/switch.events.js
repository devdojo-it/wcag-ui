import { events } from '@wcag-ui/core';

export default {
  switch: function (e) {
    console.log('switch emitted input', this.ariaLabel);

    // style :user-invalid or :user-valid

    events.dispatchComponentEvent.call(this, 'switch', { value: this.value }, e);
  },
  change: function (e) {
    console.log('switch emitted change', this.ariaLabel);

    // style :user-invalid or :user-valid

    events.dispatchComponentEvent.call(this, 'change', { value: this.value }, e);
  },
  focus: function (e) {
    console.log('switch emitted focus', this.ariaLabel);

    events.dispatchComponentEvent.call(this, 'focus', { value: this.value }, e);
  },
  blur: function (e) {
    console.log('switch emitted blur', this.ariaLabel);

    events.dispatchComponentEvent.call(this, 'blur', { value: this.value }, e);
  },
  invalid: function (e) {
    console.log('switch emitted invalid', this.ariaLabel);

    // style :user-invalid or :user-valid

    events.dispatchComponentEvent.call(this, 'invalid', { value: this.value }, e);
  },
};
