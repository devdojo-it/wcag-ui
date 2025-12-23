export default {
  disabled: function (oldValue, newValue) {
    console.log('disabled changed', oldValue, newValue, this.textContent);
  }
};
