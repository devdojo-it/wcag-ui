# `accordion`

> TODO: description

## Usage

```
const accordion = require('accordion');

// TODO: DEMONSTRATE API
```

## HTML before without name attr

```html
<section is="wcag-accordion">
  <details>
    <summary>
      {{title}}
    </summary>
    {{content}}
  </details>
  <details>
    <summary>
      {{title}}
    </summary>
    {{content}}
  </details>
</section>
```

## HTML after without name attr

```html
<section is="wcag-accordion">
  <details name="{{uuid}}-accordion">
    <summary>
      {{title}}
    </summary>
    {{content}}
  </details>
  <details name="{{uuid}}-accordion">
    <summary>
      {{title}}
    </summary>
    {{content}}
  </details>
</section>
```

## HTML before without name attr

```html
<section is="wcag-accordion">
  <details>
    <summary>
      {{title}}
    </summary>
    {{content}}
  </details>
  <details>
    <summary>
      {{title}}
    </summary>
    {{content}}
  </details>
</section>
```

## HTML after without name attr

```html
<section is="wcag-accordion">
  <details name="{{uuid}}-accordion">
    <summary>
      {{title}}
    </summary>
    {{content}}
  </details>
  <details name="{{uuid}}-accordion">
    <summary>
      {{title}}
    </summary>
    {{content}}
  </details>
</section>
```

----

## HTML before with name attr

```html
<section is="wcag-accordion" name="{{NAME}}">
  <details>
    <summary>
      {{title}}
    </summary>
    {{content}}
  </details>
  <details>
    <summary>
      {{title}}
    </summary>
    {{content}}
  </details>
</section>
```

## HTML after with name attr

```html
<section is="wcag-accordion" name="{{NAME}}">
  <details name="{{NAME}}">
    <summary>
      {{title}}
    </summary>
    {{content}}
  </details>
  <details name="{{NAME}}">
    <summary>
      {{title}}
    </summary>
    {{content}}
  </details>
</section>
```
