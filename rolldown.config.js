import { defineConfig } from 'rolldown';
import { minify } from 'rollup-plugin-swc3';

const rolldownPluginsConfig = [
  minify({
    module: true,
    // swc's minify option here
    mangle: {},
    compress: {},
  }),
];

export const buildRolldownConfig = (moduleName) => {
  return {
    input: `lib/${moduleName}.js`,
    output: {
      format: 'esm',
      file: `${moduleName}.min.js`,
    },
    // qualsiasi ID che corrisponde a queste regex viene escluso
    external: [
      '@wcag-ui/core',
      '@wcag-ui/dom',
      // se vuoi escludere TUTTO ciò che è @wcag-ui/ tranne il pacchetto stesso:
      // id => /^@wcag-ui\/(?!accordion$)/.test(id)
    ],
    plugins: rolldownPluginsConfig,
  };
};
