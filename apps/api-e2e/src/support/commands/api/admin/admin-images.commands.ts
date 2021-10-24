import {
  ImageAdmin,
  ImageStates,
  ImageUpdate,
  ThreeSixtyImageAdd,
} from '@dark-rush-photography/shared/types';

Cypress.Commands.add(
  'addThreeSixtyImageAdminImages',
  (
    authHeaders: { Authorization: string },
    entityId: string,
    threeSixtyImageAdd: ThreeSixtyImageAdd
  ): Cypress.Chainable<Cypress.Response<ImageAdmin>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/images/three-sixty-image?entityId=${entityId}`,
      headers: {
        ...authHeaders,
      },
      body: {
        ...threeSixtyImageAdd,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'loadAdminImages',
  (
    authHeaders: { Authorization: string },
    entityId: string,
    imageStates: ImageStates
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/entities/${entityId}/load-new-images`,
      headers: {
        ...authHeaders,
      },
      body: {
        ...imageStates,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateNewImagesAdminImages',
  (
    authHeaders: { Authorization: string },
    entityId: string
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/entities/${entityId}/update-new-images`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'orderPublishImagesAdminImages',
  (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Cypress.Chainable<Cypress.Response<ImageAdmin>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/images/${imageId}?entityId=${entityId}`,
      headers: {
        ...authHeaders,
      },
      body: {
        ...imageUpdate,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'selectNewImagesAdminImages',
  (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string
  ): Cypress.Chainable<Cypress.Response<ImageAdmin>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/images/${imageId}/select-new-images?entityId=${entityId}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateAdminImages',
  (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Cypress.Chainable<Cypress.Response<ImageAdmin>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/images/${imageId}?entityId=${entityId}`,
      headers: {
        ...authHeaders,
      },
      body: {
        ...imageUpdate,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'archiveAdminImages',
  (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string
  ): Cypress.Chainable<Cypress.Response<ImageAdmin>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/images/${imageId}/archive?entityId=${entityId}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'unarchiveAdminImages',
  (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string
  ): Cypress.Chainable<Cypress.Response<ImageAdmin>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/images/${imageId}/unarchive?entityId=${entityId}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'removePublishImageAdminImages',
  (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/images/${imageId}/publish-image?entityId=${entityId}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);
