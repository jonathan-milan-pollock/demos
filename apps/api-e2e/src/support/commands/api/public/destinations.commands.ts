Cypress.Commands.add(
  'findAllDestinationsPublic',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/destinations',
    })
);

Cypress.Commands.add(
  'findOneDestinationPublic',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/destinations/${id}`,
      failOnStatusCode: false,
    })
);
