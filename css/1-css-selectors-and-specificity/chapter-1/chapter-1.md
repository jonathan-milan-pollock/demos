# Chapter 1 Cascade, specificity, and inheritance

## Of the following what are required?

1. HTML
2. CSS
3. JavaScript

### What is HTML responsible for?

- structure

### What is CSS responsible for?

- style

### What is JavaScript responsible for?

- interactivity

## What are the 3 possible locations for CSS

1. inline-style
2. style section of HTML head element
3. external stylesheet

### 1. inline-style

- style attribute used on an HTML tag

```html
<!-- inline-styles should not be used -->
<div style="color: black; font-size: 12px;"></div>
```

#### parts of an inline-style

property
: what want to style (eg. background-color or height)

value
: how want to style it (eg. red or 100vh)

#### what's wrong with inline-styles?

- can't be reused as applied directly to HTML tag

### 2. style section of HTML head element

```html
<html>
  <head>
    div { color: black; font-size: 12px; /* unit should actually be rem */ }
  </head>
</html>
```

#### what part is added for style section of HTMl head element?

selector
: what part of the DOM do you want to style?

### 3. external stylesheet

```css
<link rel="stylesheet" href="styles/main.css" />
```

#### Why are external stylesheets recommended?

1. Clear separation of HTML and CSS
2. When lots of properties hard to read if in the HTML head section
3. Can reuse external stylesheet on different HTML pages
4. The external stylesheet can be cached

**_NOTE_** for the course the style tag will be primarily used but that is for demo purposes

---

## Parts of a CSS ruleset

![CSS Ruleset](ruleset.jpg)

Rule or Ruleset
: Selector with it's declaration

Selector
: what part of DOM do you want to style

Declaration
: properties and their values

Property
: what you want to style

Value
: how you want to style it

```css
h1 {
  color: black;
  font-size: 12px; /* should be rem */
}
```

---

## creating an HTML page in VSCode

- type html and select html:5

[example1.html](example1.html)

---

## "Cascading" Style Sheets (CSS)

### Why is cascade in the name?

- it's the way resolves which value "wins" when multiple values apply for a property

Cascade
: resolves which value "wins" when multiple values apply for a property

Cascaded Value
: The value that "wins" the cascade having the highest precedence, at most one and may not be a value if property value not provided in any ruleset

### What are the 4 ways the Cascade resolves values?

1. Origin (Author Important, Author, User Agent (Browser))
2. Specificity
3. Source Order - the last factor

---

## 1. Origin

### What are the 3 types of Stylesheet Origin in oder of precedence (priority)?

1. Author important (**_NOT RECOMMENDED_**)

- declarations you write with !important

```css
/* not recommended as overwrites specificity and all other selectors */
font-family: serif !important;
```

2. Author

- declarations you write

3. User Agent

- chrome://settings Appearance

### What are examples of User Agent styles?

- h1 to h6 and p top and bottom margin
- ol and ul left padding
- link colors
- default fonts and sizes

```css
/*
  User Agent Styles unordered list elements (ul) have 
  left padding and list-style-type disc so remove the 
  user agent list styles
  */
#main-nav {
  margin-top: 10px;
  list-style: none; /* list-style-type disc */
  padding-left: 0;
}
```

[example2.html](example2.html)

## 2. Specificity

### What is Specificity defined by? Some styles more specific than others

|                                 |                                       |
| ------------------------------- | ------------------------------------- |
| inline styles                   |                                       |
| id                              | #example                              |
| class, pseudo-class, attribute  | .example                              |
|                                 | pseudo-class (:hover)                 |
|                                 | attribute (type["input"], [disabled]) |
| element (tag), pseudo-element   | div, ::after                          |
| universal selector, combinators | \*                                    |
|                                 | combinators (>, +, - )                |

- universal selectors and combinators have no effect on specificity

```html
<html>
  <head>
    <style>
      /* attribute selector */
      /* selects all disabled elements regardless if a button */
      [disabled] {
        color: red;
      }
    </style>
  </head>
  <body>
    <button disabled>Click</button>
  </body>
</html>
```

### What color is Wombat Coffee Roasters?

- green

```html
<head>
  <style>
    /* an element (tag) selector */
    h1 {
      color: red;
    }

    /* a class selector */
    .title {
      color: blue;
    }

    /* and id selector */
    #page-title {
      color: green;
    }
  </style>
</head>
<body>
  <header class="page-header">
    <h1 id="page-title" class="title">Wombat Coffee Roasters</h1>
  </header>
</body>
```

#### What if reverse the order of class and id selector, what color is Wombat Coffee Roasters?

- still green as id selectors have higher precedence

```html
<head>
  <style>
    /* an element (tag) selector */
    h1 {
      color: red;
    }

    /* and id selector */
    #page-title {
      color: green;
    }

    /* a class selector */
    .title {
      color: blue;
    }
  </style>
</head>
<body>
  <header class="page-header">
    <h1 id="page-title" class="title">Wombat Coffee Roasters</h1>
  </header>
</body>
```

[example3.html](example3.html)

## 3. Source Order

- the last factor in the Cascade

```css
/* if the following two styles have same origin (author) and
* specificity 0,1,1 then the 2nd takes precedence
*/
.nav a {
  color: white;
  background-color: #13a4a4;
  padding: 5px;
  border-radius: 2px;
  text-decoration: none;
}

/* specificity 0,1,1 also but source order last */
a.featured {
  background-color: orange;
}
```

[example4.html](example4.html)

### **LoVe HAte** an example where source order matters

![LoVe HAte](lovehate.jpg)

- psuedo classes have the same specificity, :link, :visited, :hover, :active, should be in LoVe HAte source order

- user Hovers over a Visited link Hover style takes precedence
- if user Activates the Link while Hovering over it then Active style takes precedence

[example5.html](example5.html)

---

## Inheritance

- inherited values are passed down until overridden by cascaded value
- ![Inheritance](inheritance.png)
- h1 in image is a cascaded value thus the em has inherited #ff0000 (not #333333)

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
- table borders
  - border-collapse
  - border-spacing

```css
/* due to inheritance all descendant elements will have a sans-serif font */
body {
  font-family: sans-serif;
}
```

inherit
: for inheritance to take precedence over a cascaded value, can also used for properties not normally inherited like padding or margins

[example6.html](example6.html)

---

## Cascade as shown in DevTools

![DevTools](devtools.png)

#### in DevTools what is shown first?

- in DevTools element.style is shown first because these are the inline styles

#### in DevTools where are inherited values shown?

- inherited values are shown last because DevTools displays the Cascade in the order of precedence

---

## Calculating Specificity

- **_NOTE_** can hover a selector in VSCode to see its specificity

|                       |                     |
| --------------------- | ------------------- |
| universal selector \* | specificity 0, 0, 0 |
| tag selector          | specificity 0, 0, 1 |
| class selector        | specificity 0, 1, 0 |
| id selector           | specificity 1, 0, 0 |

```css
html body header h1 {
  color: blue;
}

body header.page-header h1 {
  color: orange;
}

.page-header .title {
  color: green;
}

#page-title {
  color: red;
}
```

| Inline | # ids | . class | tag | notation              |
| ------ | ----- | ------- | --- | --------------------- |
|        |       |         | 4   | 0,0,0,4               |
|        |       | 1       | 3   | 0,0,1,3               |
|        |       | 2       |     | 0,0,2,0               |
|        | 1     |         |     | 0,1,0,0 most specific |

- a single id has a higher specificity than any number of classes

### How can we simplify the Cascade

- don't use Author Important (simplifies Origin to just Author)
- don't use inline styles or ids (simplifies location and type for specificity)

#### then simply count 2 types selectors

| . classes | tags |
| --------- | ---- |
|           |      |

### What is the purpose of tags, classes, and ids?

- the purpose of elements (tags) are for HTML
- the purpose of classes are for CSS - **_therefore prefer class selectors_**
- the purpose of ids are for JavaScript and internal page links

### What Selector Type should I use?

|                       |                                                                         |
| --------------------- | ----------------------------------------------------------------------- |
| universal selector \* | when want all elements to have the same style                           |
| tag selector          | good basic styling body and anchor tags, less control classes preferred |
| class selector        | reusable, always a good idea even when only one element will have class |
| id selector           | not recommended                                                         |

[example7.html](example7.html)
[example8.html](example8.html)

---

## Compound Selectors

compound selector
: targets elements that match all its simple selectors

- chaining selectors allow being more specific about what want to select
- compound selectors do increase the specificity

```html
<style>
  /* compound selector */
  .dropdown.is-active {
    color: green;
  }
</style>
<div class="dropdown is-active">Styled</div>
<div class="dropdown">
  <span class="is-active">Not Styled</span>
</div>
```

### If want to select only the divs which have both A and C or B and C?

- **_NOTE_** you can use more than one class on an element and the order of these classes doesn't matter

```html
<html>
  <head>
    <style>
      .a.c,
      .b.c {
        background: pink;
      }
    </style>
  </head>
  <body>
    <div class="a">Div A</div>
    <div class="a c">Div AC</div>
    <div class="b">Div B</div>
    <div class="b c">Div BC</div>
    <div class="c">Div C</div>
  </body>
</html>
```

[example9.html](example9.html)

---

## Combinators

- combine multiple selectors
- combining selectors does create a higher specificity

|                           |         |
| ------------------------- | ------- | ------------ |
| descendant                | div p   | whitespace   |
| child (direct descendant) | div > p | greater than |
| general sibling           | h2 ~ p  | tilde        |
| adjacent sibling          | h2 + p  | plus         |

### Descendant Combinator

descendant combinator selector
: targets elements that can be nested at any depth from another selector

- with div p, p can be nested at any depth under div
- with div p span, span can be nested at any depth under p which can be nested any depth under div

```html
<style>
  div p {
    color: lightslategray;
  }
</style>
<div>
  <p>Styled</p>
  <article>
    <p>Styled</p>
  </article>
</div>
```

### Child (Direct Descendant) Combinator

child combinator selector
: targets elements that directly follow another selector

- with div > p, p must be directly under the div
- with div > p > span, span must be directly under p which must be directly under div

```html
<style>
  div > p {
    color: lightsalmon;
  }
</style>
<div>
  <p>Styled</p>
  <article>
    <p>Not Styled</p>
  </article>
</div>
```

### General Sibling Combinator

general sibling combinator
: targets sibling elements following a specified element

- can be more than 2 combined selectors

```html
<style>
  h2 ~ p {
    color: lightseagreen;
  }
</style>
<div>
  <!-- have to have the same parent -->
  <h2>Not Styled</h2>
  <p>Styled</p>
  <h3>Not Styled</h3>
  <!-- p somewhere following h2 -->
  <p>Styled</p>
  <h2>Not Styled</h2>
  <p>Styled</p>
</div>
```

### Adjacent Sibling Combinator

adjacent sibling combinator
: targets sibling elements directly following (adjacent) a specified element

- can be more than 2 combined selectors

```html
<style>
  h2 + p {
    color: lightcoral;
  }
</style>
<div>
  <!-- have to have the same parent -->
  <h2>Not Styled</h2>
  <p>Styled</p>
  <h3>Not Styled</h3>
  <p>Not Styled</p>
  <h2>Not Styled</h2>
  <p>Styled</p>
</div>
```

---

## Initial Property Value

initial
: to undo an cascaded value

```css
/* remove a border from an element */
div {
  border: initial;
}
```

**NOTE** **auto** is not the default for all properties or many properties

```css
div {
  margin: auto; /* only valid because the initial value for margin is auto */
  border-width: auto; /* invalid */
  padding: auto; /* invalid */
}
```

```css
/* instead do this */
div {
  margin: initial;
  border-width: initial;
  padding: initial;
}
```

**NOTE** **initial** does not work in IE11 or Opera mini but all other major browsers

## Shorthand Properties

shorthand properties
: allow you to set values for several other properties at the same time

- Shorthand properties include font, background, border

**NOTE** as font shorthand property sets so many values best to just use it to set body font

```css
div {
  font: italic bold 18px/1.2 'Helvetica', 'Arial', sans-serif;
}

/* equivalent to */

div {
  font-style: italic;
  font-variant: normal;
  font-weight: bold;
  font-stretch: normal;
  font-size: 18px;
  line-height: 1.2;
  font-family: 'Helvetica', 'Arial', sans-serif;
}
```

```css
div {
  border: 4px dotted #32a1ce;
}

/* shorthand border property equivalent to the following */
/* each of these also a shorthand property */
div {
  border-width: 4px;
  border-style: dotted;
  border-color: #32a1ce;
}
```

```css
div {
  border-width: 0px 10px 20px 30px;
}
/* shorthand border-width property equivalent to */
div {
  border-top-width: 0px;
  border-right-width: 10px;
  border-bottom-width: 20px;
  border-left-width: 30px;
}
```

### Shorthand Properties Quirks

#### 1. Omitting Values

- if you omit values and only specify the values concerned with the others will get their initial values (NOT their cascaded values)

```css
div {
  font: italic 18px/1.2 'Helvetica', 'Arial', sans-serif;
}

/* leaving out font weight will set font weight to initial value of normal */

div {
  font-style: italic;
  font-weight: initial; /* initial which would be normal */
  font-size: 18px;
  line-height: 1.2;
  font-family: 'Helvetica', 'Arial', sans-serif;
}
```

#### 2. Shorthand properties try to be lenient

```css
/* shorthand properties try to be lenient */

div {
  border: 1px solid black;
}

/* same as */

div {
  border: black 1px solid;
}
```

---

## 4 and 2 value properties

### 4 value properties follow a clock Top Right Bottom Left (TRBL)

![TRouBLe](trouble.jpg)

#### TRBL Truncated Notations

- if value not provided the values comes from the opposite side
- the 3 values is the tricky one

```css
div {
  /* the following are equivalent */
  padding: 1em 2em; /* TB 1em RL 2em  */
  padding: 1em 2em 1em; /* T 1em RL 2em 1 1em (this is the tricky one) */
  padding: 1em 2em 1em 2em; /* T 1em R 1em B 1em L 1em */
}

div {
  /* the following are equivalent */
  padding: 1em; /*TRBL 1em*/
  padding: 1em 1em; /* TB 1em RL 1em */
  padding: 1em 1em 1em; /* T 1em RL 1em B 1em */
  padding: 1em 1em 1em 1em; /* T 1em R 1em B 1em L 1em */
}

.nav a {
  color: white;
  background-color: #13a4a4;
  /* T 5px R 15px as B and L not specified their value comes from the other side */
  padding: 5px 15px 5px 15px; /* Often more horizontal spacing looks best */
  border-radius: 2px;
  text-decoration: none;
}
```

### 2 value properties use Cartesian grid

```css
background-position: 25% 75% /* 25% horizontal 75% vertical */
box-shadow: 10px 2px #6F9090; /* 10 pixels right x then 2 down y */
text-shadow: 1px 2px #FF0000; /* 1 pixel right x then 2 down y */
```

```css
/*text-shadow 
  1st 2 0.1em 0.1em are cartesian coordinates
  3rd 0.3 em is the how much blur
  #000 is the color
  */
text-shadow: 0.1em 0.1em 0.3em #000;
```
