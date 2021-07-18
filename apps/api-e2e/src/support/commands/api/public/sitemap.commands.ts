import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'findSitemapEntityAdmin',
  (): Cypress.Chainable<Cypress.Response<string>> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/admin/entities/sitemap',
      headers: {
        ...getAuthHeaders(),
      },
    })
);
