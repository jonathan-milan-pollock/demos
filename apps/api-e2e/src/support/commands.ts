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

    // api admin entities
    updateEntityAdmin(
      authHeaders: { Authorization: string },
      entityId: string,
      entityUpdate: any
    ): Cypress.Chainable<Cypress.Response<void>>;
    loadNewImagesEntityAdmin(
      authHeaders: { Authorization: string },
      entityId: string
    ): Cypress.Chainable<Cypress.Response<void>>;
    publishEntityAdmin(
      authHeaders: { Authorization: string },
      entityId: string
    ): Cypress.Chainable<Cypress.Response<void>>;
    setIsProcessingEntityAdmin(
      authHeaders: { Authorization: string },
      entityId: string,
      isProcessing: boolean
    ): Cypress.Chainable<Cypress.Response<void>>;
    findGroupsEntityAdmin(
      authHeaders: { Authorization: string },
      entityWithGroupType: string
    ): Cypress.Chainable<Cypress.Response<string[]>>;
    findAllEntityAdmin(
      authHeaders: { Authorization: string },
      entityType: string
    ): Cypress.Chainable<Cypress.Response<any[]>>;
    findAllForGroupEntityAdmin(
      authHeaders: { Authorization: string },
      entityWithGroupType: string,
      group: string
    ): Cypress.Chainable<Cypress.Response<any[]>>;
    findOneEntityAdmin(
      authHeaders: { Authorization: string },
      entityId: string
    ): Cypress.Chainable<Cypress.Response<any>>;
    findIsProcessingEntityAdmin(
      authHeaders: { Authorization: string },
      entityId: string
    ): Cypress.Chainable<Cypress.Response<boolean>>;
    deleteEntityAdmin(
      authHeaders: { Authorization: string },
      entityId: string
    ): Cypress.Chainable<Cypress.Response<void>>;

    // api admin image posts
    uploadImagePostAdmin(
      authHeaders: { Authorization: string },
      entityId: string,
      text: string
    ): Promise<any>;

    // api admin images
    updateImageAdmin(
      authHeaders: { Authorization: string },
      imageId: string,
      entityId: string,
      imageUpdate: any
    ): Promise<any>;
    findAllImagesAdmin(
      authHeaders: { Authorization: string },
      entityId: string,
      state: string
    ): Promise<any[]>;
    findOneImageAdmin(
      authHeaders: { Authorization: string },
      imageId: string,
      entityId: string
    ): Promise<any>;
    removeImageAdmin(
      authHeaders: { Authorization: string },
      imageId: string,
      entityId: string
    ): Promise<void>;

    // api public about
    findAllEntitiesPublic(): Promise<string[]>;
    findOneEntityPublic(): Promise<string[]>;

    // api public sitemap
    findSitemapPublic(): Promise<string>;
  }
}
