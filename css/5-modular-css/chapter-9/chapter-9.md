# Chapter 9 Modular CSS

**_READ_**: https://www.codegram.com/blog/using-bem-in-components/
https://dev.to/alexsergey/css-modules-vs-css-in-js-who-wins-3n25

- add shadow dom material at end of this

- "2 css properties walk into a bar a barstool in a different bar falls over"

## components: break up the page into components

- parts should be reusable in multiple contexts
- should stand alone, shouldn't directly depend upon one another (IKEA furniture)

- end goal: change to one part of CSS will not produce unexpected effects in another

## module: (principal of encapsulation) instead of traditional data and functions, selectors and the elements those selectors target (a small number of DOM elements)

- no module should interfere with styles of another module

## CSS Module has two parts: 1. the HTML markup 2. The corresponding CSS

- each CSS Module identified by a unique class name applied to a DOM element
- modules are nested inside other modules to construct a complete page  
  exs. - navigational menus - dialog boxes - progress boxes - thumbnail images

## Always keep all the code for a module together in the same place

- the stylesheet will consist of a series of modules one after another

## double hyphen syntax

- may seem odd, but helps visually with long selectors easy to see at a glance that its modular

**_NOTE_** the dash to separate two words in module name

ex. nav-menu--horizontal
pull-quote--dark

## don't write context-dependant selectors

UX, "Ok, so we need a dark dropdown in the header"
Developer "Ok, lets use this for a selector"

```css
.page-header .dropdown {
}
```

NO!!! - this is strictly forbidden in modular CSS

**_NEVER USE DESCENDANT SELECTORS TO ALTER A MODULE BASED ON ITS LOCATION IN THE PAGE_**

Major reasons that this is horrible and the reasons people don't like CSS

1. can't reuse so what if need this style in another context?
2. adding enough single-purpose rules like this then stylesheet becomes a haphazard list of unrelated styles!
3. the longer that the selector list becomes the more brittle
4. have no idea if can remove the styles are they still used, are they important?, where they're located when editing
5. the longer the list increases specificity, when want to make further changes ned to meet or exceed specificity
6. where should the style go, with page-header styles? or with dropdown styles? difficult to determine where are the styles that are affecting the element
7. more difficult to understand means more bugs

```css
/* instead should do this */
/* the module and only the module is in charge of it's appearance */
.dropdown-dark {
}
```

## Modifiers what to do with situations like .page-header .dropdown

- example may see .save-form-button, .login-form-button, .toolbar-options-button in a stylesheet, these are specifically tied to a page or location on a page instead should build out module like this
  very common that unintentional changes between them.
  May have intentional differences which are called modifiers,
  2 hyphens indicate a modifier
  Modifiers: only modify the intentional difference

  ## More complicated CSS Modules (you can't build a dropdown menu or modal with only one element)

  ### media module

  - 4 elements
    - div container that includes an image and a body
    - inside the body is a title

- div container
- image
- body
- title

- start with the module

```css
/* media is the div container */
.media {
  padding: 1.5em;
  background-color: #eee;
  border-radius: 0.5em;
}
```

## CSS-in-JS (Styled Components)

- in

## CSS Modules and CSS-in-JS (Styled Components)

- the big three JS frameworks now have ways for CSS to be applied globally or per component which alleviates the original concern of the giant css stylesheet of the days when BEM originated

## Web Components and shadow DOM
