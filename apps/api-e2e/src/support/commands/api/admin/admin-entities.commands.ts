import {
  Entity,
  EntityMinimal,
  EntityUpdate,
} from '@dark-rush-photography/shared/types';

Cypress.Commands.add(
  'socialMediaPostEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityType: string,
    id: string
  ): Cypress.Chainable<Cypress.Response<Entity>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/entities/${entityType}/${id}/social-media-post`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityType: string,
    id: string,
    entityUpdate: EntityUpdate
  ): Cypress.Chainable<Cypress.Response<Entity>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityType}/${id}`,
      headers: {
        ...authHeaders,
      },
      body: {
        entityUpdate,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'publishEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityType: string,
    id: string
  ): Cypress.Chainable<Cypress.Response<Entity>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityType}/${id}/publish`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'setIsPublishingEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityType: string,
    id: string,
    isPublishing: boolean
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityType}/${id}/publishing/${isPublishing}`,
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
      url: `/api/v1/admin/entities/${entityWithGroupType}/groups`,
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
    entityType: string
  ): Cypress.Chainable<Cypress.Response<EntityMinimal[]>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/${entityType}`,
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
  ): Cypress.Chainable<Cypress.Response<EntityMinimal[]>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/${entityWithGroupType}/groups/${group}`,
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
    entityType: string,
    id: string
  ): Cypress.Chainable<Cypress.Response<Entity>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/${entityType}/${id}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findIsPublishingEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityType: string,
    id: string
  ): Cypress.Chainable<Cypress.Response<boolean>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/${entityType}/${id}/publishing`,
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
    entityType: string,
    id: string
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/entities/${entityType}/${id}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);
