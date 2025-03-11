export default {
  disabled: function (oldValue, newValue) {
    console.log("disabled changed", oldValue, newValue, this.textContent);
  },
  christian: function (oldValue, newValue) {
    console.log("christian changed", oldValue, newValue, this.textContent);
  },
};
