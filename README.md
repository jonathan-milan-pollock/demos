# Magenic Masters React 
 
## Class Description 

React has been one of the top three front-end JavaScript frameworks for the past 5 years running, you know the others at least by name 😊 (Angular and Vue).  In the world of JavaScript where a new framework comes out every week, this is a lifetime.  With origins at Facebook and support throughout the Microsoft office suite of products, React is continuing to advance and be relevant in the browser and for mobile in the years to come. 

## About Your Proctor

Jonathan Pollock is a full-stack developer and Lead Consultant for Magenic with over 20 years of development experience and a master's in computer science from the University of Michigan. He has developed and designed business solutions in many frameworks and languages. During his masters, he developed extensive mobile projects for iOS and Android. His current areas of interest are React, React Native and XR application development. 

I am looking forward to working with everyone in the class to learn React, Hooks and a little Redux, this will be fun! 

## GitHub React Framework
 
General suggestions, as React is an un-opinionated framework these are merely suggestions in no particular order 😊:
* 200 lines for max component size is generally about right, frequently the number of lines per component will be less
* Use prettier and lint together for clean code as in project
* Think responsive design for mobile first and SEO concerns
* Unit test components, recommend integration tests are written server side and also recommend SpecFlow
* If needed add authentication early, Auth0 and Okta provide examples
* Depending on SEO requirements consider if React Server-side Rendering (SSR) is required or if prerender.io and helmet  (https://github.com/staylor/react-helmet-async) are sufficient 
* Be careful not to over architect components, while shared components are recommended, when you begin to add conditional properties to components they can become fragile
* Material Design (https://material-ui.com) components are wonderful!
* Choose a theme, font https://github.com/KyleAMathews/typefaces/tree/master/packages, and if using FontAwesome use https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core for tree shaking
* Use TypeScript for compile (transpile) time and PropTypes for runtime type safety 
* Develop page structure and urls for the site early, even pages that only display their name ‘Home Page’, help in developing the site.  Consider SEO when developing urls. 
* Recommend JavaScript styles and sass only as needed
* Use current language features (https://derickbailey.com/2017/06/06/3-features-of-es7-and-beyond-that-you-should-be-using-now/)
* Use functions instead of inline if with logical && operator, as it’s difficult to read and maintain (https://reactjs.org/docs/conditional-rendering.html)
* Add third-party components early to to application if known in advance
* Use Fragments instead of <></> or unnecessary divs
* Use arrow functions not binding
* Snapshot testing and tests for styles are fragile
