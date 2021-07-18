import { BestOf, BestOfType } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createBestOfAdmin',
  (bestOfType: BestOfType): Cypress.Chainable<Cypress.Response<BestOf>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/best-of/${bestOfType}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findOneBestOfAdmin',
  (bestOfType: BestOfType): Cypress.Chainable<Cypress.Response<BestOf>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/best-of/${bestOfType}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'deleteBestOfAdmin',
  (
    bestOfType: BestOfType,
    id: string
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/best-of/${bestOfType}/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);
