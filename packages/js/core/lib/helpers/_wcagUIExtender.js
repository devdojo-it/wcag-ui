export const wcagUIExtender = (mixins) => {
  const self = self || window;

  Object.assign(self, { wcagUI: { ...self.wcagUI, ...mixin } });
};
