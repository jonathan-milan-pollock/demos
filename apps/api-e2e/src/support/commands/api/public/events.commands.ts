Cypress.Commands.add(
  'findAllEventsPublic',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/events',
    })
);

Cypress.Commands.add(
  'findOneEventPublic',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/events/${id}`,
      failOnStatusCode: false,
    })
);
