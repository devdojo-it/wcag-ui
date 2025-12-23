<!-- https://blog.openreplay.com/elevate-your-coding-efficiency-with-css-naming-conventions/ -->

# CSS Standards & Conventions

The place for all the CSS standards, naming conventions and other amenities.

## Introduction

Mastering CSS is a continuous process and requires a lot of practice, it just has no effect to master these concepts without continuously trying to use them.

Mastering CSS is about having fun and utilizing your creativity and your power to visualize things or bring them to life.

Mastering CSS is reading and adopting best practices to approach the whole design engineering and UI/UX implementations process.

Oftentimes, what makes CSS hard is that developers don't have a set of tools, guidelines, and best practices to follow and use to help them enjoy the art of writing CSS.

As well known in the web developers community, CSS is one of the biggest complaints.

Beyond learning the fundamentals, CSS requires a lot of creativity, requires the ability to imagine things, visualize them, and mentally structure the DOM in order to prepare what's the "real CSS job": bringing appeal, identity and consistency to a web interface.

All this must be done without compromising pragmatism and common-sense. In general a good approach to work, think, design, draw with CSS is:

> Make learning a habit!!! Think in HTML+CSS!!!

---

## Basics & Naming Convention

All the styling codebase will be written in pure native vanilla CSS.
Every styling codebase MUST have selectors with as lower specificity as possible, preferring elements or attributes as selectors and trying o not use classes at all.
To empower this concept, the whole styling codebase should use CSS @layer API.
Every CSS file must be between 50 and 100 line of code, over it it should be unpacked in different sub files and then @import them in the main one.

---

### Measure Units

In that huge jungle which is the CSS measure units, the ones that we're going to use are:

1. **_vh/vw/vmin/vmax_**, for all the measures related to the viewport (1vh means 1% of the viewport height)
2. **_rem_**, for most of the measures (this helps to keep the overall UI consistency when zooming)
3. **_em_**, only for typography purposes (by specifying relative font-sizes with em instead of rem, the scaling will not only be related to the main html root font-size but to the parent, override at scale)
4. **_ch_**, only for horizontal sizing in case of typography purposes (1ch is equal to the width of the '0' character based on the current font-size settings)
5. lh, this height corresponds to the line-height measure
6. **_deg/rad/turn_**, for rotations
7. **_ms_**, for transitions and animations (durations, delays, etc etc)
8. **_px_**, as the last resort, principally for borders sizes

Considering that 1rem will always be equal to the font-size set in the html root, let's always set the html root font-size to 10px. In this way all the calculations for rems will be 10-based (1rem = 10px, 1.6rem = 16px, 25rem = 250px, etc etc).

Anyhow considering a11y and lighthouse it's always better to start with a minimum font-size of 16px, resulting into this:

```css
html {
  font-size: 10px;
}

body {
  font-size: 1.6rem;
}

// from this line on... every measure for sizes should be expressed in rems unless specifically required by a use case

button {
  width: 15rem; // 150px
  height: 2rem; // 20px

  // here in px because we don't want the border to get bigger when zooming
  border: 1px solid black;
}

h1,
h2,
h3,
h4,
h5 {
  // here are some generic typescale headings settings
  margin: 3rem 0 1.4rem; // 30px 0 14px
  font-family: sans-serif;
  font-weight: 400;
  line-height: 1.3;
}

h1 {
  // three times the parent/ancestor font-size
  font-size: 3em;
}

h2 {
  // two and a half times the parent/ancestor font-size
  font-size: 2.5em;
}

h3 {
  // two times the parent/ancestor font-size
  font-size: 2em;
}

h4 {
  // one and a half times the parent/ancestor font-size
  font-size: 1.5em;
}

h5 {
  // one and a quarter times the parent/ancestor font-size
  font-size: 1.25em;
}

small {
  // 80% of the parent/ancestor font-size
  font-size: 0.8em;
}

p {
  // max-inline-size === max-width, here using the ch measure unit cause we exactly want a max width of 45ch because of typography purposes
  max-inline-size: 45ch;
}

.diamond {
  // rotation can also be expressed in rad o turn but with degrees is easier to imagine too
  transform: rotate(45deg);
}

.motion-item {
  // duration and delays should always be expressed in ms, it allow more granularity
  transition: all 350ms ease-in-out;
}
```

---

### `css-hierarchy`

The following nested hierarchy model of CSS/SCSS properties allows to keep the codebase cleaner, readable, maintainable and expandable.

Advantages:

- Readability of the code with selectors organized in groups
- Combined with custom tags and custom attributes, avoid a huge amount of unnecessary CSS classes and ID selectors
- Using custom attribute selectors simplifies the implementation of component declinations and variations (e.g. `element-selector[declination] {}`, `button[primary] {}`)
- Easy to transform into real WebComponents whenever it's needed

The CSS properties hierarchy MUST be the following:

1. variables a.k.a. custom properties
2. positional properties (position, inset, top, right, bottom, left)
3. display properties (including flex & grid properties)
4. visibility properties (visibility, opacity, backface-visibility)
5. box-model properties (sizing, width, height, aspect-ratio, padding, border, margin)
6. colors & backgrounds properties (color, background-color, background-image, box-shadow, filter)
7. typography properties (font-size, line-height, text-transform, text-align, vertical-align)
8. transform & motion properties (transform, transition, animation)
9. behavior properties (cursor, outline, appearance)

Resulting into this:

```css
.class-selector-example,
element-selector-example {
  /* css custom properties */
  --example: 1;
  --border-color: #fff;

  /* positional properties */
  /* position, inset, top, right, bottom, left */
  position: absolute;
  inset: 0 0 0 0;

  /* display properties (including flex & grid properties) */
  display: flex;
  justify-self: unset;
  grid-template-areas: 'header header'
  'aside main'
  'footer footer';
  grid-template-columns: 30rem 1fr;
  gap: 1rem;

  /* visibility properties */
  visibility: visible;
  opacity: 1;

  /* box-model properties */
  box-sizing: border-box;
  width: 10rem;
  aspect-ratio: 16 / 9;
  padding: 1rem;
  border: 0.1rem solid black;
  border-radius: 0.4rem;
  margin: 1rem;
  outline: 0;

  /* colors & background properties */
  color: white;
  background-color: black;
  background-image: url();
  box-shadow: rgba(50, 50, 50, 1);
  filter: drop-shadow();

  /* text properties */
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
  text-align: center;
  text-shadow: none;
  vertical-align: middle;

  /* transform & animations properties */
  transform: translate();
  transition: opacity 300ms ease-in, width 500ms linear;
  will-change: opacity, width;
  animation: test 300ms forwards alternate-reverse;

  /* behaviors & helpers properties */
  cursor: pointer;
  appearance: none;
}

```

For the rest of this document, the structure above will be called `css-hierarchy`.

---

### `css-hierarchy`

The SCSS hierarchy, inside a single selector, MUST be the following:

1. `css-hierarchy`
2. nested pseudo-classes selectors (:disabled, :checked, :read-only, etc etc for a full list of pseudo-classes take a look to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes))
3. nested CSS class (or attribute) driven variants (.error, .highlight, .disabled, [aria-expanded=false] are just a few examples)
4. media queries, possibly using a mixin
5. nested pseudo-elements selectors (::after, ::before, etc etc for a full list of pseudo-elements take a look to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements))
6. nested children selectors (any type of nested element, possibly without using classes if the element is unique and identifiable via the element tag)
7. nested combinator selectors (> _, ~ _, etc etc for a full list of CSS combinators take a look to [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators))

Resulting into this:

```css
:root {
  /* global custom properties */
  --border-radius: 5px;
}

.class-selector--example,
element-selector--example {
  /* css-hierarchy goes here */

  /* *** please avoid this kind of notation */
  /* &--disabled {
  //
  // }

  /* css custom properties */
  --var--example: 1;
​
  /* position */
  position: absolute;
  inset: 0; /* top, right, bottom, left */
  z-index: 1;
​
  /* display */
  display: block;
  display: flex;
  place-content: center;
  place-items: center;
  justify-self: unset;
  gap: 1rem;

  opacity: 1;
  visibility: visible;
​
  /* box-model */
  box-sizing: border-box;
  width: 10rem;
  aspect-ratio: 16 / 9;
  padding: 1rem;
  border: 0.1rem solid black;
  border-radius: 0.4rem;
  margin: 1rem;
  outline: 0.3rem solid black;
  outline-offset: 0.3rem;
​
  /* colors & background */
  color: white;
  background-color: black;
  background-image: url();
  box-shadow: rgba(50, 50, 50, 1);
  filter: drop-shadow();
​
  /* text */
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
  text-align: center;
  text-shadow: none;
​
  /* transform & animations */
  transform: translate();
  transition: opacity 300ms ease-in, width 500ms linear;
  will-change: opacity, width;
  animation: test 300ms forwards alternate-reverse;
​
  /* helpers */
  appearance: none;
  cursor: pointer;
  pointer-event: none;
​
  /* pseudo elements */
  &::after {
  }
​
  /* variants & pseudo selectors */
  &.error {
    color: red;
  }

  &[aria-hidden=true] {
    display: none;
  }
​
  /* pseudo selectors */
  &:hover {
  }
​
  /* media queries */
  @media screen and (width >= 1024px) {
    /* repeat css hierarchy here */
  }

  /* ------------ children */
  span {
    /* repeat css hierarchy here */
  }
​
  input {
    /* repeat css hierarchy here */
  }
​
  > element {
    /* repeat css hierarchy here */
  }
}
```

---

### CSS variables naming convention

Pretty much take CSS to the Next Level, introducing the idea of sharing and scoping values and knowing your way around how to use variables.

> It will become like "exposing APIs" both ways between CSS and JS.

All CSS variables, by spec, has to begin with a double dash.

So let's imagine a variable as a train:

- double dashes connects the wagons
- single dashes separate name items inside the wagon
- **locomotive** at the head of the train it's the **target** of the variable itself (`action-button` for instance, as you can see there we separate parts of the target with a single dash)
- **first wagon**, if present, it's related to the declination/variation (e.g. `primary`, `secondary`, etc etc), no declination/variation means default
- **second wagon**, if present, it's related to the state of the declination (e.g. `hover`), no state means default
- the other wagons are specific items of the state (e.g. `background`, `background-color`, `font-size`, etc etc)

Let's do an example to make it more clear.

```css
.selector {
  /* here the variable name is "action-button" */
  --action-button--border: 1px solid #fff;
  --action-button--background-color: rgba(50, 50, 50, 0.8);

  /* here the hover state, in alphabetical order, groups all the state related values */
  --action-button--hover--border: 1px solid #eee;
  --action-button--hover--background-color: rgba(50, 50, 50, 0.5);

  /* here the secondary declination/variation, in alphabetical order, groups all the declination/variation different values */
  --action-button--secondary--border: 1px solid #eee;
  --action-button--secondary--background-color: rgba(40, 40, 40, 0.5);

  /* again, here the hover state, in alphabetical order, groups all the hover state related to the secondary declination/variation values */
  --action-button--secondary--hover--border: 1px solid #fff;
  --action-button--secondary--hover--background-color: rgba(40, 40, 40, 0.8);
}
```

---

### CSS class naming convention

Same as for CSS variables, let's imagine a css class name as a train:

- double dashes connects the wagons
- single dashes separate name items inside the wagon
- **locomotive** at the head of the train it's the **target** of the class itself (`action-button` for instance, as you can see there we separate parts of the target with a single dash)
- **first wagon**, if present, it's related to the declination (e.g. `primary`, `secondary`, etc etc), no declination means default
- **other wagons**, are specific variations of the declination (e.g. `dark-mode`, `sr-only`, etc etc)

Let's do an example to make it more clear.

```css
.action-button {
}

.action-button--dark-mode {
}

.action-button--secondary {
}

.action-button--secondary--dark-mode {
}
```

---

## Dependencies Rules

As well known a dependency, as well as adding features/functionalities, can also add:

- unnecessary heavy weight
- possible 0-day exploits
- possible performance and compatibility issues
- sometimes poor accessibility and responsiveness
- strict UI rules, hard to override
- strict DOM structure, which doesn't help the custom design implementations

So be careful, and try to do it by yourself.

> Adding bootstrap just to have a grid system is not a great choice.
>
> If you often find yourself overwriting or hacking a third-party library , you don't need it!

1. Pure HTML+CSS first

   Build components in pure HTML+CSS only as much possible. Always try to find a CSS solution (something not too hacky) before you reach for Javascript Help, consider having CSS doing the most of the styling and using Javascript for things like triggers and side effects

2. Avoid third-party dependencies, by default

   Don't introduce a component or a library/framework unnecessarily, try to find a solution and implement it from scratch before reaching google or github for help

3. Separate your overrides of third-party dependencies

   Whenever you write a style to override a third-party library, consider putting it in a separate file for easy tracking and maintainability. If you decide to get rid of the library later, it will be easier to remove, and putting them in their own file is already self-documentation

---

## HTML (HTML in a CSS standards document?)

Meant constantly experimenting new ways to optimize the DOM in order to keep it as much clean as possible and allow the related CSS codebase to be cleaner too.

Oftentimes, to accomplish the style you want you may want to structure your HTML differently, but, of course, without sacrificing structure, semantics and accessibility because of styling.

> Always try to get the right UI/UX results without introducing too much unnecessary HTML, or compromising accessibility.

1. Keep HTML semantics and use CSS for styling

   In general, let the styling to CSS and let your HTML structured in a way that makes sense semantically.

   There are exceptions to this rule but always ensure that the adopted structure does not go against any HTML semantic rules.

   Write your HTML first, with content in mind, not styling. Than add CSS and try your best before changing your HTML for styling reasons.

2. Organize CSS to match the markup order

   Matching the markup order is a very good practice, it allows to:
   - keep the structure mostly the same between HTML and CSS
   - think in specificity
   - improve both the codebase HTML and CSS (it also helps to improve and optimize your scripts)
   - visualize the markup just by looking at your CSS
   - saving a lot of time, and lines of code.

3. Avoid using id attributes everywhere

   Being crazy enough to desperately want every bit of performance out of your CSS doesn't means that unique ids are the only solution. Instead it makes more sense to use ids only when are specifically needed by the use-case, and avoid them by default.

   Id attributes styles are hard to overwrite, and are meant to be unique per page so follow these guidelines for id usages:
   - Use it for something truly unique on the page like a logo and containers
   - Don't use it on or inside components that are meant to be re-used
   - Use it on headings and sections of the website you want to link to
   - Use an id generator to ensure uniqueness if necessary
   - Don't use it for forms, prefer name attribute instead

---

## Architecture Rules

Architecture is fundamental to avoid conflicts when writing CSS as an app grows bigger, and it's needed to make sense out of your CSS alone, and that's when you need to adopt a technique to help you with it and remain consistent.

It must be something you like or the team agrees with, here some examples:

- BEM — Block Element Modifiers
- OOCSS — Object-Oriented CSS
- ITCSS - Inverted Triangle CSS
- SMACSS — Scalable Modular Architecture for CSS
- CUBE CSS - Composition Utility Block Element CSS

All these are CSS structure guidelines you can follow to better structure your selectors and style in general. This is totally optional concept to adopt but it is worth mentioning in case you come across things like this out there.

Let's define our own.

PIX CSS - Prepare Identify eXtend CSS

Prepare (design tokens, utilities):

1.  Reset (check [this](https://www.webfx.com/blog/web-design/a-comprehensive-guide-to-css-resets/))
2.  Color Palette (colors, elevation, shadows, gradients)
3.  Typography (font scale, font stack, ...)
4.  Iconography
5.  Grid System

Identify (implementation of the visual identity):

1.  Components
2.  Layout
3.  Responsive

eXtend (enrichment of all the different features):

1. Motion (Animations, Micro Interactions, ...)
2. Theming
3. Print Mode
4. Screen-Reader Mode

CSS methodologies will ensure consistency and future proof your styles.

---

## General CSS Coding Rules

1. Comment

   Commenting is a good thing, adopt it! If you write complex hacks or found those cases where something works but don't know why then add a comment. Add comments for complex things, to organize your CSS, to help others understand your thinking and strategy, and to make sense out of your mess when you come back to it later.

2. Normalize or Reset

   Every browser comes with a default style for the elements and these vary, therefore, there is a chance that your thing may look one way in one browser, and different in another, it may have an extra border or shape you were not expecting. By resetting or normalize your CSS you streamline these things and give your style a better chance to look the same in any browser.

3. No `!important`, NEVER!!!

   If you are using Bootstrap and really want to overwrite a style, you will need to use the !important flag but again, why are you using Bootstrap in the first place?

   If you find yourself feeling the need to use the !important flag it is normally a sign you have a problem. You may be using a hard to overwrite third-party library; You are using inline styles; You are being overly specific with your selectors; You have a CSS hierarchy or order problem or should try to understand how CSS specificity is calculated.

4. Minimize

   Before you load your CSS into the browser, minimize it. You can use a post-processor or make it a simple build process step of your site deployment. Smaller CSS file will load faster and start to be processed sooner.

5. Lint

   Linting works by ensuring you follow the rules you define for your style and make sure your styles are consistent, well structured, and follow CSS best practices. Look into Stylelint and how to set up style linting in your favorite IDE and how to set up your configuration file.

6. Validate

   W3 organization provides a free CSS validator you can use to make sure your CSS follows general guidelines for correct CSS style rules and guidelines.

7. Avoid hard to maintain hacks

   Whenever you introduce a hack to your style, it is best to put it in a separate file to make it easier to maintain, for example, hacks.css. As your codebase grows it becomes hard to find them and address them, overall, try to avoid hacks all together if possible.

8. Be aware of styles order

   CSS stands for Cascading StyleSheets which means that whatever comes last has the potential to overwrite previous styles so order your styles in an order that ensures that the style you want will be applied. It is all about understanding your way around CSS specificity.

9. Avoid color names

   Prefer to specify your color values with hex and color functions instead of saying red, purple, cyan. There are millions of hex color values and not a name for all of them. For consistency's sake, find one way to add colors and stick to it.

10. Remove Unused CSS

    For the same reason, you should ship the only CSS you will use, consider using tools like PurgeCSS to remove CSS that will not be needed in rendering. These tools will look at your CSS and HTML to determine which styles you will need. If you are not sure you need this, consider using browser tools that look for your code coverage which will tell you whether you are shipping unused style or not.

11. Use CSS variables

    My #1 reason to use a pre-processors was the variables and CSS variables are way better because they stick around when loaded in the browser. The support is good and it allows you to create a more flexible and reusable UI, without mentioning it helps you create a more powerful design system and features.

12. Separate global vs local style

    It is vital to distinguish what styles are meant for any or a set of HTML selectors vs. those meant for something specific. I keep all global styles in a separate file (especially when using a preprocessor) but you can also put it at the top of your CSS file then focus on setting specific styles for specific
    components, elements, or sections of the site.

13. Modularize your style

    You don't need to bundle all CSS in one file unless it will be used. If a user lands on the home page, only include the styles for that page, nothing else. I even go as far as to separate stylesheets into essential vs non-essential styles. Essential styles are those that once the page loads the user sees them and non-essential styles are those for components that remain hidden like dialog, Snack-bars, and notifications. Elements or components that require user action to be displayed.

14. Lazy load stylesheets correctly

    There are many ways to lazy load your CSS and it is often easier when using bundlers like WebPack and playing around with dynamic import. You can create your own Javascript CSS loader or you can defer non-critical CSS by playing with the `<link>` tag when including stylesheets in your page.

15. Be specific & not too specific

    Being specific is good as it defines which style applies to what but once you are too specific it becomes overkill, reduces performance, and increases your bundle size as well. Sometimes it is even an indication of bad CSS or design system. Example of over specific selectors:
    - `section#sample-section` — (ask why you need to specify "section” along with id)
    - `main div p.title` — (ask why you need to specify anything besides the .title )
    - `[disabled]` — not specific enough and expensive
    - `#sample` — the most specific and efficient selector
    - `*` — global and super expensive (slowest)

    Being overly specific sometimes is needed but look at it as an exception rather than a common practice. Not being specific enough can cause style conflict and be too specific makes it hard for the browsers.

16. Read CSS as the Browser does

    Look at the following selector:

    `nav ul li a`

    You most likely read it from left to right but browsers read it from right to left which means, it finds all the `<a>` tags on the page then filters it to include only those inside `<li>`, then again filters to include only those inside a `<ul>` then finally only those inside a `<nav>`. This is so it fails to match as fast as possible. If there is no `<a>` tag there is no need to start matching from `<nav>` to only find out that there is no `<a>` tag.

    One can argue that the most performant CSS would be giving an id to every HTML element on the page and use those to style and that using CSS selectors is super expensive, worse when deeply nested. Maybe you need every bit of performance, maybe you don't care and think browsers are fast enough to handle this. Ideally, you should style your page with HTML in mind.

17. Style with HTML in mind for better performance

    Always consider the way you structure your HTML when styling, especially after you read the previous two rules/guidelines(6 & 5). If you know that the only links on the page are the navigation links, maybe using the selector a is okay but if you know there will be more, use a class to differentiate it like `.nav-link`.
    Style selectors are expensive worse when nested and targeting common HTML tags like `<div>`, `<p>`, and `<a>` tags. Find strategies that allow you to efficiently render CSS but don't adopt any extreme measure like adding id or class to everything for styling purposes unless you are using a class utility first library or really need that extra performance.

    For a better idea, try to learn about how CSS works.
    - #main-navigation /_ ID (Fastest) _/
    - body #page-wrap /_ ID _/
    - .main-navigation /_ Class _/
    - li a.nav-link /_ Class _
    - div /_ Tag (Slow)_/
    - nav ul li a /_ Tag (Slower)_/
    - \* /_ Universal (Slowest) _/
    - [disabled] /_ Universal _/

18. Avoid inline styles

    The only thing that can overwrite an inline style is the usage of `!important` flag and as you will read on the next block, the `!important` flag can be bad and inline styles call for it.

    Another reason to avoid them is that you added an external stylesheet for a reason and that reason is to separate style from the structure (HTML). There are exceptions to this but if you have a style in your external stylesheets, style in HTML, style in Javascript, it becomes hard to track what is doing the change and as the codebase grows, it becomes hard to maintain.

    Some libraries and frameworks like Svelte and Vue allow for HTML (JSX), CSS, and Javascript to coexist in the same file but at the end of the day, it really comes down to preference.

19. Write CSS consistently

    Consistency is key. Even if you are doing everything wrong, remain consistent as it will be easier to fix them later. Find a naming convention that works for you, adopt a CSS methodology, organize styles the same way, define how many levels you nest selectors, etc. Define your style and stick to it and improve it over time.

20. Prefer shorthand

    Sometimes you want to specify the `padding-top` or `border-right` but from experience, I often come back to these to add more so I adopt the habit to always use the shorthand to make it easier to change without specifying many properties. It is easier to change and it is less code.

21. Combine common styles

    Avoid repeating styles by grouping selectors with the same style rules. You can comma separate selectors with the same style body.

22. Turn common tricks into utility classes

    If you find yourself applying tricks or the same styles over and over again, turn them into class-utils to be used directly on the HTML tag. For me, these are things like center with display flex or grid so I create a class `.center-flex` and `.center-grid`. Create class utilities to automate these repetitive style combinations.

23. Use relative units more

    You should really try to use relative units more. Things like em, rem, %, vw, vh, fr, etc. Setting fix values with px and pt should be things for static design although there are cases that call for these value units. The browser is flexible, so should your website and units.

24. Use double quotes

    Whenever you include any string value like background or font URL or content, prefer double quotes and keep it consistent. A lot of people leave quotes out which can work sometimes but may cause problems with CSS parsing tools. Also, look into CSS quotes property to automate some of these.

---

## Box Model Rules

Always approach UI development by thinking that everything is a box, is pretty much one of the top secrets of CSS: margin is the distance of the box apart, border is the box walls, padding is the space between content and the walls, content which can be text of some other boxes. Often left out the outline which is the line that stays between border and margin which is also stylable and _fundamental to improve the overall accessibility experience_.

1. Box size border-box everything

   The CSS property box-sizing default value should be border-box and it is listed as one of many CSS API mistakes.
   At the top level simply declare

   ```css
   *,
   *::after,
   *::before {
     box-sizing: border-box;
   }
   ```

2. Let the parent take care of spacing, position, and sizing

   When styling a component meant to be used in the content flow, let the content and inner spacing define the size and do not include things like position and margin. Let the container where this component will be used to decide the position and how far apart this component is from others.

3. **Cascade and Specificity**

   Number one issue when writing CSS is having the style be overwritten by some other style either third-party or yours. Many tools have emerged promising fixing this by isolating your style block but the best way to fix this is to understand it. Learn how specific you need to be, in which order your style is applied by the browser, how to override third-party styles, the issue around the `!important` flag, etc. Follow the CSS flow and how it works.

4. **Selectors, Combinators, Pseudo Class & Pseudo Elements**

   Mastering these concepts is what really adds magic to the css codebase. Selectors help you target elements, Combinators help you combine and target with patterns, Pseudo-classes helps targeting states and Pseudo-elements helps targeting or adding specific parts in the DOM.

5. **Display and Positioning**

   These properties allows to control how the elements are positioned in and out the content flow. Positioning things remain one of the biggest challenges when it comes to CSS so go deep in learning and combining this two properties.

## Layout & Responsive Rules

Being able to adapt to any viewport size and being able to change the layout, adapt to the space is a superpower on its own. It's possible to stick to old school media queries and breakpoints, but recently with the advent of grid, flex, clamp and container queries, it's possible to implementa responsive and fluid behaviors without the old school in mind. It is all about the experience and so many other things that factor into it.

1. Style to be responsive or at least fluid

   You are creating something to go in the browser which means that people will access it in a variety of device types and sizes. Really consider improving the experience for these people by considering fluid or responsive design. If your project does not include a responsiveness plan, try to at least remain fluid.

2. Let the content define the size

   Instead of setting the width and height of a button for example, consider setting some padding for spacing and including a max-width instead and max-height instead unless the design calls for a strict size.

3. Avoid constantly overriding/undoing style

   A huge red flag is one that you write a CSS style and then somewhere else you write the same CSS with different values, pretty much-override everything. If you are constantly doing this, there is clearly something wrong with the way you are approaching styling your project.
   You should almost never fall into the situation where you need to overwrite your own styles. It shows that you have style variations and you probably did not plan your UI before hand.

4. Properly place Media queries

   Media queries MUST be at the very end of the dist files, but inside the css codebase as specific selector variations

---

## Color Rules

Pretty much everywhere, are used for borders, backgrounds, shadows, outlines, text. Different color formats are available and allowed. HEX, RGB, HSL and related counterparts with alpha channel. Color is not just about the values.

1. Create a variable for every color in the palette

2. Number color variable by weight (less is bright, more is dark)

   (e.g. --color--primary--400: #fff, --color--primary--800: #eee)

---

## Typography Rules

85-90% of a web digital product is text, structuring and building a dynamic set of typography helps to keep the whole css codebase clean and maintainable. Font loading (FOIT, FOUT, FOFT for more info about this topic check [this article](https://css-tricks.com/the-best-font-loading-strategies-and-how-to-execute-them/)) aren't the only things to take care of: font face, font scale, font stacks, overflow, rendering, spacing, alignment are mandatory for a properly structured typography.

1. Consider better font loading strategy

   You can continue to use @font-face to define your fonts but use the `<link/>` tag to load your fonts so you are able to defer them especially if you have more than 1 font file. You should also look into SVG fonts and learn about them as they allow for a more accurate font rendering. Add your `@font-face` rules at the top of your stylesheet.

2. Avoid too many font files

   Maybe the designers handed you too many font files which is a red flag. A website with too many fonts can be chaotic and confusing so, always make sure you are including the fonts you will need for the page. Fonts can take time to load and be applied and when you have too many fonts your UI normally jumps into place after the fonts are loaded.

3. Format Text with CSS

   CSS can format your HTML text. No need to manually write all caps, all lower or capitalized words in your HTML. Changing a CSS property value is way faster to change than going around changing all the text in HTML, and it is also better for internationalization as it allows you to write the text as you want and manipulate how it looks with CSS.

---

## Media Rules

Handling and composing figures with images and/or css shapes is a big weapon in the UI/UX arsenal, is one of the most fun parts of CSS, as well known an image can tell more than a thousand words.

Handling videos is a big weapon as well.

1. Composing

   Use `<figure>` to wrap all the images and/or css shapes when composing, exactly, figures

2. Avoid Media Queries

   If possible avoid media queries in CSS to manage responsive images, you can demand this to HTML

3. Customize Native

   Try to customize native media players or embeds instead of using a library or a component

---

## Motion Rules

An amazing tool for the enhancement of a web digital product overall experience are transformations and animations.

**Transform** is often something you need to animate and transition which makes transform go hand in hand with CSS animation and transition.

**Transition** is a way to control how CSS value goes from state to another.

**Animation** is a way to add motion to something with many, and custom, keyframe stops.

1. Be aware of rendering/performance expensive properties

   The browsers are super fast now but from time to time, on complex websites, I see some painting issues related to setting `box-shadow`, `border-radius`, `position`, `filter`, and even `width` and `height`, especially for complex animations or repetitive changes. These require the browser to do complex re-calculations and repaint the view again down to every nested child.

2. Minimize layout modification styles

   Layout modifiers are properties like `width`, `height`, `left`, `top`, `margin`, `order`, etc. These are more expensive to animate and perform changes since they require the browser to recalculate the layout and all the descendants of the elements receiving the change. It starts to become more evident when you are making changes to a lot of these properties at once so, be aware of that.

3. Use `will-change` as a last resort

   The `will-change` is used as a performance boost to tell the browser about how a property is expected to change. The browser then does complex calculations before it is used and although this sounds like a good thing, more often than not, you don't need it. Unless you find performance issues related to things changing like when transforming or animating something, use is a last resort.

4. Add animation declarations last

   Another thing you can do is put your animation `@keyframes` in a separate file and include it at the end of your stylesheet or simply import it last. This will ensure your entire style is read before the browser tries to perform any of the animations on load.

5. Specify the properties you need transition for

   When you are specifying transition, always include all the names of properties you intend to transition. Using the `all` or leaving the property name out will force the browser to try to transition everything and affect the transition performance.

---

## A11y Rules

1. Don't remove the outline!

   Don't set outline property to `none` but style it! If you don't like how it looks, style it to match your website's look and feel. For people navigating your website with a keyboard or some other screen reading navigation method, the outline is crucial in letting them track where they are.

2. Disable `pointer-events` ONLY when needed

   Disable `pointer-events` only when it's really necessary, by default let the browser choose how to behave with elements

---

## Sparse Rules

Suggestions and rules to properly style.

1. Use a Preprocessor

   CSS preprocessors help you write less CSS faster and in a better way. They are full of tools and utilities that help you organize, avoid repetition, and modularize your CSS. I prefer SASS but there are also LESS and Stylus which I enjoy equally as well. The reason I love them is that they don't introduce a "new way” to style your page. It is still CSS with extra syntax and features.

   SASS, but strictly in the SCSS declination, allows to access concepts like mixins, functions, and modularity with the ability to import and compose style. The power of this has an incredible value, specially for big enterprise apps.

2. Use a design system

   A design system allows you to build for the future because it allows you to define your general design rules and specifications, follow an organization, modularize, define best practices, etc. The reason it is a future proof strategy is that it is much easier to introduce changes, fix and configure things on a global scale.

3. Use a PostProcessor

   Adding PostCSS in order to use a variety of plugins to optimize CSS like Autoprefixer(add webkit-, moz-, ms-, etc ), CSSNano (minimize your CSS), postcss-preset-css (allows you to write future CSS), and so many others that can help you define standards and rules, introduce tools, class utilities, communicate with javascript and standardize many of these best practices.

---
