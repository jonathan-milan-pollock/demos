import { getAdminHeaders } from '../auth.functions';

Cypress.Commands.add(
  'imageDimensionsCreateAdmin',
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
  'imageDimensionsFindAllAdmin',
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
  'imageDimensionsFindOneAdmin',
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
  'imageDimensionsDeleteAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/about/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);
