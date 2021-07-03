Cypress.Commands.add(
  'findAllReviewsPublic',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/reviews',
    })
);

Cypress.Commands.add(
  'findOneReviewPublic',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/reviews/${id}`,
      failOnStatusCode: false,
    })
);
