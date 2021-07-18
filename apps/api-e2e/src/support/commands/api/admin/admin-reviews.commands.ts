import { Review, ReviewUpdate } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createReviewAdmin',
  (slug: string): Cypress.Chainable<Cypress.Response<Review>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/reviews`,
      headers: {
        ...getAuthHeaders(),
      },
      body: {
        slug,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateReviewAdmin',
  (
    id: string,
    reviewUpdate: ReviewUpdate
  ): Cypress.Chainable<Cypress.Response<Review>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/reviews/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      body: { ...reviewUpdate },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'postReviewAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<Review>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/reviews/${id}/post`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findAllReviewsAdmin',
  (): Cypress.Chainable<Cypress.Response<Review[]>> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/admin/reviews',
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneReviewAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<Review>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/reviews/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'deleteReviewAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/reviews/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);
