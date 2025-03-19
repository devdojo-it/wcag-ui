export default {
  disabled: function (oldValue, newValue) {
    if(!!newValue)
    console.log("disabled changed", oldValue, newValue, this.textContent);
  },
  // christian: function (oldValue, newValue) {
  //   console.log("christian changed", oldValue, newValue, this.textContent);
  // },
};
