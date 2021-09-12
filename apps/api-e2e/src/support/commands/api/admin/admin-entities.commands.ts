/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'watchEntityAdmin',
  (entityType: string, id: string): Cypress.Chainable<Cypress.Response<any>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/entities/${entityType}/${id}/watch`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'socialMediaPostEntityAdmin',
  (entityType: string, id: string): Cypress.Chainable<Cypress.Response<any>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/entities/${entityType}/${id}/social-media-post`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateEntityAdmin',
  (
    entityType: string,
    id: string,
    entityUpdate: any
  ): Cypress.Chainable<Cypress.Response<any>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityType}/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      body: {
        entityUpdate,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'publishEntityAdmin',
  (entityType: string, id: string): Cypress.Chainable<Cypress.Response<any>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityType}/${id}/publish`,
      headers: {
        ...getAuthHeaders(),
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
  ): Cypress.Chainable<Cypress.Response<any>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityType}/${id}/publishing/${isPublishing}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findAllGroupsEntityAdmin',
  (entityType: string): Cypress.Chainable<Cypress.Response<string[]>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/${entityType}/groups`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findAllEntityAdmin',
  (
    entityType: string,
    group?: string
  ): Cypress.Chainable<Cypress.Response<any[]>> =>
    cy.request({
      method: 'GET',
      url: group
        ? `/api/v1/admin/entities/${entityType}?group=${group}`
        : `/api/v1/admin/entities/${entityType}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findOneEntityAdmin',
  (
    entityType: string,
    id: string
  ): Cypress.Chainable<Cypress.Response<any[]>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/entities/${entityType}/${id}`,
      headers: {
        ...getAuthHeaders(),
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
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'deleteEntityAdmin',
  (
    entityType: string,
    id: string
  ): Cypress.Chainable<Cypress.Response<boolean>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/entities/${entityType}/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);
