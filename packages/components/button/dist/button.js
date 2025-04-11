require('./button.css');
var $bwPs6$wcaguicore = require('@wcag-ui/core');
function $parcel$export(t, e, c, o) {
  Object.defineProperty(t, e, { get: c, set: o, enumerable: !0, configurable: !0 });
}
$parcel$export(module.exports, 'Button', () => $f531df144c71944f$export$353f5b6fc5456de1);
var $4bb28474cde9d688$export$2e2bcd8739ae039 = {
    disabled: function (t, e) {
      e && console.log('disabled changed', t, e, this.textContent);
    },
  },
  $5b705c25dbd4d599$export$2e2bcd8739ae039 = {
    click: function (t) {
      console.log('button clicked', this.textContent);
    },
  };
class $f531df144c71944f$export$353f5b6fc5456de1 extends HTMLButtonElement {
  static name = 'wcag-button';
  static extends = 'button';
  static attributes = $4bb28474cde9d688$export$2e2bcd8739ae039;
  static events = $5b705c25dbd4d599$export$2e2bcd8739ae039;
  static {
    (0, $bwPs6$wcaguicore.componentDecorator)('Button', $f531df144c71944f$export$353f5b6fc5456de1);
  }
  constructor() {
    super(), this.#t();
  }
  #t() {
    this.hasAttribute('type') || this.setAttribute('type', 'button'),
      this.hasAttribute('role') || this.setAttribute('role', 'button');
  }
}
