Cypress.Commands.add(
  'delete',
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
