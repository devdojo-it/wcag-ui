# HTML Conventions — wcag-ui

## Templating (PostHTML)

The documentation site uses **PostHTML** with 3 mechanisms:

### Layout inheritance (`<extends>` + `<block>`)

```html
<extends src="_layout.html" locals='{"title": "Docs"}'>
  <block name="aside">
    <include src="common/docs-nav.html"></include>
  </block>
  <block name="main">
    <h1>Page Title</h1>
    <!-- content -->
  </block>
</extends>
```

The `_layout.html` layout defines 3 overridable blocks:

| Block | Default | Typical usage |
|-------|---------|-----------|
| `aside` | Empty | Includes the `docs-nav.html` |
| `main` | Empty | Page content |
| `scroll-spy` | Active scroll-spy | Empty (to disable it, e.g. homepage) |

### Include (`<include>`)

```html
<include src="common/header.html"></include>
<include src="common/footer.html"></include>
```

### Markdown inline (`<md>`)

```html
<md src="./docs/COMPONENTS.md"></md>
```

## Customized Built-in Elements (`is="wcag-*"`)

wcag-ui components **extend** native HTML elements via the `is` attribute:

```html
<!-- Button -->
<button is="wcag-button">Label</button>

<!-- Input -->
<input is="wcag-input" type="email" aria-label="Email" />

<!-- Checkbox -->
<input is="wcag-checkbox" aria-label="Accept terms" />

<!-- Radio -->
<input is="wcag-radio" name="gruppo" aria-label="Option A" />

<!-- Switch -->
<input is="wcag-switch" aria-label="Dark mode" />

<!-- Textarea -->
<textarea is="wcag-textarea" aria-label="Comment"></textarea>

<!-- Select -->
<select is="wcag-select" aria-label="Country">
  <option>Italia</option>
</select>

<!-- Details -->
<details is="wcag-details">
  <summary>Title</summary>
  Disclosure content
</details>

<!-- Dialog -->
<dialog is="wcag-dialog">Modal content</dialog>

<!-- Tooltip -->
<span is="wcag-tooltip">Text with tooltip</span>

<!-- Accordion (composes details) -->
<section is="wcag-accordion" name="accordion-1">
  <details is="wcag-details">
    <summary>Section 1</summary>
    Content 1
  </details>
  <details is="wcag-details">
    <summary>Section 2</summary>
    Content 2
  </details>
</section>

<!-- Tree View -->
<section is="wcag-tree-view">
  <!-- tree content -->
</section>

<!-- Scroll Spy -->
<section is="wcag-scroll-spy" target="main"></section>
```

## Variant Attributes

Variants are expressed as **valueless boolean attributes** (not CSS classes):

```html
<!-- Dimensions: sm, lg (default = medium, no attribute) -->
<button is="wcag-button" sm>Small</button>
<button is="wcag-button">Medium (default)</button>
<button is="wcag-button" lg>Large</button>

<!-- Color variant: secondary, tertiary, destructive (default = primary) -->
<button is="wcag-button" secondary>Secondary</button>
<button is="wcag-button" tertiary>Tertiary</button>
<button is="wcag-button" destructive>Destructive</button>

<!-- Modifiers: circle, square -->
<button is="wcag-button" circle><i class="wcag-icon-plus"></i></button>

<!-- Combinations -->
<button is="wcag-button" secondary sm>Small Secondary</button>
```

## Accessibility — Required HTML Patterns

### `aria-label` Required for Standalone Form Controls

When an input does not have an explicit visible `<label>`, use `aria-label`:

```html
<input is="wcag-checkbox" aria-label="Accept terms" />
<input is="wcag-switch" aria-label="Active notifications" />
<input is="wcag-radio" name="formato" aria-label="PDF" />
<input is="wcag-input" type="text" aria-label="Username" />
```

The JS component automatically transforms `aria-label` into a visible `<label>` by wrapping the element.

### `aria-disabled` for Disabled State

```html
<input is="wcag-checkbox" aria-disabled="true" />
<button is="wcag-button" disabled>Disabled</button>
```

### `sr-only` for Screen Reader Only Content

```html
<span sr-only>Text visible only to screen readers</span>
```

### External Links

```html
<a href="https://..." target="_blank" rel="noopener noreferrer">External link</a>
```

### Semantic Landmarks

```html
<header><!-- banner --></header>
<nav><!-- main navigation --></nav>
<aside nav><!-- sidebar navigation --></aside>
<main><!-- main content --></main>
<aside scroll-spy><!-- side index --></aside>
<footer><!-- footer --></footer>
```

### Breadcrumbs

```html
<nav aria-label="breadcrumb">
  <ul>
    <li><a href="/docs">Documentation</a></li>
    <li>Current page</li>
  </ul>
</nav>
```

## Structural Custom Attributes

The project uses valueless custom HTML attributes as markers/selectors:

```html
<aside nav>            <!-- navigation sidebar -->
<aside scroll-spy>     <!-- scroll spy sidebar -->
<a logo href="/">      <!-- logo -->
<section credits>      <!-- credits section -->
<section links>        <!-- links section -->
<menu color-scheme>    <!-- scheme switcher menu -->
```

## Icons

Icons via icon font with CSS classes:

```html
<i class="wcag-icon-chevron-down"></i>
<i class="wcag-icon-github"></i>
<i class="wcag-icon-wcag-ui"></i>
<i class="wcag-icon-scheme-system"></i>
```

## Component Page Structure

```html
<extends src="_layout.html" locals='{"title": "Docs"}'>
  <block name="aside">
    <include src="common/docs-nav.html"></include>
  </block>
  <block name="main">
    <h1>{PascalName} Docs Example</h1>

    <section>
      <h2>Usage</h2>
      <pre><code>...</code></pre>
    </section>

    <section>
      <h2>Primary</h2>
      <p>
        <!-- live component demos -->
        <button is="wcag-button" lg>Large</button>
        <button is="wcag-button">Medium</button>
        <button is="wcag-button" sm>Small</button>
      </p>
    </section>
  </block>
</extends>
```

## Heading Hierarchy

| Level | Usage |
|---------|-----|
| `h1` | Page title (one per page) |
| `h2` | Main sections of the demo/documentation |
| `h3` | Subsections |
| `h5` | Footer titles |

## CSS and JS in Layout

```html
<head>
  <!-- Preload font -->
  <link rel="preload" href="npm:@wcag-ui/iconography/.../wcag-icons.woff" as="font" ... />
  <link rel="preload" href="npm:@wcag-ui/typography/.../Inter.woff2" as="font" ... />
  <!-- Single CSS entry point -->
  <link rel="stylesheet" href="./styles/index.css" />
</head>
<body>
  <!-- content -->
  <!-- JS entry point at end of body -->
  <script type="module" src="./scripts/index.js"></script>
</body>
```

## Grid System

```html
<container>
  <row>
    <col size="6 md-8 lg-4">Column</col>
    <col size="6 md-4 lg-8">Column</col>
  </row>
</container>
```

The `size` attribute accepts space-separated values: `<cols> <bp>-<cols> <bp>-<cols>`.

## Flex Helper

```html
<div flex="center wrap gap-400">
  <!-- centered, wrapped flex content with gap -->
</div>
```

## HTML Void Elements

Self-closing required (Biome setting):

```html
<input />
<br />
<hr />
<img />
```

## Anti-Patterns to Avoid

- ❌ Do not use `class` to select components → use the `is` attribute
- ❌ Do not use `<div>` when an appropriate semantic element exists
- ❌ Do not omit `aria-label` on standalone form controls
- ❌ Do not use `target="_blank"` without `rel="noopener noreferrer"`
- ❌ Do not create multiple `<h1>` elements on the same page
- ❌ Do not use non-standard tags as standalone elements (use attributes on native elements)

---

## General HTML Best Practices

The following conventions complement the project-specific patterns above with broader HTML standards.

### Semantic HTML

Semantic HTML elements tell developers, browsers, screen readers, and search engines exactly what the element does and what kind of content it should contain. This improves code readability, accessibility (A11y), and SEO.

Don't do this:

```html
<div class="header">
  <h1>Logo</h1>
  <div class="nav">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
</div>
<div class="main">
  <p>Content here.</p>
</div>
<div class="footer">
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
</div>
```

Do this instead:

```html
<header>
  <h1>Logo</h1>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>
</header>
<main>
  <article>
    <section>
      <p>Content here.</p>
    </section>
  </article>
</main>
<footer>
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
</footer>
```

Using semantic elements enables CSS element selectors and avoids unnecessary class names.

### Heading Hierarchy Best Practices

When using heading tags, always proceed in numerical order. Skipping heading levels makes it difficult for screen reader users to understand content organization and causes HTML validation / Lighthouse score issues.

Don't do this:

```html
<h1>Coding is fun</h1>
<h3>It is always better when you have fun coding</h3>
<h5>Consistency is Key</h5>
```

Do this instead:

```html
<h1>Can coding be fun?</h1>
<h2>The more you code the better you become</h2>
<h3>Coding is fun</h3>
```

If you need a heading to visually appear before another regardless of level, use CSS to reorder — never break the semantic hierarchy.

### Use `<strong>`, `<em>`, and `<mark>` Instead of `<b>` and `<i>`

The `<b>` and `<i>` tags have no semantic meaning. Use semantic alternatives so screen readers can interpret text emphasis correctly:

- **`<strong>`** — marks text as important (renders bold).
- **`<em>`** — marks text as emphasized (renders italic).
- **`<mark>`** — highlights text.

Don't do this:

```html
<p><i>This is italic text</i></p>
<p><b>This is bold text</b></p>
<p><span style="background-color: lightyellow">this is highlighted text</span></p>
```

Do this instead:

```html
<p><em>This is emphasized text</em></p>
<p><strong>This is important text</strong></p>
<p><mark>This is highlighted text</mark></p>
```

Do not use CSS classes/properties to replace the absence of `<b>` and `<i>` — centralize styling via element selectors on `<strong>`, `<em>`, and `<mark>`.

### Media Best Practices

#### Figure and Figcaption

Use `<figure>` and `<figcaption>` when adding captions to images. This improves SEO and screen reader comprehension.

Don't do this:

```html
<div>
  <img src="photo.jpg" alt="A man working on his computer" />
  <p>This is a picture of a man working on his computer</p>
</div>
```

Do this instead:

```html
<figure>
  <img src="photo.jpg" alt="A man working on his computer" />
  <figcaption>This is a picture of a man working on his computer</figcaption>
</figure>
```

#### Video, Audio, and SVG

Use native `<video>`, `<audio>`, and `<svg>` elements for embedding media. Provide fallbacks and captions/subtitles where applicable. Prefer these over `<object>`, `<embed>`, or `<iframe>` when the native element suffices.

### Block vs Inline Elements

Block-level elements (`<p>`, `<h1>`–`<h6>`, `<div>`, etc.) start on a new line and stretch full width. Inline elements (`<span>`, `<em>`, `<a>`, etc.) flow within text.

**Rules:**

- A block element cannot be nested inside an inline element.
- An inline element can be nested inside a block or inline element.
- An inline or block element can be nested inside another block element.

Don't do this:

```html
<a href="https://example.com" target="_blank">
  <p>Example</p>
</a>
```

Do this instead:

```html
<p>
  <a href="https://example.com" target="_blank">Example</a>
</p>
```

Do not change `display` from block to inline (or vice versa) in CSS to work around nesting — fix the HTML structure instead. This keeps the code within W3C specs and avoids validation issues.

### Template Engine Syntax (CRITICAL)

This project uses a **custom template engine** with specific syntax. **NEVER use Liquid/Jekyll `{% %}` syntax.**

#### Conditionals

```html
<if condition="expression">
  <!-- content -->
  <elseif condition="other_expression"></elseif>
  <!-- content -->
  <else></else>
  <!-- content -->
</if>
```

#### Loops

```html
<for each="item in array">
  <!-- Use {{ item.property }} -->
</for>
```

#### Template Inheritance

```html
<extends src="layouts/base.html"></extends>
<block name="title">Page Title</block>
<block name="content">
  <!-- content -->
</block>
```

#### Includes with Data

```html
<include src="../components/header.html" data='{ "current": "home" }'></include>
```

> **⚠️ Build Enforcement**: The CI pipeline will automatically reject any templates containing `{%` or `%}` patterns.

### W3C Markup Validation

A W3C markup validation is mandatory for checking markup validity for HTML, XHTML, SMIL, and MathML. Just because code works does not mean it follows best practices — always validate.
