import { dispatchComponentEvent } from '@wcag-ui/core';

export default {
  input: function (e) {
    console.log("input emitted input", this.ariaLabel);
    // this.updateValidity();

    dispatchComponentEvent.call(this, "input", { value: this.value }, e);
  },
  change: function (e) {
    console.log("input emitted change", this.ariaLabel);

    // this.updateValidity();

    dispatchComponentEvent.call(this, "change", { value: this.value }, e);
  },
  focus: function (e) {
    console.log("input emitted focus", this.ariaLabel);

    dispatchComponentEvent.call(this, "focus", { value: this.value }, e);
  },
  blur: function (e) {
    console.log("input emitted blur", this.ariaLabel);

    dispatchComponentEvent.call(this, "blur", { value: this.value }, e);
  },
  invalid: function (e) {
    console.log("input emitted invalid", this.ariaLabel);

    // this.updateValidity();

    dispatchComponentEvent.call(this, "invalid", { value: this.value }, e);
  },
};
