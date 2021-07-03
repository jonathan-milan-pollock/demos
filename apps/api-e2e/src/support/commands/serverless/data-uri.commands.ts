Cypress.Commands.add(
  'data-uri-image',
  (accessToken: string, id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/about/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'data-uri-video',
  (accessToken: string, id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/about/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      failOnStatusCode: false,
    })
);
