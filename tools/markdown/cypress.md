# cypress

## auth0

- enable authentication and authorization in Auth0

  - add a new Single Page Application client Cypress E2E Testing
  - under the application Settings > Advanced Settings > Grant Types enable only Password
  - create 2 users one admin and the other a user

- under Settings of Auth0 (the Tenant) > General > Authorization Settings > Default Directory set value Username-Password-Authentication
  - this prevents the Authorization server not configured with default connection

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

In package.json:

"jest": {
...
"setupFiles": ["./jest-setup-file.ts"]
}
In jest-setup-file.ts:

import 'reflect-metadata';
