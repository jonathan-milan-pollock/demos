import {
  Entity,
  EntityMinimal,
  EntityUpdate,
} from '@dark-rush-photography/shared/types';
import { getAuthHeadersAdmin } from '../auth-headers.functions';

Cypress.Commands.add(
  'socialMediaPostEntityAdmin',
  (
    entityType: string,
    id: string
  ): Cypress.Chainable<Cypress.Response<Entity>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/entities/${entityType}/${id}/social-media-post`,
      headers: {
        ...getAuthHeadersAdmin(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateEntityAdmin',
  (
    entityType: string,
    id: string,
    entityUpdate: EntityUpdate
  ): Cypress.Chainable<Cypress.Response<Entity>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityType}/${id}`,
      headers: {
        ...getAuthHeadersAdmin(),
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
    entityType: string,
    id: string
  ): Cypress.Chainable<Cypress.Response<Entity>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityType}/${id}/publish`,
      headers: {
        ...getAuthHeadersAdmin(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'setIsPublishingEntityAdmin',
  (
    entityType: string,
    id: string,
    isPublishing: boolean
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityType}/${id}/publishing/${isPublishing}`,
      headers: {
        ...getAuthHeadersAdmin(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findGroupsEntityAdmin',
  (
    authHeaders: { Authorization: string },
    entityType: string
  ): Cypress.Chainable<Cypress.Response<string[]>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/${entityType}/groups`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findAllEntityAdmin',
  (
    entityType: string,
    group?: string
  ): Cypress.Chainable<Cypress.Response<EntityMinimal[]>> =>
    cy.request({
      method: 'GET',
      url: group
        ? `/api/v1/admin/entities/${entityType}?group=${group}`
        : `/api/v1/admin/entities/${entityType}`,
      headers: {
        ...getAuthHeadersAdmin(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findOneEntityAdmin',
  (
    entityType: string,
    id: string
  ): Cypress.Chainable<Cypress.Response<Entity>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/${entityType}/${id}`,
      headers: {
        ...getAuthHeadersAdmin(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findIsPublishingEntityAdmin',
  (
    entityType: string,
    id: string
  ): Cypress.Chainable<Cypress.Response<boolean>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/${entityType}/${id}/publishing`,
      headers: {
        ...getAuthHeadersAdmin(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'deleteEntityAdmin',
  (entityType: string, id: string): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/entities/${entityType}/${id}`,
      headers: {
        ...getAuthHeadersAdmin(),
      },
      failOnStatusCode: false,
    })
);
