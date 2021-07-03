import { ReviewUpdate } from '@dark-rush-photography/shared/types';
import { getAdminHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createReviewAdmin',
  (slug: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/reviews/${slug}`,
      headers: {
        ...getAdminHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateReviewAdmin',
  (
    id: string,
    reviewUpdate: ReviewUpdate
  ): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'PUT',
      url: `/api/admin/v1/reviews/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
      body: { ...reviewUpdate },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'postReviewAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/reviews/${id}/post`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findAllReviewsAdmin',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: '/api/admin/v1/reviews',
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneReviewAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/reviews/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findIsProcessingReviewAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/reviews/${id}/processing`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'deleteReviewAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/reviews/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);
