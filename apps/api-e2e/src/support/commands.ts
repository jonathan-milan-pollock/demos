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
    deleteTestEntities(authHeaders: {
      Authorization: string;
    }): Cypress.Chainable<Cypress.Response<any[]>>;
    deleteTestCronProcesses(authHeaders: {
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
      entityWithoutGroupType: string,
      entityOrders: any
    ): Cypress.Chainable<Cypress.Response<void>>;
    orderForGroupAdminEntities(
      authHeaders: { Authorization: string },
      entityWithGroupType: string,
      group: string,
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
    loadNewImagesAdminEntities(
      authHeaders: { Authorization: string },
      entityId: string
    ): Cypress.Chainable<Cypress.Response<void>>;

    addThreeSixtyImageAdmin(
      authHeaders: { Authorization: string },
      entityId: string,
      threeSixtyImageAdd: any
    ): Cypress.Chainable<Cypress.Response<any>>;
    updateImageAdmin(
      authHeaders: { Authorization: string },
      imageId: string,
      entityId: string,
      imageUpdate: any
    ): Cypress.Chainable<Cypress.Response<any>>;
    selectImageAdmin(
      authHeaders: { Authorization: string },
      imageId: string,
      entityId: string
    ): Cypress.Chainable<Cypress.Response<any>>;
    archiveImageAdmin(
      authHeaders: { Authorization: string },
      imageId: string,
      entityId: string
    ): Cypress.Chainable<Cypress.Response<any>>;
    unarchiveImageAdmin(
      authHeaders: { Authorization: string },
      imageId: string,
      entityId: string
    ): Cypress.Chainable<Cypress.Response<any>>;
    removeImageAdmin(
      authHeaders: { Authorization: string },
      imageId: string,
      entityId: string
    ): Cypress.Chainable<Cypress.Response<void>>;

    // api public entities
    findAllPublicEntities(
      entityType: string
    ): Cypress.Chainable<Cypress.Response<any[]>>;
    findOnePublicEntities(
      entityType: string,
      entityId: string
    ): Cypress.Chainable<Cypress.Response<any>>;

    // api public sitemap
    loadDarkRushPhotographySitemap(): Cypress.Chainable<
      Cypress.Response<string>
    >;
    loadThirtySevenPhotosSitemap(): Cypress.Chainable<Cypress.Response<string>>;
  }
}
