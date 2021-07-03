import { getAdminHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createFavoritesAdmin',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'POST',
      url: '/api/admin/v1/favorites',
      headers: {
        ...getAdminHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findOneFavoriteAdmin',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: '/api/admin/v1/favorites',
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findIsProcessingFavoriteAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/favorites/${id}/processing`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'deleteFavoriteAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/favorites/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);
