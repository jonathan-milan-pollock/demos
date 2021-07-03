Cypress.Commands.add(
  'findAllPhotoOfTheWeekPublic',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/photo-of-the-week',
    })
);

Cypress.Commands.add(
  'findOnePhotoOfTheWeekPublic',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/photo-of-the-week/${id}`,
      failOnStatusCode: false,
    })
);
