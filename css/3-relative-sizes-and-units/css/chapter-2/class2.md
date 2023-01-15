# Chapter 2 Working with Relative Units

responsive
: layouts that "respond" differently based on size of browser window

- as browser windows can be any size, and screens can be resized
  - late-binding of styles to a page
  - need relative instead of absolute sizes

### How will an 800px width div work on an mobile device?

- due to different mobile, tablet, and desktop dimensions have to embrace responsive layouts

---

## absolute vs relative units

### absolute units - always mean the same thing

### relative units - relative to which element and which property using it

| absolute        | relative |
| --------------- | -------- |
| px - pixel      | em       |
| mm - millimeter | rem      |
| cm - centimeter | %        |
| in - inch       |          |
| pt - point      |          |
| pc - pica       |          |

**px** - a CSS px does not strictly equate to a monitor's pixel

- depends on browser, OS, hardware and users monitor resolution

**em** - most common relative length unit

- in typography refers to specified font size

| em useful for: |
| -------------- |
| padding        |
| width          |
| height         |
| border-radius  |

Example #1

---

## computed value

- values declared using relative units are evaluated by the browser to an absolute value

```css
.padded {
  font-size: 16px;
  padding: 2em; /* Computed value of 32px */
}
```

- NOTE: if another selector targets this element and sets different font-size it will change the computed value and padding will change

Example #2

---

## em's as font-size

em
: defined by the current element's font-size

```css
div {
  /* what does this mean? 1.2 x itself? */
  /* instead based on inherited font-size */
  font-size: 1.2em;
}
```

- font size is based on the inherited font size
- keyword of medium is the default with a value of 16px

- Example #3

| inheriting | want | em                |
| ---------- | ---- | ----------------- |
| 12px       | 10px | 10/12 = 0.8333 em |
| 12px       | 16px | 16/12 = 1.333 em  |

- NOTE decimals are not rounded consistently in all browsers

  - IE 2 decimal places
  - Chrome 15 decimal places

- Example #4

## em's as font-size and use with other properties

- ems are tricky when used for both font-size and other properties on the same element

  - can have same specified value but different computed values

```html
<style>
  /* body has a font-size of 16px */
  body {
    font-size: 16px;
  }

  .slogan {
    font-size: 1.2em; /*1.2 em * inherited value 16px so computed value of 19.2px*/
    padding: 1.2em; /* so padding a bit larger 1.2x larger than the 19.2px so 1.2 * 19.2px = 23.04px */
    background-color: #ccc;
  }
</style>
```

- Example #5

### shrinking font problem

- as font-sizes specified with ems get their sizing based on inherited font sizes nested elements such as lists results in shrinking fonts

- Example #6
- SOLUTION : rem and "Shiny Happy People"

![REM](rem.jpg)
