## FE Team

# HTML Standards & Conventions

The place for all the HTML standards, naming conventions and other amenities.

HTML is the backbone of any web-something (site, portal, application). It's the first place to start for engineering the design, sometimes even for analyzing some use-cases. It's the first thing to take care of:

> A good HTML structure usually means good (and less) CSS and JS code.

Accessibility support and full responsiveness/adaptiveness are mandatory for every pull request, not a single line of code will be released if these two main principles are not respected.

Because of this, it's important that the team sticks to good coding practices, but more important are shared and opinionated coding practices.

---

## Coding Practices

Guidelines to help the dev team to easy create, maintain and, last but not least, read code-bases. This saves time in code sharing, knowledge transfers, coding performances and of course maintainability.

---

## Semantic HTML

As the term may suggest it adds Semantic HTML adds semantic meanings to HTML elements.

With HTML5 specifications (released in 2014 by the way) semantics came into play introducing new elements that tells developers and browsers, as well as screen readers or search engines <mark>exactly what the element itself does and what kind of content should contain</mark>.

> These specs allow HTML processors to present and use web contents in a wide variety of contexts that the author might not have considered.

Which also translates in better code readability and maintainability, and more important which improves in general the compatibility of an HTML codebase with <mark>screen readers and web crawlers</mark>: this means improving A11y and SEO support, it provides a better user experience, and it will be easier for users who use screen readers to understand the content itself.

Please refer to [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) for a complete list of Semantic HTML elements (more than 100 and it doesn't makes sense to list all of them here).

Don't do this ⬇️:

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
  <p>
    Curabitur blandit tempus porttitor.
    <br />Aenean lacinia bibendum nulla sed consectetur.
  </p>
</div>
<div class="footer">
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
</div>
```

Do this instead ⬇️:

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
      <p>
        Curabitur blandit tempus porttitor.
        <br />Aenean lacinia bibendum nulla sed consectetur.
      </p>
    </section>
  </article>
  <section>
    <p>
      Curabitur blandit tempus porttitor.
      <br />Aenean lacinia bibendum nulla sed consectetur.
    </p>
  </section>
</main>
<footer>
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
</footer>
```

Giving semantic meaning to the HTML codebase deeply improve the readability of the code and it's navigation, and also helps the writing of css code using element selectors and avoiding to add un-useful class names to represent the same concept.

---

## Typography

Typography is the art of manipulating the visual form of language to enrich and control its message. So Typography is so much more than just choosing beautiful fonts, it's about <mark>guide and convey</mark> emotions, marketing, messages and knowledge.

> At the end of the day Typography is what brings text to life.

So taking care of it in terms of design and development means drastically improving the user experience by raising the readability of a web based product itself.

Obviously this affects every single aspect of applications, websites and their components. From the `<button>` to the `<h1>` headings.

---

### Headings

Use only one `<h1>` element for one HTML document

Don't do this ⬇️:

```html
<main>
  <h1>Can Coding be fun?</h1>
  <p>The more you code the better you become</p>
  <h1>Coding is fun</h1>
  <p>It is always better when you have fun coding</p>
</main>
```

Do this instead ⬇️:

```html
<main>
  <h1>Can coding be fun?</h1>
  <p>The more you code the better you become</p>
  <h2>Coding is fun</h2>
  <p>It is always better when you have fun coding</p>
</main>
```

Having only one single `<h1>` element on on single web page is vital for Search Engine Optimization (SEO) and for Accessibility: It helps search engines understand what a web page is all about (the main idea of a web page) and screen readers mostly work on the same principle.

---

### Headings Hierarchy

When using the header tags, it's vital to proceed in numerical order, no matters the design nor the features, this is also a standard for HTML validation and Google Lighthouse scores.

In terms of accessibility, it's hard for impaired web visitors using a screen reader to understand the contents of your web page when you skip heading levels, results in something like un-ordered, un-logical content organization.

Don't do this ⬇️:

```html
<h1>Coding is fun</h1>
<h3>It is always better when you have fun coding</h3>
<h5>Consistency is Key</h5>
```

Do this instead ⬇️:

```html
<h1>Can coding be fun?</h1>
<h2>The more you code the better you become</h2>
<h3>Coding is fun</h3>
```

So, if it's actually needed to visually arrange an `<h2>` element before a `<h1>`, then it's needed to place those items with CSS in a different order than the HTML codebase.

---

### Use the right element for the right thing

Avoid using `<b>` and `<i>` or change an element background via css to bold, italicize or highlight text. The `<b>` and `<i>` tags are also known as the bold and italics tag, but we shouldn't use them for bolding and italics because they have no semantic meaning. (`<i>` are mostly used for web icons by the way).

But please,

> use `<strong>`, `<em>` and `<mark>`.

The HTML5 specification says that the `<b>` and `<i>` tags should only be used as a last resort if no other tag is available, so: using these kind of elements add semantic meaning to the text and to the screen readers, which will interpret with a different tone the bolded, italicized and highlighted text.

Don't use CSS classes and properties to just replace the absence of `<b>` and `<i>`, but centralize the styling with element selectors on `<strong>`, `<em>` and `<mark>`.

This will also help WYSIWYG editing and overall text consistency.

- Use the `<strong>` tag to make a text on a webpage important. It highlights or bolds a text on a webpage.

- Use the `<em>` tag to emphasizes the text in a webpage. It also displays the text in italics like the `<i>` tag.

- Use the `<mark>` to literally highlight text, as can be seen in this same document.

Don't do this ⬇️:

```html
<p><i>This is italic text</i></p>
<p><b>This is bold text</b></p>
<p><span style="background-color: lightyellow">this is highlighted text</span></p>
```

Do this instead ⬇️:

```html
<p><strong>This is italic text</strong></p>
<p><em>This is bold text</em></p>
<p><mark>This is highlighted text</mark></p>
```

---

## Media

There are a lot of types of media to consider, but it is logical to start with the humble `<img>` element.

With same importante we have `<video>` and `<audio>` elements to embed video and audio on our pages, including basics, providing access to different file formats to different browsers, adding captions and subtitles, and how to add fallbacks for older browsers.

Even `<object>`, `<embed>` and `<iframe>` are elements used for embedding media and other contents in a web base product.

The same goes for `<svg>` element.

All of these elements are part of the Semantic HTML specs by the way.

---

### Figure

It's a best practice to use the `<figure>` element when adding captions to your images. It is important to use the `<figcaption>` element along with the `<figure>` element for it to work. These two elements combines helps SEO (it will become easier to find images on search engines) and web visitors who use screen readers to understand the content of your web page.

Don't do this ⬇️:

```html
<div>
  <img src="a-man-coding.jpg" alt="A man working on his computer" />
  <p>This is a picture of a man working on his computer</p>
</div>
```

Do this instead ⬇️:

```html
<figure>
  <img src="a-man-coding.jpg" alt="A man working on his computer" />
  <figcaption>This is a picture of a man working on his computer</figcaption>
</figure>
```

---

## Layout

Here lies the layout description

---

### Don't place block-level elements within inline-level elements

Block-level elements start in a new line on a web page. By default, they stretch from the beginning of the line to the end on a web page. You won't be able to add more content inline to a block element without using CSS.

The `<p>`, `<h1>` - `<h6>`, and the `<div>` elements are some of the examples of a block level element.
The inline element covers the smallest area on a web page. They do not start on a new line on a web page.
The `<span>`, `<em>`, and the `<a>` elements are some of the examples of inline elements.

You cannot place block elements inside inline elements.

Don't do this ⬇️:

```html
<a href="https://monksoftware.it" target="_blank">
  <p>Monk Software</p>
</a>
```

You cannot wrap `<p>` inside a `<a>` element because `<p>` is a block-level element and `<a>` is an inline element.

Do this instead ⬇️:

```html
<p>
  <a href="https://monksoftware.it" target="_blank">Monk Software</a>
</p>
```

- A block element can't be nested inside an inline element.
- An inline element can be nested inside a block or an inline element.
- An inline or a block element can be nested inside another block element.

NOTE: don't change display from block to inline and viceversa in CSS, change the HTML codebase instead. It's necessary to maintain the code within the W3C specs and avoid weird and un-useful validation issues and bad scores in Lighthouse (or other evaluation platforms). This saves a lot of time... meant directly working within the W3C specs.

---

## Template Engine Syntax (CRITICAL)

This project uses a **custom template engine** with specific syntax. **NEVER use Liquid/Jekyll syntax.**

### Template syntax

This project uses a custom template engine. Never use Liquid/Jekyll `{% %}` syntax in templates — use the engine's tags instead.

Examples (custom engine):

```html
<if condition="expression">
  <p>Content</p>
</if>

<for each="item in items">
  <li>{{ item.name }}</li>
</for>

<include src="header.html"></include>
<extends src="base.html"></extends>
```

### Template Syntax Reference:

**Conditionals:**

```html
<if condition="expression">
  <!-- content -->
  <elseif condition="other_expression"></elseif>
  <!-- content -->
  <else></else>
  <!-- content -->
</if>
```

**Loops:**

```html
<for each="item in array">
  <!-- Use {{ item.property }} -->
</for>
```

**Template Inheritance:**

```html
<extends src="layouts/base.html"></extends>
<block name="title">Page Title</block>
<block name="content">
  <!-- content -->
</block>
```

**Includes with Data:**

```html
<include src="../components/header.html" data='{ "current": "home" }'></include>
```

> **⚠️ Build Enforcement**: The CI pipeline will automatically reject any templates containing `{%` or `%}` patterns.

---

## Conclusion

It's important to remember that just because a codebase works it doesn't mean that it's following best practices.

NOTE: A W3C markup validation is mandatory for checking markup validity for HTML, XHTML, SMIL and MathML.
