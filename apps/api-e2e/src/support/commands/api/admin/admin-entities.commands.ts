import {
  EntityAdmin,
  EntityMinimalAdmin,
  EntityUpdate,
} from '@dark-rush-photography/shared/types';

Cypress.Commands.add(
  'updateEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityId: string,
    entityUpdate: EntityUpdate
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityId}`,
      headers: {
        ...authHeaders,
      },
      body: {
        ...entityUpdate,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'loadNewImagesEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityId: string
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityId}/load-new-images`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'publishEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityId: string
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityId}/publish`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'setIsProcessingEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityId: string,
    isProcessing: boolean
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityId}/processing/${isProcessing}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findGroupsEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityWithGroupType: string
  ): Cypress.Chainable<Cypress.Response<string[]>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/entity-type/${entityWithGroupType}/groups`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findAllEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityWithoutGroupType: string
  ): Cypress.Chainable<Cypress.Response<EntityMinimalAdmin[]>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/entity-type/${entityWithoutGroupType}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findAllForGroupEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityWithGroupType: string,
    group: string
  ): Cypress.Chainable<Cypress.Response<EntityMinimalAdmin[]>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/entity-type/${entityWithGroupType}/groups/${group}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findOneEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityId: string
  ): Cypress.Chainable<Cypress.Response<EntityAdmin>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/${entityId}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findIsProcessingEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityId: string
  ): Cypress.Chainable<Cypress.Response<boolean>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/${entityId}/processing`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'deleteEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityId: string
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/entities/${entityId}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);
