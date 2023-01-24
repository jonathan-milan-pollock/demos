# Chapter 4 Making sense of floats

## 3 Most Important Methods to Alter Document Flow

1. Floats
2. Flexbox
3. Gird Layout

Positioning - stacking elements in front of one another

---

# Floats

- the oldest method for laying out a web page
- for 2 decades was the only option until display: inline-block and display:table emerged
- not originally intended to construct page layout but instead to format a website like a newspaper with text wrapping around

![Float](float.png)

floated element
: removed from normal document flow and pulled to the edge of the container

- text flows around the float

---

# Page Structure

- It's usually easiest to lay out the large regions of a page first then work to smaller elements within

- Example #1

---

## Double Container Pattern

![DoubleContainerPattern](double-container-pattern.jpg)

```html
<style>
  .container {
    /* small inner container fills the screen, larger ones expands to 1080px */
    /* important to avoid scrolling on devices with smaller screens */
    max-width: 1080px;
    /* TB RL auto left and right margins will center element in outer container */
    margin: 0 auto;
  }
</style>
<html>
  <body>
    <!-- the outer container is body and by default 100% of the page width -->
    <div class="container">
      <!-- the inner container -->
    </div>
  </body>
</html>
```

- Example #2

---

## Do we still need Floats?

- for IE, only IE 10 and 11 support flexbox
- plenty of sites out there that still use floats so good to be aware of them
- floats do require less markup
- **_only way to move an image to the side of the page and allow text to wrap around it_**

---

## Floated elements do not add height to their parent elements

- this is unlike elements in the normal document flow
- when float an image inside a paragraph the paragraph does not grow to container the image, instead the next paragraph will start immediately below

![FloatWithParagraphText](float-with-paragraph-text.png)

```css
/* white background doesn't extend beyond running tips */
/* floated elements do not add height to their containers */
/* so all the floated media elements are below the white background of main */
.media {
  float: left; /* float the media to the left */
  width: 50%;
  padding: 1.5em;
  background-color: #eee;
  border-radius: 0.5em;
}
```

- Example #3

---

## Clear - Float's Companion Property

- clearfix

![Clearfix](clearfix.jpg)

clear (both, left, right)
: if place an element a the end of the main container and use clear causes the container to expand to the bottom of the floats

```html
<!-- at end of main causes the white background to extend -->
<!-- clear:both causes element to causes element to move below -->
<!-- bottom of floated elements instead of beside them -->
<!-- as this div is not floated container will extend it -->
<div style="clear: both"></div>
```

- this works work but is ugly, want instead to change in css
- Example #4

---

## clearfix with ::after pseudo-element

- clearfix is applied to the container of the elements that are floated

```css
/* ::after a pseudo-element targets a point in the document */
.clearfix::after {
  /* targets the pseudo-element at the end of the document */
  /* with display: block and content: ' ' value causes the pseudo-element to appear in the document */
  display: block;
  content: ' '; /* the space fixes issues in old Opera versions */
  /* clear: both makes the pseudo-element clear all floats in the document*/
  clear: both;
}
```

- Example #5

---

## clearfix refinement for margin collapsing

| margins of           | margin collapsing with clear fixed container        |
| -------------------- | --------------------------------------------------- |
| non-floated elements | will margin collapse                                |
| floated elements     | won't collapse outside of the clear fixed container |

```css
/* can also be used to prevent margin collapsing where don't want it */
.clearfix::before,
.clearfix::after {
  /* we saw that display:table-cell doesn't have margins */
  /* but the clearfix needs a block level element so use table */
  /* table implicitly adds table-row and table-cell */
  display: table;
  content: ' '; /* the space fixes issues in old Opera versions */
}

.clearfix::after {
  clear: both; /* only the ::after pseudo element needs to clear floats */
}
```

- Example #6

---

### Unexpected "float catching"

- browser places floats as high as possible

![FloatsSnoopy](floats-snoopy.jpg)

- As the first box is larger than the 2nd
  - 1st 2 floats are in a row as expected
  - But as the 2nd box is smaller than the 1st the 3rd "catches" on the 1st
  - 3rd box doesn't float all the way to the left leaves large space below 1st

![FloatCatching](float-catching.jpg)

- float catching can happen with even a 1px difference in heights
- if the 1st floated element is shorter then this there won't be float catching

---

### Fix for "float catching"

- the 3rd float needs to clear the floats above it
- or more generally the 1st element of each row needs to clear the float above it

```css
/* nth-child pseudo-class selector */
/* since two boxes per row the odd ones need to clear */
.media:nth-child(odd) {
  clear: left;
}
```

```css
/* if had three items per row could target every 3rd with the selector */
/* 3(0) + 1 = 1 */
/* 3(1) + 1 = 4 */
.media:nth-child(3n + 1) {
  clear: left;
}
```

- this fix only works when you know how many elements are on each row

```css
.media {
  float: left;
  /* if defined as something other than % use flexbox or inline-block elements */
  width: 50%;
  padding: 1.5em;
  background-color: #eee;
  border-radius: 0.5em;
}
```

- ## Example #7

---

## Unexpected "float catching"

- browser places floats as high as possible

![FloatsSnoopy](floats-snoopy.jpg)

- As the first box is larger than the 2nd
  - 1st 2 floats are in a row as expected
  - But as the 2nd box is smaller than the 1st the 3rd "catches" on the 1st
  - 3rd box doesn't float all the way to the left leaves large space below 1st

![FloatCatching](float-catching.jpg)

- float catching can happen with even a 1px difference in heights
- if the 1st floated element is shorter then this there won't be float catching

---

## Fix for "float catching"

- the 3rd float needs to clear the floats above it
- or more generally the 1st element of each row needs to clear the float above it

```css
/* nth-child pseudo-class selector */
/* since two boxes per row the odd ones need to clear */
.media:nth-child(odd) {
  clear: left;
}
```

```css
/* if had three items per row could target every 3rd with the selector */
/* 3(0) + 1 = 1 */
/* 3(1) + 1 = 4 */
.media:nth-child(3n + 1) {
  clear: left;
}
```

- this fix only works when you know how many elements are on each row

```css
.media {
  float: left;
  /* if defined as something other than % use flexbox or inline-block elements */
  width: 50%;
  padding: 1.5em;
  background-color: #eee;
  border-radius: 0.5em;
}
```

- Example #8

---

## Adding margin

- adding right margin to create a gutter between media elements
- Lobotomized owl

```css
/* Lobotomized owl */
body * + * {
  margin-top: 1.5em;
}
```

```html
<style>
  .media {
    float: left;
    /* T of 0 removes the lobotomized owl all but the top media have 1.5em top margin */
    margin: 0 1.5em 1.5em 0; /* TRBL R and B have 1.5em of margin */
    /* as want a margin but 50% media is now to wide (1.5 * 16px = 24px) on the right */
    /* so subtract from the width */
    width: calc(50% - 1.5em);
    padding: 1.5em;
    background-color: #eee;
    border-radius: 0.5em;
  }
</style>

<div>
  <!-- the parent of the other media elements -->
  <div class="media"></div>
  <div class="media"></div>
  <!-- lobotomized owl targets -->
  <div class="media"></div>
  <!-- lobotomized owl targets -->
  <div class="media"></div>
  <!-- lobotomized owl targets -->
</div>
```

- Display example #9 and #10 in Chrome to show margins and computed margins
- Example #9
- Example #10

---

## "Media Object" Pattern

```html
<style></style>
<!-- Media Object pattern -->
<div class="media">
  <!-- media-image -->
  <img class="media-image" src="shoes.png" />
  <!-- media-body -->
  <div class="media-body">
    <h4>Change it up</h4>
    <p>
      Don't run the same every time you hit the road. Vary your pace, and vary
      the distance on your runs.
    </p>
  </div>
</div>
```

- want to style so that it looks like this

![MediaObjectPattern](media-object-pattern.jpg)

- Nicole Sullivan
  - has named the following page layout pattern the "Media Object" Pattern
  - quote on Object Oriented CSS which will cover in the next Master's CSS course

![NicoleSullivan](nicole-sullivan.jpg)

### 1st: Float the image and handle the margins

```html
<style>
  /* float the image to the left */
  .media-image {
    float: left;
  }

  /* removes the lobotomized owl */
  .media-body {
    margin-top: 0;
  }

  /* overrides the top margin applied by user agent styles */
  .media-body h4 {
    margin-top: 0;
  }
</style>
```

- text still wraps the image due to standard document flow

![FloatedImage](floated-image.jpg)

- Display example #11 in Chrome to show Media Object box enveloping floated image
- Example #11

### 2nd Block Formatting Context BFC

> block formatting context (BFC)
> : region in the page in which elements are laid out isolating contents from outside context

- 3 things necessary to establish the block formatting context

1. contain the top and bottom margins of all elements within it so margins don't collapse outside their containers (won't margin collapse)
2. contain the floated element within it
3. doesn't overlap with floated elements outside the BFC

### How to create a Block Formatting Context BFC

| declaration            |                                       | issues                                                                                          |
| ---------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------- |
| float: left            | float: none will not crete BFC        | will grow to 100% so have to restrict width so doesn't line wrap below the float                |
| float: right           |                                       | will grow to 100% so have to restrict width so doesn't line wrap below the float                |
| overflow: hidden       | overflow: visible will not create BFC |                                                                                                 |
| overflow: auto         | overflow: auto (or hidden) easiest    |                                                                                                 |
| overflow: scroll       |                                       |                                                                                                 |
| display: inline-block  | called a block container              | will grow to 100% so have to restrict width so doesn't line wrap below the float                |
| display: table-cell    | called a block container              | will only grow enough to contain contents have to set large width to force fill remaining space |
| display: table-caption | called a block container              |                                                                                                 |
| display: flex          | called a block container flexbox      |                                                                                                 |
| display: inline-flex   | called a block container              |                                                                                                 |
| display: grid          | called a block container grid         |                                                                                                 |
| display: inline-grid   | called a block container              |                                                                                                 |
| position: absolute     |                                       |                                                                                                 |
| position: fixed        |                                       |                                                                                                 |

```html
<style>
  .media-image {
    float: left;
    /* adds a right margin to the image to add space */
    margin-right: 1.5em;
  }

  .media-body {
    overflow: auto; /* create a block formatting context BFC */
    margin-top: 0;
  }
</style>
```

- contents from one BFC in some cases can overlap the contents of another

  - ex. contents overflow the container (content is too wide)
  - ex. negative margins pull the contents out of the container

- Example #12

---

## Grid Systems

- most popular CSS frameworks (such as Bootstrap) include a grid system

  - put a row container around several column containers with classes indicating widths
  - the containers don't add styles instead add elements to containers for styles

- usually 12 columns in each row, each column can vary from 1 to 12 columns wide, each rows columns add up to 12

| lots of multipliers | total |
| -------------------------------- | --x--- |
| 3 x 4 column elements | 12 |
| 4 x 3 column elements | 12 |
| 1 4 column + 1 8 column | 12 |
| 9 column main + 3 column sidebar | 12 |

![GridSystem](grid-system.png)

```css
<div class="row">
  <div class="column-4">4 column</div>
  <div class="column-8">8 column</div>
</div>
```

```css
/* this is the clearfix with ::after pseudo-element */
/* adds a clearfix for every row, a wrapper for the columns */
.row::after {
  content: ' ';
  display: block;
  clear: both;
}

/* attribute selector targeting elements on class attribute */
/* target all elements with a class attribute that starts with "column-"*/
/* consider column a reserved word after this as would also target column-header */
[class*='column-'] {
  float: left;
}

.column-1 {
  width: 8.3333%; /* 1/12 */
}
.column-2 {
  width: 16.6667%; /* 2/12*/
}
.column-3 {
  width: 25%; /* 3/12 */
}
.column-4 {
  width: 33.3333%; /* 4/12 */
}
.column-5 {
  width: 41.6667%; /* 5/12 */
}
.column-6 {
  width: 50%; /* 6/12 */
}
.column-7 {
  width: 58.3333%; /* 7/12 */
}
.column-8 {
  width: 66.6667%; /* 8/12 */
}
.column-9 {
  width: 75%; /* 9/12 */
}
.column-10 {
  width: 83.3333%; /* 10/12 */
}
.column-11 {
  width: 91.6667%; /* 11/12 */
}
.column-12 {
  width: 100%; /* 12/12 */
}
```

- Example #13

- adjust media element as still floating left and the grid columns are now doing this

```css
.media {
  /* float: left; no longer need float left as grid column already does */
  /* margin: 0 1.5em 1.5em 0; no longer need the margins */
  /* width: calc(50% - 1.5em); no longer need as will naturally fill 100% of container */
  padding: 1.5em;
  background-color: #eee;
  border-radius: 0.5em;
}

/* also no longer need for float catching due to grid column
.media:nth-child(odd) {
  clear: left;
} */
```

- Example #14

- as all margin removed from .media there is no longer the 1.5 bottom margin

```css
.main {
  /* TRBL Change from RL padding to have 1.5em B padding as well */
  padding: 0 1.5em 1.5em;
  background-color: #fff;
  border-radius: 0.5em;
}
```

- removing the margin and width calc from .media also removed the gutter

```css
[class*='column-'] {
  float: left;
  /* adding padding to grid system instead of individual components */
  /* can reuse the grid without worry about gutters again */
  padding: 0 0.75em; /* TRBL want 1.5 em of space so add 0.75 em to R & L */
  margin-top: 0; /* remove lobotomized owl */
}
```

- Example #15

- compensate for the padding on the left and right of the rows
- this is the double container pattern where the row is the inner container inside its wrapper

```css
/* use negative margins to */
/* pull the row left outside its container for the 1st and 3rd media element */
/* pull the row right outside its container for the 2nd and 4th media element */
.row {
  margin-left: -0.75em;
  margin-right: -0.75em;
}
```

- Example #16
