export default {
  click: function (_e) {
    console.log('button clicked', this.textContent);
  },
  focus: function (_e) {
    console.log('button focused', this.textContent);
  },
};

