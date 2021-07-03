Cypress.Commands.add(
  'findOneReviewMediaPublic',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/review-media`,
      failOnStatusCode: false,
    })
);
