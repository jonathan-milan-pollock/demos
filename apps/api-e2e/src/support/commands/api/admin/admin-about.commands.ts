import { getAdminHeaders } from '../auth.functions';

/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars */
Cypress.Commands.add(
  'createAboutAdmin',
  (slug: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/about/${slug}`,
      headers: {
        ...getAdminHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findAllAboutAdmin',
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
  'findOneAboutAdmin',
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
  'findIsProcessingAboutAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/about/${id}/processing`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'deleteAboutAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/about/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);
