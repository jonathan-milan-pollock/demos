import { ReviewMedia } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createReviewMediaAdmin',
  (): Cypress.Chainable<Cypress.Response<ReviewMedia>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/review-media`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findOneReviewMediaAdmin',
  (): Cypress.Chainable<Cypress.Response<ReviewMedia>> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/admin/review-media',
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'deleteReviewMediaAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/review-media/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);
