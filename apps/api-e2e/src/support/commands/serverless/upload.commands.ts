Cypress.Commands.add(
  'upload-image',
  (accessToken: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: '/api/admin/v1/about',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
);

Cypress.Commands.add(
  'upload-lightroom-image',
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
  'upload-three-sixty-image',
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
  'upload-video',
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
