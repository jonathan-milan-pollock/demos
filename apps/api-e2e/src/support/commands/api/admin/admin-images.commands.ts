import {
  ImageAdmin,
  ImageOrders,
  ImageSelections,
  ImageStates,
  ImageUpdate,
} from '@dark-rush-photography/shared/types';

Cypress.Commands.add(
  'addTestImageAdminImages',
  (
    authHeaders: { Authorization: string },
    entityId: string
  ): Cypress.Chainable<Cypress.Response<ImageAdmin>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/images/test-image?entityId=${entityId}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'loadImagesAdminImages',
  (
    authHeaders: { Authorization: string },
    entityId: string,
    imageStates: ImageStates
  ): Cypress.Chainable<Cypress.Response<ImageAdmin[]>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/images/load?entityId=${entityId}`,
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
      url: `/api/v1/admin/images/update-new-images?entityId=${entityId}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'orderImagesAdminImages',
  (
    authHeaders: { Authorization: string },
    entityId: string,
    imageOrders: ImageOrders
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/images/order-images?entityId=${entityId}`,
      headers: {
        ...authHeaders,
      },
      body: {
        ...imageOrders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'selectNewImagesAdminImages',
  (
    authHeaders: { Authorization: string },
    entityId: string,
    imageSelections: ImageSelections
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/images/select-new-images?entityId=${entityId}`,
      headers: {
        ...authHeaders,
      },
      body: {
        ...imageSelections,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updatePublishImageAdminImages',
  (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/images/${imageId}/update-publish-image?entityId=${entityId}`,
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
  'archiveImageAdminImages',
  (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string
  ): Cypress.Chainable<Cypress.Response<void>> =>
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
  'unarchiveImageAdminImages',
  (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string
  ): Cypress.Chainable<Cypress.Response<void>> =>
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
