# temp

## references

- [Angular Performance Best Patterns](https://www.youtube.com/watch?v=-eH2gCGHcGs)

- [OnPush Change Detection](https://blog.angular-university.io/onpush-change-detection-how-it-works/)
- [OnPush Change Detection](https://medium.com/@ManfredSteyer/performance-tuning-data-binding-in-angular-with-onpush-immutables-and-observables-9fb2734dc66e)
- [Angular 10 New Features](https://betterprogramming.pub/angular-10-new-features-dbc779061dc8)
- [Google Analytics](https://analytics.google.com/)
- [Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)
- [Essential Meta Tags](https://css-tricks.com/essential-meta-tags-social-media/)
- [Social Media Image Sizes](https://www.mainstreethost.com/blog/social-media-image-size-cheat-sheet/)
- [Advertising Sizes](https://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf)
- [iPhone Resolutions](https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions)
- [Node.js can HTTP/2 push!](https://medium.com/the-node-js-collection/node-js-can-http-2-push-b491894e1bb1)
- [Cool Gray](https://medium.com/ge-design/iot-cool-gray-is-a-great-background-color-for-data-visualization-ebf18c318418)
- [GitHub Azure Pipelines](https://azuredevopslabs.com/labs/vstsextend/github-azurepipelines/)
- [Automate Cypress tests on BrowserStack](https://www.browserstack.com/docs/automate/cypress)
- [GIT LFS](https://www.youtube.com/watch?v=uLR1RNqJ1Mw)

---

```ts
import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address") as HTMLInputElement;

const GOOGLE_API_KEY = ;
// google geocoding api
// google js maps api
// @types/googlemaps

//declare var google: { maps: { Map: any; Marker: any } };

function searchAddressHandler(event: Event) {
  event.preventDefault();

  const enteredAddress = addressInput.value;

  type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: "OK" | "ZERO_RESULTS";
  };

  axios
    .get<GoogleGeocodingResponse>(
      `/https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coordinates,
          zoom: 16,
        }
      );
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.error(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
```

```ts
/*
- @Inject(PLATFORM_ID) private platformId and isPlatformBrowser to check if running in browser (browser api such as localstorage not available)

*/
```

## best practices Cypress

- Set state directly & programmatically, don't need to use the UI to build up state
- Write specs in isolation without sharing page objects
- Have access to everything so don't limit to acting like a user

/\*
describe('website', () => {
it('should display welcome message', () => {
// Custom command example, see `../support/commands.ts` file
cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to website!');

});

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

/\*
it('displays Dark Rush Photography information', () => {});
// eslint-disable-next-line @typescript-eslint/no-empty-function
it('displays Dark Rush information', () => {});

// eslint-disable-next-line @typescript-eslint/no-empty-function
it('displays Milan Pollock information', () => {});
\*/
