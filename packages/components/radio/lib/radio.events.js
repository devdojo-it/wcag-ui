import { events } from '@wcag-ui/core';

export default {
  input: function (e) {
    console.log('radio emitted input', this.ariaLabel);

    // style :user-invalid or :user-valid

    events.dispatchComponentEvent.call(this, 'input', { value: this.value }, e);
  },
  change: function (e) {
    console.log('radio emitted change', this.ariaLabel);

    // style :user-invalid or :user-valid

    events.dispatchComponentEvent.call(this, 'change', { value: this.value }, e);
  },
  focus: function (e) {
    console.log('radio emitted focus', this.ariaLabel);

    events.dispatchComponentEvent.call(this, 'focus', { value: this.value }, e);
  },
  blur: function (e) {
    console.log('radio emitted blur', this.ariaLabel);

    events.dispatchComponentEvent.call(this, 'blur', { value: this.value }, e);
  },
  invalid: function (e) {
    console.log('radio emitted invalid', this.ariaLabel);

    // style :user-invalid or :user-valid

    events.dispatchComponentEvent.call(this, 'invalid', { value: this.value }, e);
  },
};
