Cypress.Commands.add(
  'findOneFavoritesPublic',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/favorites`,
      failOnStatusCode: false,
    })
);
