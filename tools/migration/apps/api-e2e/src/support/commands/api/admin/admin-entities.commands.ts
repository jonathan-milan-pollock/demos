import {
  EntityAdmin,
  EntityOrders,
  EntityUpdate,
} from '@dark-rush-photography/shared/types';

Cypress.Commands.add(
  'createTestAdminEntities',
  (authHeaders: {
    Authorization: string;
  }): Cypress.Chainable<Cypress.Response<EntityAdmin>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/entities/test`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'orderAdminEntities',
  (
    authHeaders: { Authorization: string },
    entityOrders: EntityOrders
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/order`,
      headers: {
        ...authHeaders,
      },
      body: {
        ...entityOrders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateAdminEntities',
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
  'publishAdminEntities',
  (
    authHeaders: { Authorization: string },
    entityId: string,
    postSocialMedia: boolean
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityId}/publish?postSocialMedia=${postSocialMedia}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findGroupsAdminEntities',
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
  'findAllAdminEntities',
  (
    authHeaders: { Authorization: string },
    entityWithoutGroupType: string
  ): Cypress.Chainable<Cypress.Response<EntityAdmin[]>> =>
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
  'findAllForGroupAdminEntities',
  (
    authHeaders: { Authorization: string },
    entityWithGroupType: string,
    group: string
  ): Cypress.Chainable<Cypress.Response<EntityAdmin[]>> =>
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
  'findOneAdminEntities',
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
  'deleteAdminEntities',
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
