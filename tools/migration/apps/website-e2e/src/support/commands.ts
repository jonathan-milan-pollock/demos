// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(url: string): void;
    verifyMetaTag(name: string, text: string): void;
  }
}

Cypress.Commands.add('login', (url: string) => {
  cy.visit('/admin');
  cy.get('[data-testid=sign-in-button]')
    .click()
    .contains('Sign Out')
    .get(`a[href="${url}"]`)
    .click();
});

Cypress.Commands.add('verifyMetaTag', (name: string, text: string) => {
  cy.get(`head meta[name=${name}]`).should('have.attr', 'content', text);
});

/*

Cypress.Commands.add('loginClick', () => {
  cy.visit('/admin');
  cy.get('[data-testid="email"]').type('milan@darkrush.photo');
  cy.get('[data-testid="password"]').type('password');
  cy.get('[data-testid="login-button"]').click();
});

Cypress.Commands.add('loginEnter', () => {
  cy.visit('/admin');
  cy.get('[data-testid="email"]').type('milan@darkrush.photo');
  cy.get('[data-testid="password"]').type('password{enter}');
});
*/

Cypress.Commands.add('loginWithSecurity', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/users/login',
    body: {
      user: {
        email: 'milan@darkrush.photo',
        password: 'password',
      },
    },
  }).then((resp) => {
    window.localStorage.setItem('jwt', resp.body.user.token);
  });
});

/*
// directly call the code that does the login
Cypress.Commands.add('login', (email, password) => {
  return cy.window().then((win) => {
    return win.app.$store.dispatch('login', {
      email: 'amir@cypress.io',
      password: '1234',
    });
  });
});
*/

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
