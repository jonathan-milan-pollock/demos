import { EntityType } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'setIsProcessingEntityAdmin',
  (
    entityType: EntityType,
    id: string,
    isProcessing: boolean
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityType}/${id}/processing/${isProcessing}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findIsProcessingEntityAdmin',
  (
    entityType: EntityType,
    id: string
  ): Cypress.Chainable<Cypress.Response<boolean>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/${entityType}/${id}/processing`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);
