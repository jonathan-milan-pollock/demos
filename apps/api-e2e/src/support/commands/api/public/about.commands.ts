Cypress.Commands.add(
  'findAllAboutPublic',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/about',
    })
);

Cypress.Commands.add(
  'findOneAboutPublic',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/about/${id}`,
      failOnStatusCode: false,
    })
);
