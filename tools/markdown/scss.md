# css

---

## best practices

1. don't use !important
2. ids are for js not css

---

## acronyms

- LoVeHAte (:link, :visited, :hover, :active)

---

## rule (selector + declaration block)

```scss
selector:pseudo-class [attribute-selector] {
  property: value;
}
```

universal selector:
: \* selects all elements

combinators:

```scss
:>+~ ;
```

ruleset, rule
: the selector and declaration block

at-rule
: @import rules or @media queries

---

## cascade

### stylesheet origin

1. author !important
2. author styles
3. user agent styles
   - top and bottom margin for: h1 to h6 and p
   - left padding: ol and ul
   - link colors and default font sizes

### selector specificity

> [isInline, #ids, #classes, #elements]

1. inline
2. selector (stylesheet or style element)

NOTE:
_pseudo-class and attribute selectors count as classes_
_universal selectors and combinators have no effect on specificity_

### source order

- If comes later takes precedence

---

## inheritance

### inherited properties

- text
  - color
  - font
  - font-family
  - font-size
  - font-weight
  - font-variant
  - font-style
  - line-height
  - letter-spacing
  - text-align
  - text-indent
  - text-transform
  - white-space
  - word-spacing
- list
  - list-style
  - list-style-type
  - list-style-position
  - list-style-image
- borders for tables

  - border-collapse
  - border-spacing

- TODO: add postcss
