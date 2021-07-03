import { getAdminHeaders } from '../auth.functions';

Cypress.Commands.add(
  'videoDimensionsCreateAdmin',
  (slug: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/about/${slug}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'videoDimensionsFindAllAdmin',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: '/api/admin/v1/about',
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'videoDimensionsFindOneAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/about/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'videoDimensionsDeleteAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/about/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);
