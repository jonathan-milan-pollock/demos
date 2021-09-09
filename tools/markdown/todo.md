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

IPTC photo metadata
Alternatively, you can embed IPTC photo metadata directly inside an image. You must include the Web Statement of Rights field for your image to be eligible to be shown with the licensable badge. We recommend that you also add the Licensor URL field if you have that information.

Required properties
Web Statement of Rights
A URL to a page that describes the license governing an image's use, and optionally other rights information. For example, it could be the terms and conditions that you have on your website. Where applicable, it could also be a Creative Commons License (for example, BY-NC 4.0).

https://www.iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#web-statement-of-rights

https://iptc.org/standards/photo-metadata/quick-guide-to-iptc-photo-metadata-and-google-images/

//https://www.plusregistry.org/cgi-bin/WebObjects/PlusDB.woa/2/wo/ezAOMmoVUXbQ9om8Ur1X8w/45.11.8.1

// OpenSeadragon

// ReactGA.initialize('UA-111745461-1');
// TODO: Accessiblity

//a:link { color: blue; } /_ Unvisited links _/
//a:visited { color: purple; } /_ Visited links _/
//a:hover { background: yellow; } /_ Hovered links _/
//a:active { color: red; } /_ Active links _/

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

TODO: Make note about Auth0 roles and how added to the user

# nest

- nestjs add caching (https://reposhub.com/nodejs/frameworks/nestjs-ng-universal.html)

- implement K8 available and ready services
-

```ts
  @Get('status')
  status(): any {
    const { uptime, arch, version, platform } = process
    return {
      version: VERSION,
      stack,
      server: {
        uptime: uptime(),
        arch,
        version,
        platform,
      },
    }
  }
```

// Delete Entity
// 1. Did slug change??
// Need status back on the image
// 2. Did the title, description, keywords, date published change

## source map explorer

export interface Destination {
readonly id?: string;
// TODO identifier
readonly slug: string;
readonly order: number;
// metadata
readonly title?: string;
readonly description?: string;
readonly keywords: string[];
readonly datePublished?: string;
// location
readonly location?: Location;
// display
readonly tileImageIsCentered: boolean;
// content
readonly text: string[];
readonly images: Image[];
readonly imageDimensions: ImageDimension[];
readonly videos: Video[];
readonly comments: Comment[];
readonly emotions: Emotion[];
readonly isPosted: boolean;
}

Image
readonly isStarred: boolean; //TODO: Can star 1 for Social Media
readonly isLoved: boolean; //TODO: Can love 10? for Social Media

Video
readonly isStarred: boolean; //TODO: Can star 1 for Social Media

## references

- [Angular Performance Best Patterns](https://www.youtube.com/watch?v=-eH2gCGHcGs)
- [Angular 10 New Features](https://betterprogramming.pub/angular-10-new-features-dbc779061dc8)
- [Google Analytics](https://analytics.google.com/)
- [Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)
- [Essential Meta Tags](https://css-tricks.com/essential-meta-tags-social-media/)
- [Advertising Sizes](https://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf)
- [iPhone Resolutions](https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions)
- [Node.js can HTTP/2 push!](https://medium.com/the-node-js-collection/node-js-can-http-2-push-b491894e1bb1)
- [Cool Gray](https://medium.com/ge-design/iot-cool-gray-is-a-great-background-color-for-data-visualization-ebf18c318418)
- [GitHub Azure Pipelines](https://azuredevopslabs.com/labs/vstsextend/github-azurepipelines/)
- [Automate Cypress tests on BrowserStack](https://www.browserstack.com/docs/automate/cypress)
- [GIT LFS](https://www.youtube.com/watch?v=uLR1RNqJ1Mw)

---

## best practices Cypress

- Set state directly & programmatically, don't need to use the UI to build up state
- Write specs in isolation without sharing page objects
- Have access to everything so don't limit to acting like a user

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
\*/

it('displays Dark Rush Photography information', () => {
cy.contains('type').click();
cy.url().should('include', '/commands/actions');

    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'face@email.com');

});
