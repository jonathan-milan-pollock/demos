/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Import commands.js using ES2015 syntax:
declare namespace Cypress {
  interface Chainable<Subject> {
    // api
    login(): Promise<string>;
    deleteTestData(authHeaders: {
      Authorization: string;
    }): Cypress.Chainable<Cypress.Response<any[]>>;

    // api admin cron processes
    findAllAdminCronProcesses(authHeaders: {
      Authorization: string;
    }): Cypress.Chainable<Cypress.Response<any[]>>;
    findOneAdminCronProcesses(
      authHeaders: {
        Authorization: string;
      },
      key: string
    ): Cypress.Chainable<Cypress.Response<any[]>>;
    deleteAdminCronProcesses(
      authHeaders: {
        Authorization: string;
      },
      key: string
    ): Cypress.Chainable<Cypress.Response<void>>;

    // api admin entities
    createTestAdminEntities(authHeaders: {
      Authorization: string;
    }): Cypress.Chainable<Cypress.Response<any>>;
    orderAdminEntities(
      authHeaders: { Authorization: string },
      entityOrders: any
    ): Cypress.Chainable<Cypress.Response<void>>;
    updateAdminEntities(
      authHeaders: { Authorization: string },
      entityId: string,
      entityUpdate: any
    ): Cypress.Chainable<Cypress.Response<void>>;
    publishAdminEntities(
      authHeaders: { Authorization: string },
      entityId: string,
      postSocialMedia: boolean
    ): Cypress.Chainable<Cypress.Response<void>>;
    findGroupsAdminEntities(
      authHeaders: { Authorization: string },
      entityWithGroupType: string
    ): Cypress.Chainable<Cypress.Response<string[]>>;
    findAllAdminEntities(
      authHeaders: { Authorization: string },
      entityWithoutGroupType: string
    ): Cypress.Chainable<Cypress.Response<any[]>>;
    findAllForGroupAdminEntities(
      authHeaders: { Authorization: string },
      entityWithGroupType: string,
      group: string
    ): Cypress.Chainable<Cypress.Response<any[]>>;
    findOneAdminEntities(
      authHeaders: { Authorization: string },
      entityId: string
    ): Cypress.Chainable<Cypress.Response<any>>;
    deleteAdminEntities(
      authHeaders: { Authorization: string },
      entityId: string
    ): Cypress.Chainable<Cypress.Response<void>>;

    // api admin images
    addTestImageAdminImages(
      authHeaders: { Authorization: string },
      entityId: string
    ): Cypress.Chainable<Cypress.Response<any>>;
    loadImagesAdminImages(
      authHeaders: { Authorization: string },
      entityId: string,
      imageStates: any
    ): Cypress.Chainable<Cypress.Response<any[]>>;
    updateNewImagesAdminImages(
      authHeaders: { Authorization: string },
      entityId: string
    ): Cypress.Chainable<Cypress.Response<void>>;
    orderImagesAdminImages(
      authHeaders: { Authorization: string },
      entityId: string,
      imageOrders: any
    ): Cypress.Chainable<Cypress.Response<void>>;
    selectNewImagesAdminImages(
      authHeaders: { Authorization: string },
      entityId: string,
      imageSelections: any
    ): Cypress.Chainable<Cypress.Response<void>>;
    updatePublishImageAdminImages(
      authHeaders: { Authorization: string },
      imageId: string,
      entityId: string,
      imageUpdate: any
    ): Cypress.Chainable<Cypress.Response<void>>;
    archiveImageAdminImages(
      authHeaders: { Authorization: string },
      imageId: string,
      entityId: string
    ): Cypress.Chainable<Cypress.Response<void>>;
    unarchiveImageAdminImages(
      authHeaders: { Authorization: string },
      imageId: string,
      entityId: string
    ): Cypress.Chainable<Cypress.Response<void>>;
    removePublishImageAdminImages(
      authHeaders: { Authorization: string },
      imageId: string,
      entityId: string
    ): Cypress.Chainable<Cypress.Response<void>>;

    // api public entities
    findAllPublicEntities(
      entityType: string
    ): Cypress.Chainable<Cypress.Response<any>>;
    findOnePublicEntities(
      entityId: string
    ): Cypress.Chainable<Cypress.Response<any>>;
  }
}
