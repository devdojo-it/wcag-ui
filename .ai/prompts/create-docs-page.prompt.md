# Create Documentation Page

## Prompt

Create a new documentation page for the `<ComponentName>` component.

Follow these steps:

1. Create `src/components-<kebab>.html` with this structure:

```html
<extends src="_layout.html" locals='{"title": "Docs"}'>
  <block name="aside">
    <include src="common/docs-nav.html"></include>
  </block>
  <block name="main">
    <h1><PascalName> Docs Example</h1>
    <section>
      <h2>Usage</h2>
      <pre><code><!-- code example --></code></pre>
    </section>
    <section>
      <h2>Variants</h2>
      <p><!-- live demo --></p>
    </section>
  </block>
</extends>
```

2. Verify the link exists in `src/common/docs-nav.html`
3. Verify the component is listed in `docs/COMPONENTS.md`
4. Create `docs/<PascalCase>/<PascalCase>.md` with WCAG-focused documentation
