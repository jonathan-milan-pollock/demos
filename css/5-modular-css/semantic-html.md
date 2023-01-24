## HTML web forms and interactivity

fieldset
: groups inputs into a logical collection

label
: the caption for an input, select, textarea
: doesn't need for attribute if wraps the input like a checkbox

autofocus attribute
: bring focus to an input element

placeholder attribute
: Watermark text, should not be long text nor delimited such as [John Smith]

- pseudo-classes

| browser | pseudo-class              |
| ------- | ------------------------- |
| Chrome  | -webkit-input-placeholder |
| IE      | -ms-input-placeholder     |
| Firefox | -moz-placeholder          |

```html
<!--- use a # for action if going to submit with js -->
<form action="#">
  <fieldset>
    <legend>Contact Details</legend>
    <label for="name">Name <em>*</em></label>
    <input id="name" placeholder="Jane Smith" autofocus />
    <label for="telephone">Telephone</label>
    <input id="telephone" placeholder="(xxx) xxx-xxxx" />
    <label for="email">Email <em>*</em></label>
    <input id="email" />
  </fieldset>
</form>
```

- make placeholder standout

```css
input:focus {
  background: #eaeaea;
}
```

output
: A placeholder code can use for output values

```html
<form action="#" method="POST" id="bmiCalculator">
  <label for="feet inches">Height:</label>
  <input id="feet" />
  <input id="inches" />
  <label for="pounds">Weight:</label>
  <input id="pounds" />
</form>
<p>Your BMI: <output id="result" for="feet inches pounds"></output></p>
```

text
: single-line textbox

```html
<input type="text" /> <input type="password" />
```

textarea:
: multiline textbox

```html
<textarea></textarea>
```

input checkbox

```html
<input type="checkbox" />
```

input radio
: radio button

```html
<input type="radio" id="radioButton1" name="radio-group" />
<input type="radio" id="radioButton2" name="radio-group" />
```

input submit, image, reset, button
: buttons

```html
<input type="submit" />
<!-- Submit the form with clickable image instead of the text -->
<input type="image" />
<input type="reset" />
<!-- Type button doesn't do anything without js -->
<input type="button" />
```

select
: list

```html
<select id="gender" name="gender">
  <option value="female">Female</option>
  <option value="male">Male</option>
</select>
```

#### validation

validation attributes
: validation when the form is submitted for input and textarea fields
: all validation must pass before the form is submitted
: will scroll up to the field failing validation, stops with the first field

- can't style the validation message but can style input fields differently

| css pseudo classes | description      |
| ------------------ | ---------------- |
| required           |                  |
| optional           |                  |
| valid              |                  |
| invalid            |                  |
| in-range           | uses min and max |
| out-of-range       | uses min and max |

```scss
// Required and invalid, so empty required text fields would get this
input:required:invalid {
  background-color: lightyellow;
}
```

#### validation with regular expressions

- ^ and $ are assumed, so matches the full expression
- [A-Z]{3}-[0-9]{3} Three upper case, a dash, three numbers

pattern attribute
: used to apply a regular expression
: combine with required if a blank value isn't allowed

<!-- markdownlint-restore -->

```html
<input
  id="promoCode"
  placeholder="QRB-001"
  pattern="[A-Z]{3}-[0-9]{3}"
  required
  title="Your promotion code is three letters, a dash, then three numbers"
/>
```

#### js custom validation

```html
<label for="comments"
  >When did you first know you wanted to be a zookeeper?</label
>
<textarea id="comments" oninput="validateComments(this)"></textarea>
```

```js
function validateComments(input) {
  if (input.value.length < 20) {
    input.setCustomValidity('You need to comment in more detail.');
  } else {
    input.setCustomValidity('');
  }
}
```

- can also cancel the form submission by returning false to onsubmit

```html
<form
  id="zooKeeperForm"
  action="/zoo-keeper"
  method="POST"
  onsubmit="return validateForm()"
></form>
```

#### turning off validation

novalidate form attribute
: allows for turning off validation for the form

```html
<form action="#" novalidate></form>
```

formnovalidate input submit button attribute
: allows button to submit without validation

```html
<input type="submit" value="Submit without Validate" formnovalidate />
```

#### additional input attributes

- spellcheck
- autocomplete
- autocorrect
- autocapitalize
- multiple
  - on select element (not new)
  - on input element (new)
    - selecting multiple files
    - adding multiple email address

#### input element

- text the default also if browser doesn't recognize type

```html
<input type="text" />
<input type="crazy-type" />
<input />
```

#### new input elements

- browsers validate what is entered is valid

```html
<input type="email" />
<input type="url" />
<!-- browsers not required to validate search -->
<input type="search" />
<!-- browsers not required to validate tel -->
<input type="tel" />
<input type="number" />
<input type="range" />
<input type="date" />
<input type="time" />
<input type="datetime-local" />
<input type="month" />
<input type="week" />
<input type="color" />
```

#### email input element

- supports multiple attribute, each separated with a comma
- mobile browsers show the correct keys for email
- combine with required if a blank value isn't allowed

#### url input element

- most browsers require a URL prefix
  - http://
  - madeup://
- allow spaces and special characters other than :
- some show urls from browser history for selection

#### search input element

- behaves like a text box, sometimes with a different style
- a small x allows for clearing the search on some browsers
- the value is the semantics for assistive technology

#### tel input element

- only value is to get a telephone keypad on mobile devices

#### number input element

- for ordinary numbers
- ignore all non-numeric keystrokes

```html
<input id="age" type="number" min="0" max="120" />
```

- step attribute
  - how the spin button works
  - can allow decimal places with a step including a decimal place

```html
<input id="weight" type="number" min="30" max="1000" step="0.1" value="160" />
```

#### range input element (sliders)

- can allow whole or decimal values
- visually displays a slider instead of a text box
- need js to listen to onchange to know when value changes

```html
<input id="weight" type="range" min="50" max="1000" value="160" />
```

#### date and time input elements

```html
<input type="date" />
<input type="time" />
<input type="datetime-local" />
<input type="month" />
<input type="week" />
```

- can use min and max attributes with dates as long as use the correct date format

| date type      | description                 | example                |
| -------------- | --------------------------- | ---------------------- |
| date           | YYYY-MM-DD                  | 2014-01-25             |
| time           | HH:mm:ss.ss                 | 14:35 or 14:35:50.2    |
| datetime-local | YYYY-MM-DDTHH:mm:ss         | 2014-01T14:35          |
| datetime       | anti-pattern, not supported | 2014-01-15 14:35-05:00 |
| month          | YYYY-MM                     | 2014-01                |
| week           | YYYY-Www (52 or 53 weeks)   | 2014-W02               |

#### color input elements

- pick color from drop-down color picker

#### new form elements

datalist
: drop-down value suggestions for a text box, has no appearance
: can also be used on range, color, and date/time fields
: as types shows any values that have the letters in it's name
: select forces a selection where a datalist does not

- <https://www.jotform.com/blog/html5-datalists-what-you-need-to-know-78024/>

```html
<form action="/action_page.php">
  <fieldset>
    <legend>What's your Favorite Animal?</legend>
    <input id="favoriteAnimal" list="animalChoices" />
    <datalist id="animalChoices">
      <option label="Alpaca" value="alpaca"></option>
      <option label="Zebra" value="zebra"></option>
      <option label="Cat" value="cat"></option>
      <option label="Caribou" value="caribou"></option>
    </datalist>
  </fieldset>
</form>
```

#### contenteditable and designMode attributes

contenteditable
: creates an editable region with a caret and ability to select, copy and paste, and delete text

designMode
: allows editing an entire web page inside an iframe

#### new elements

progress
: semantic how far a task has progressed

```html
<progress value="0.25"></progress>
```

- can use max to change the scale

```html
<progress value="25" max="200"></progress>
```

- indeterminate progress bar

```html
<progress></progress>
```

meter
: semantic a gauge which indicates measurement, a value within a range

```html
Your suitcase weighs: <meter min="5" max="70" value="28">28 pounds</meter>
```

- can use high and low to indicate that the meter value is outside of a range

```html
Your suitcase weights:
<meter min="5" max="100" high="70" value="79">79 pounds</meter> Your suitcase
weights: <meter min="5" max="100" low="20" value="10">10 pounds</meter>
```
