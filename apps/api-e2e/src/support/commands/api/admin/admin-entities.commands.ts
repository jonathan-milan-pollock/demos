import {
  EntityCreate,
  EntityType,
  EntityUpdate,
} from '@dark-rush-photography/shared/types';
import { getAdminHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createEntityAdmin',
  (
    entityType: EntityType,
    entityCreate: EntityCreate
  ): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/entities/${entityType}`,
      headers: {
        ...getAdminHeaders(),
      },
      body: { ...entityCreate },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateEntityAdmin',
  (
    entityType: EntityType,
    id: string,
    entityUpdate: EntityUpdate
  ): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'PUT',
      url: `/api/admin/v1/entities/${entityType}/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
      body: { ...entityUpdate },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'setIsProcessingEntityAdmin',
  (
    entityType: EntityType,
    id: string,
    isProcessing: boolean
  ): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'PUT',
      url: `/api/admin/v1/entities/${entityType}/${id}/processing/${isProcessing}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findAllEntitiesAdmin',
  (entityType: EntityType): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/entities/${entityType}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneEntityAdmin',
  (entityType: EntityType, id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/entities/${entityType}/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'deleteEntityAdmin',
  (entityType: EntityType, id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/entities/${entityType}/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);
