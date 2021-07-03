import { getAdminHeaders } from '../auth.functions';

Cypress.Commands.add(
  'videosCreateAdmin',
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
  'videosFindAllAdmin',
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
  'videosFindOneAdmin',
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
  'videosDeleteAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/about/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);
