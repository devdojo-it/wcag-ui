export function buildExtendOptions(mixins) {
  return mixins.extends ? { extends: mixins.extends } : undefined;
}
