# Programming Like You Give a Damn :purple_heart: - A11y

## Recommended Videos

- [Udacity Web Accessibility (a11y)](https://classroom.udacity.com/courses/ud891)

## Recommended Chrome Extensions

- [Install Chrome extension HTML5 Outliner](https://chrome.google.com/webstore/detail/html5-outliner/afoibpobokebhgfnknfndkgemglggomo?hl=en)
- [Temporarily Install ChromeVox When Actively Testing Accessibility](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)
  - Use when actively testing a11y

## References

- [Web Content A11y Guidelines (WCAG) 2.0 Checklist](https://webaim.org/standards/wcag/checklist)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/)
  - Provides examples for different role patterns
- [Accessible Rich Internet Applications](https://www.w3.org/TR/wai-aria-1.1/)
- [VoiceOver on Mac OS](https://www.apple.com/voiceover/info/guide/_1121.html)

## Topic

### Issues

- inability to click label and get to input
- low contrast text
- keyboard navigation doesn't work
- magnifying screen doesn't work

### POUR

- **P** Perceivable - web content available to the senses - sight, hearing, and/or touch
- **O** Operable - interface forms, controls, and navigation are operable
- **U** Understandable - information and the operation of user interface must be understandable
- **R** Robust - content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies

### Focus

- Determines where keyboard events go in the page
  - The control on screen that receives input from the keyboard and clipboard when you paste

#### Tab Order

- Tab to next control
- Shift-Tab to last control
- Arrow keys to move focus around
- Spacebar to select checkbox
- Enter for selecting options and click buttons

#### Immediately Focusable (tab and keyboard events)

- input
- button
- select
- a

#### DOM order controls the Tab Order

#### tabindex

- Only put focus behavior on interactive controls (buttons, tabs, dropdowns)
- -1 element will not receive focus without focus() in js
- 0 element will receive focus and can also use focus() in js
- **anti-pattern** tabindex > 0, instead move it up in the DOM

```html
<!-- Without the tabindex the div would not receive focus -->
<div id="dropdown" tabindex="0">Settings</div>
```

#### Managing Focus

- Nav that links with animated scroll page sections on that page
- SPA that changes content of the page without a full page refresh

1. Pick a header
2. Add tabindex="-1"
3. Call focus() on the element

```js
if (isFirstPage) {
  isFirstPage = false;
  return;
}

newPage.querySelector('h2').focus();
```

#### Skip Links

- ability to get straight to page content
- 'to main content'

```css
  <style>
    .skip-link {
        position: absolute;
        top: -40px; /* initially offscreen */
        left: 0;
        color: white;
        background-color: #BF1722;
        padding: 8px;
        z-index: 100;
    }

    .skip-link:focus {
        top: 0;
    }
  </style>
```

```html
<!-- create a named anchor and put early in the DOM -->
<a href="#maincontent" class="skip-link">Skip to main content</a>
<header>
  <nav></nav>
</header>
<main id="maincontent" tabindex="-1"></main>
```

#### Custom Components

- Reference WAI-ARIA Authoring Practices 3. Design Patterns and Widgets

#### Roving Focus

- when next radio button focused e.preventDefault(), add checked, and change tab index from -1 to 0

```html
<ul id="group1" class="radiogroup">
  <li tabindex="-1" checked>Water</li>
  <li tabindex="0">Tea</li>
  <li tabindex="-1">Coffee</li>
  <li tabindex="-1">Cola</li>
  <li tabindex="-1">Ginger Ale</li>
</ul>
```

#### When Focus Jumps Offscreen

```js
// Find the focused element
document.activeElement;
```

```css
/*can fix by hiding the drawer so doesn't get focus*/
.hidden-drawer {
  display: none;
  visibility: hidden;
}

.visible-drawer {
  display: block;
  visibility: visible;
}
```

#### Keyboard Trap

- When a control prevents tab going to the next element
- An example when we want a keyboard trap is a modal dialog

```js
// Listen for and trap the keyboard
modal.addEventListener('keydown', trapTabKey);

function trapTabKey(e) {
  // Check for TAB key press
  if (e.keyCode === 9) {
    // SHIFT + TAB
    if (e.shiftKey) {
      if (document.activeElement === firstTabStop) {
        e.preventDefault();
        lastTabStop.focus();
      }

      // TAB
    } else {
      if (document.activeElement === lastTabStop) {
        e.preventDefault();
        firstTabStop.focus();
      }
    }
  }

  // ESCAPE
  if (e.keyCode === 27) {
    closeModal();
  }
}
```

### Semantics

#### Affordances

- familiar elements which express the semantics of markup

  - role: type of element ex. Edit Text
  - name ex. your email address
  - state
  - value

- DOM

```html
<main>
  <div class="card">
    <form>
      <div class="trip-selector">
        <div class="row">
          <div class="inline-control col-2">
            <label for="seatType">Seat type</label>
            <select name="seatType" id="seatType">
              <option value="0">No preference</option>
              <option value="1">Aisle seat</option>
              <option value="2">Window seat</option>
            </select>
          </div>
          <div class="inline-control submit-form col-1">
            <button type="submit" id="submitBtn">Search</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</main>
```

- Accessibility Tree, Browser takes DOM and modifies it for assistive technology

```html
<!--   
      main
        |
      form
      /   \
role:       role:
combo box   button
name:       name:
seat type   search
state:
collapsed  
-->
<main>
  <form>
    <label for="seatType">Seat type</label>
    <select name="seatType" id="seatType">
      <option value="0">No preference</option>
      <option value="1">Aisle seat</option>
      <option value="2">Window seat</option>
    </select>

    <button type="submit" id="submitBtn">Search</button>
  </form>
</main>
```

- Fortunately most of the DOM has implicit semantic meaning ex. Button

  - However, with a div used as button
    - screen reader has no idea what landed on
    - also a div does not have a tab order

#### Discoverable Names

- The 1st item on the WCAG checklist

```html
<label>
  <input type="radio" checked name="tType" value="1" />
</label>
<!-- role: radio button -->
<!-- name: ??? -->
<!-- state: selected -->
```

#### name

- The closest term to name in html is **label**
- 2 types of labels:
  1. visible ex. **label**
  2. not visible, used when no need for visual label ex. **alt** attribute of images

#### button

- Buttons have a descriptive value

```html
<button>Search</button>
```

#### form inputs

- Form inputs have an associated text label
- Also, clicking the label gives focus to the input element

```html
<form>
  <label>
    <input type="checkbox" checked name="jLetter" />
    Receive promotional offers?
  </label>
</form>
```

```html
<form>
  <input type="checkbox" checked name="jLetter" id="letter" />
  <label for="letter">Receive promotional offers?</label>
</form>
```

#### img alt

- **alt** attribute for a text attribute

- displays a simple string when img is not available (which is the case for a string reader)
- alt differs from any other caption including a title

```html
<img src="cat.jpg" alt="A cat staring out into space" />
<figure>
  <img alt="Wallaby and joey" src="wallabies.jpg" title="Not alt text either" />
  <figcaption>not alt text</figcaption>
</figure>
```

- needs to convey the same thing as the image
- imagine all of your images are broken, can you still understand the page content?
- if the alt tag would be redundant as a label or text already conveys this info
  - use alt=""
- With logos alt="name of site"

```html
<img src="logo.svg" alt="Dark Rush Photography" />
```

#### Headers

- Nesting headers after tab order the next major way that assistive technology like screen readers use to navigate pages
- Level of the heading and nesting important ex. H3 inside of H2
- headers should be used to layout page content
- can also put headings offscreen for screen readers
  - **not recommended as some users can see screen and maintenance issues with i18n**

#### Links

- Link text should provide enough info to determine if user wants to click it
- Links are displayed in screen reader summary, work with keyboard, can bookmark the location

- A link

```html
<a href="#internal">text</a>
```

- Anti-pattern links

  - A span is not a link

  ```html
  <span class="link" onclick="doLink()"></span>
  ```

  - An anchor tag without an href is not a link

  ```html
  <a onclick="doLink()">text</a>
  ```

  - A link that should be a button

  ```html
  <a href="#" onclick="doLink()">text</a>
  ```

  - An image used as link content without alt

  ```html
  <a href="/">
    <img src="logo.svg" />
  </a>
  ```

  - Not enough text to determine if want to click it

  ```html
  To order dinner, <a href="/order-dinner">click here</a>
  ```

- Use a button if you need a button

```html
<button href="#" onclick="doLink()">text</button>
```

- Use image alt if image used as link content

```html
<a href="/">
  <img alt="Dark Rush Photography" src="logo.svg" />
</a>
```

- Provide enough text to determine if want to click it

```html
<a href="/order-dinner">To order dinner, click here</a>
```

- Or make the section heading the link

```html
<a href="/xr">Extended Reality (XR)</a>
```

#### Landmarks

- Landmarks are displayed in screen reader summary
  - header
  - main
  - footer
  - nav
  - article
  - section
  - aside

#### Web Accessibility Initiative - Accessible Rich Internet Application spec (WAI-ARIA or ARIA)

- Specify ARIA attributes on elements that allow you to modify the way element is translated in the accessibility tree

- When writing a custom component need to:

  - make it focusable
  - handle keyboard navigation

- Example a custom checkbox

```html
<div>Receive promotional offers</div>
```

- Screen reader will read as Receive promotional offers
- With standard checkbox:
  - role: checkbox
  - name: label of the checkbox
  - state: checked/unchecked
  - also plays a small earcon, the sound effect

```html
<div role="checkbox" aria-checked="true">Receive promotional offers</div>
```

- **NOTE** ARIA attributes always have to have explicit values

##### ARIA allows you alter the accessibility tree

- But doesn't change:
  - Element appearance
  - Element behavior
  - Focusability
  - Keyboard event handling

##### ARIA can be used to modify existing element semantics

```html
<!-- A toggle switch -->
<button class="toggle" checked>Enable</button>
```

```html
<!-- A toggle switch with ARIA -->
<button class="toggle" role="switch" aria-checked="true" checked>Enable</button>
```

##### ARIA allows you to create accessible widgets

```html
<ul role="tree">
  <li role="treeitem" aria-expanded="true">Accessibility course</li>
  <ul role="group">
    <li role="treeitem" aria-expanded="false">Introduction</li>
    <li role="treeitem" aria-expanded="false">Focus</li>
  </ul>
</ul>
```

##### ARIA allows you express relationships beyond the DOM

```html
<button aria-expanded="false" aria-controls="advanced-settings">
  <h2>Advanced settings</h2>
</button>
<div id="advanced-settings">
  <label><input type="checkbox" />Offer to ...</label>
  <label><input type="checkbox" />Send usage ...</label>
</div>
```

##### ARIA can make parts of the page live

- Informs assistive technology right away when they change

```html
<div role="alert">Could not connect!</div>
```

##### [ARIA Role Definitions](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)

- A role maps to a particular UI pattern
- can be applied to any HTML element

<!-- prettier-ignore -->
> <https://www.w3.org/TR/wai-aria-1.1/#checkbox>
>
> **checkbox (role)**
>
> A checkable input that has three possible values: true, false, or mixed.
>
> The aria-checked attribute of a checkbox indicates whether the input is checked
> (true), unchecked (false), or represents a group of elements that have a mixture of
> checked and unchecked values (mixed). Many checkboxes do not use the mixed value,
> and thus are effectively boolean checkboxes.
>
> **Characteristics:**
> | Characteristic                       | Value                              |
> | ------------------------------------ | ---------------------------------- |
> | **Superclass Role:**                 | input                              |
> | **Subclass Roles:**                  | menuitemcheckbox                   |
> |                                      | switch                             |
> | **Related Concepts:**                | HTML input[type="checkbox"]        |
> |                                      | option                             |
> | **Required States and Properties:**  | aria-checked                       |
> | **Supported States and Properties:** | aria-readonly                      |
> |                                      |                                    |
> | **Inherited States and Properties:** | aria-atomic                        |
> |                                      | aria-busy (state)                  |
> |                                      | aria-controls                      |
> |                                      | aria-current (state)               |
> |                                      | aria-describedby                   |
> |                                      | aria-details                       |
> |                                      | aria-disabled (state)              |
> |                                      | aria-dropeffect                    |
> |                                      | aria-errormessage                  |
> |                                      | aria-flowto                        |
> |                                      | aria-grabbed (state)               |  
> |                                      | aria-haspopup                      |
> |                                      | aria-hidden (state)                |
> |                                      | aria-invalid (state)               |
> |                                      | aria-keyshortcuts                  |
> |                                      | aria-label                         |
> |                                      | aria-labelledby                    |
> |                                      | aria-live                          |  
> |                                      | aria-owns                          |
> |                                      | aria-relevant                      |
> |                                      | aria-roledescription               |
> | **Name From:**                       | contents                           |
> |                                      | author                             |
> | **Accessible Name Required:**        | True                               |
> | **Children Presentational:**         | True                               |
> | **Implicit Value for Role:**         | Default for aria-checked is false. |

###### Superclass Role

- may be an abstract role
  - capture certain common properties to several roles but may not used for role attribute

<!-- markdownlint-disable -->

###### Related Concepts :duck:

<!-- markdownlint-restore -->

- For role='checkbox' will have a checkbox pattern, meaning we are promising:
  - it will have a checked or not checked state
  - it will receive focus
  - the on not checked state may be toggled using mouse or spacebar
  - i.e. an affordance of a checkbox
- On the element that has role="checkbox" need tabindex="0" so that receives focus

###### Required States and Properties

- must be provided

###### Name From

- Information about where the name or label can come from
  - ex. contents, author means the name can come from:
    1. Elements Text Content
    2. Or, the author must explicitly provide a name

###### Accessible Name Required

- Indicates must specify a name for this role
  - There are roles such as role="main" for the region of the page which doesn't require a name

###### Implicit Value for Role

- Default for aria-checked is false
  - means if we omit the aria-checked attribute and just have role="checkbox", the checkbox will be represented as unselected

###### [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/)

- Look for pattern in WAI-ARIA Authoring Practices guide gives you all the information you need to implement the widget in one place
  - ex. <https://www.w3.org/TR/wai-aria-practices/#checkbox>
  - It also links back to the ARIA spec for all the attributes
  - Provides keyboard interaction and details advice

##### ARIA labels and descriptions

- aria provides several mechanism for adding labels and descriptions to elements
  - aria-label
  - aria-labelled-by
  - aria-described-by
- the only way to add accessible help or description text
- can use when have some visual indication but still need to clarify that for anyone that can't access that visual indication
- overrides any other labeling mechanisms such as label

###### aria-label

```html
<!-- aria name is now menu -->
<button aria-label="menu" class="hamburger-menu"></button>
```

```html
<!-- Even though button has text content the label Close will be used -->
<button aria-label="Close">x</button>
```

###### aria-labelled-by

- Allows specifying an element id to refer to another element in the DOM as this elements label

```html
<span id="rg-label">Drink options</span>
<div role="radiogroup" aria-labelledby="rg-label"></div>
```

- Much like we are using a label element
  - aria-labelled by can be used on any element
  - but don't get the label clicking behavior you get from label element

```html
<div role="radio" aria-labelledby="lb01"></div>
<span id="lb01">Coffee</span>

<input type="radio" id="rb01" />
<label for="rb01">Coffee</label>
```

- can take a list of id refs to compose a name based on multiple elements
  - the name will be concatenated in the order of the id refs
- can also refer to elements that are hidden

```html
<!-- Name Men's T-Shirts Shop Now -->
<div id="men-lbl" hidden>Men's T-Shirts</div>
<button id="men-btn" aria-labelledby="men-lbl men-btn">Shop Now</button>
```

- overrides all other name sources for an element, it always takes precedence
  - ex. both an aria-labelled by and an aria-label
  - ex. both an aria-labelledby and an html label

```html
<!-- name is Hot Dogs -->
<div id="secret" hidden>Hot dogs</div>
<button aria-label="menu" aria-labelledby="secret" class="hamburger"></button>
```

### Styling

#### Focus Styling

- **Major Focus Styling Anti-Pattern**

  - Without focus styling impossible for a keyboard user to tell what element is currently focused

```css
:focus {
  outline: 0;
}
```

- But, sometimes the default focus ring may not fit with your design

```css
:focus {
  outline: 1px dotted #ffffff;
}
```

- As browsers style the outline property differently and may have a hover style already
  - Can give make the focus style the same as the hover style with a little extra styling

```css
button:hover,
button:focus {
  background: #e91e63;
  color: #ffffff;
}

button: hover {
  outline: 0;
  box-shadow: 0 0 8px 3px rgba(255, 255, 255, 0.8);
}
```

- Different aria states
- support zoom for users that have issues reading smaller text
- color contrast and make sure not only a color change
