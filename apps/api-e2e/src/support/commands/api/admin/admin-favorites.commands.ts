import { Favorites } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createFavoritesAdmin',
  (): Cypress.Chainable<Cypress.Response<Favorites>> =>
    cy.request({
      method: 'POST',
      url: '/api/v1/admin/favorites',
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findOneFavoriteAdmin',
  (): Cypress.Chainable<Cypress.Response<Favorites>> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/admin/favorites',
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'deleteFavoriteAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/favorites/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);
