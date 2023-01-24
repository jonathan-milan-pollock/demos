# html

## What's wrong with a div?

- A div doesn't provide any meaning to the page
- Many of the examples in the book use div where a structural semantic elements or landmark should be used

### structural semantic elements (ARIA landmarks)

| element | description                                                                                   | heading element required |
| ------- | --------------------------------------------------------------------------------------------- | ------------------------ |
| header  | header of the page, article, or section                                                       | yes                      |
| nav     | nav links, can be standalone or inside header, aside, or article                              |                          |
| main    | primary content of the page                                                                   |                          |
| footer  | Only for website's copyright, authorship (address), legal restrictions (small), and links (a) |                          |
| article | Section of a page which could be it's own page (ex. blog post or news article)                | yes                      |
| aside   | content indirectly related to main content (ex. sidebar)                                      | no but may have one      |
| section | semantic element of last resort, any content with a header                                    | yes                      |

---

### use cases for semantic elements

#### what if heading tag should not be displayed?

```html
<!-- logo example -->
<header class="common-header">
  <img src="logos/dark-rush-photography.png" alt="Dark Rush Photography" />
  <h1 style="display: none">Dark Rush Photography</h1>
</header>
```

#### what if a fat footer is needed?

- fat footers popular for social media links, cookie warnings

```html
<!-- fat footer -->
<div id="fat-footer" class="fat-footer">
  <aside>
    <img onclick="closeBox()" src="close_icon.png" />
    <!-- additional fat footer content -->
  </aside>
  <!-- footer outside the aside because it applies to the website not this aside -->
  <footer>
    <small>&copy;2021 Dark Rush Photography - All Rights Reserved</small>
  </footer>
</div>
```

#### sidebar example and use of aside, nav, section and div

```html
<!--  aside can have header -->
<aside class="sidebar">
  <h2>Pages</h2>
  <!-- nav has navigation links -->
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/photo-of-the-week">Photo of the Week</a></li>
      <li><a href="/stories">Stories</a></li>
      <li><a href="/destinations">Destinations</a></li>
    </ul>
  </nav>
  <!-- Section as has a header --->
  <section>
    <h2>About Us</h2>
    <p>...</p>
  </section>
  <!-- Div as doesn't have header -->
  <!-- Would use section if had a header such as "A Word From Our Sponsors" -->
  <div>
    <img src="ad.jpg" alt="No worries we won't have ads" />
  </div>
</aside>
```

### semantic elements for images

| element    | description                                            |
| ---------- | ------------------------------------------------------ |
| figure     | an image referenced from text                          |
| figcaption | Description, links, or small icons adorning the figure |

#### **_NOTE_** if img alt is redundant to the figcaption use alt=""

```html
<!-- semantic image example -->
<figure class="float-figure">
  <!-- using alt="" as would be redundant  -->
  <img src="garden-flowers.jpg" alt="" />
  <figcaption>Garden Flowers with the sun shinning</figcaption>
</figure>
```

### semantic elements for text

| element | description                                                  |
| ------- | ------------------------------------------------------------ |
| mark    | highlights text with yellow background                       |
| del     | deleted text                                                 |
| ins     | inserted text                                                |
| time    | time, element inline with no styling                         |
| pubdate | date corresponds to the publish date                         |
| pre     | preformatted text keeps line breaks and formatting inside it |
| wbr     | where to break on an unusually long word                     |

#### time examples

- don't need the T in universal time format can use space

```html
<!-- universal time format YYY-MM-DD and HH:MM -->
<p>Photo taken at <time>2014-11-25</time></p>
<!-- format date within time element -->
<p>Photo taken at <time datetime="2017-11-10">November 11, 2017</time></p>
<!-- time -->
<p>Parties start at <time datetime="16:30">4:30 p.m.</time></p>
<!-- timezone offset <https://en.wikipedia.org/wiki/Time_zone> -->
<!-- UTC-5:00 -->
<p>
  The party starts
  <time datetime="2014-03-21 16:30-5:00"
    >March 21<sup>st</sup>at 4:30 p.m.</time
  >
</p>
<!-- mark as the published date -->
<p>Published on <time datetime="2014-03-21" pubdate>March 31, 2014</time></p>
```

### ~~semantic elements~~ **Anti-pattern** collapsible boxes

- with collapsible boxes they are not semantic and how rendered varies (implement with JS)

| element | description                                |
| ------- | ------------------------------------------ |
| details | wraps a collapsible box                    |
| summary | title for the label of the collapsible box |

```html
<!-- Don't use collapsible box! -->
<details>
  <summary>Section 1</summary>
  <p>If you can see this content, the section is expanded</p>
</details>
```

---

## HTML Outline System (Sectioning)

- create structure that is used by Ally

### section elements

| element |
| ------- |
| article |
| aside   |
| nav     |
| section |

### section roots

| element    |
| ---------- |
| body       |
| blockquote |
| td         |
| fieldset   |
| figure     |

### A11y hidden h1 and h2 links allow jumping to sections of the page

```html
<!-- Google Has Multiple hidden h1 and h2 links for Accessibility -->
<body>
  <h1 style="display:none;">Accessibility Links</h1>
  <header>
    <h2>Dark Rush Photography</h2>
  </header>
  <h1>Main Content</h1>
</body>
```

### a new section is created for each heading element, unless already part of a section

```html
<!-- sectioning issue -->
<body>
  <article>
    <h1>Natural Wonders to Visit Before You Die</h1>
    <h2>In North America</h2>
    <h3>The Grand Canyon</h3>
    <h3>Yellowstone National Park</h3>
    <h2>In the Rest of the World</h2>
    <aside></aside>
    <!-- with the aside h3s are moved to the same level as "In the Rest of the World"  -->
    <section><h3>Galapagos Island</h3></section>
    <section><h3>The Swiss Alps</h3></section>
  </article>
</body>

<!-- 
  1. Untitled Section (Body)
     1. Natural Wonders to Visit Before You Die
        1. In North America
            1. The Grand Canyon
            2. Yellowstone National Park
        2. In the Rest of the World
        3. Untitled Section (Aside)
        4. Galapagos Island
        5. The Swiss Alps
-->
```

- prevent the automatic sectioning by adding a section, issue when put an aside between two different level headers as an automatic section has been created

```html
<!-- sectioning fix by creating a section -->
<body>
  <article>
    <h1>Natural Wonders to Visit Before You Die</h1>
    <h2>In North America</h2>
    <h3>The Grand Canyon</h3>
    <h3>Yellowstone National Park</h3>
    <!-- created section so h3s are correctly positioned within outline system-->
    <section>
      <h2>In the Rest of the World</h2>
      <aside></aside>
      <h3>Galapagos Island</h3>
      <h3>The Swiss Alps</h3>
    </section>
  </article>
</body>

<!-- 
  1. Untitled Section (Body)
     1. Natural Wonders to Visit Before You Die
        1. In North America
            1. The Grand Canyon
            2. Yellowstone National Park
        2. In the Rest of the World
           1. Galapagos Island
           2. The Swiss Alps
-->
```

---

---
