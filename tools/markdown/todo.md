# todo

- test mobile sizes with

```json
  "viewportHeight": 763,
  "viewportWidth": 700,
```

## manifest

```json
  "related_applications":[
      {
          "platform": "play",
          "url": "https://play.google.com/store/apps/details?id=com.example.app1",
          "id": "com.example.app1"
      }
  ]
```

## create correct image sizes for json-ld

https://www.hillwebcreations.com/valid-image-size-json-ld-snippet-markup/

//https://www.plusregistry.org/cgi-bin/WebObjects/PlusDB.woa/2/wo/ezAOMmoVUXbQ9om8Ur1X8w/45.11.8.1

// OpenSeadragon

// ReactGA.initialize('UA-111745461-1');
// TODO: Accessiblity

        <a
          href="https://github.com/nrwl/nx"
          target="_blank"
          rel="noopener noreferrer"
        >

/_
rel="noopener" prevents the new page from being able to access the window.opener property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL.
rel="noreferrer" has the same effect, but also prevents the Referer header from being sent to the new page. ⚠️ Removing the referrer header will affect analytics.
_/

//TODO: Roboto or Raleway???

## references

- [Angular Performance Best Patterns](https://www.youtube.com/watch?v=-eH2gCGHcGs)
- [Angular 10 New Features](https://betterprogramming.pub/angular-10-new-features-dbc779061dc8)
- [Google Analytics](https://analytics.google.com/)
- [Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)
- [Essential Meta Tags](https://css-tricks.com/essential-meta-tags-social-media/)
- [Advertising Sizes](https://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf)
- [iPhone Resolutions](https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions)
- [Cool Gray](https://medium.com/ge-design/iot-cool-gray-is-a-great-background-color-for-data-visualization-ebf18c318418)
- [Automate Cypress tests on BrowserStack](https://www.browserstack.com/docs/automate/cypress)

---

## change back nameservers

A @ 20.49.104.33 automatic
CNAME www darkrushphoto.azurewebsites.net. automatic

/\*

beforeEach(() => {
cy.task('clear:db');
cy.task('seed:db', userSeed.data);

    cy.visit('http://localhost:8080/login');

    cy.login('amir@cypress.io', '1234');

});

it('load tweets for selected hashtags', () => {
cy.intercept('GET', '/tweets', 'fixture:tweets').as('tweets');

    cy.fixture('tweets').then((tweets) => {
      cy.intercept({
        url: '/tweets',
        response: tweets,
        delay: 3_000, // simulate slow response
        status: 404, // simulate error scenarios
      }).as('tweets');
    });

it('should login a user', () => {
cy.visit('http://localhost:8080/signup');

    cy.location('pathname').should('eq', '/login');

    cy.location('pathname').should('eq', '/board');

});

    cy.window().then((win) => {
      cy.wait('@tweets')
        .its('response.body.tweets')
        .should('have.length', win.app.$store.state.tweets.length);
    });

});

it('should render the component', () => {
cy.get('drp-button').click().should('have.class', 'active');

    cy.request('/users/1').its('body').should('deep.eql', { name: 'Amir' });

    cy.get('#name-input').type('Amir');

    cy.get('#email-input').type('amir@cypress.io');

    cy.get('#form').submit();

    cy.get('#success-message').should('be.visible');

});

});

it('displays Dark Rush Photography information', () => {
cy.contains('type').click();
cy.url().should('include', '/commands/actions');

    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'face@email.com');

});
