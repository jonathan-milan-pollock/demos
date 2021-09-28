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
    // api admin entities
    socialMediaPostEntityAdmin(
      entityType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response<any>>;
    updateEntityAdmin(
      entityType: string,
      id: string,
      entityUpdate: any
    ): Cypress.Chainable<Cypress.Response<any>>;
    publishEntityAdmin(
      entityType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response<any>>;
    setIsPublishingEntityAdmin(
      entityType: string,
      id: string,
      isPublishing: boolean
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
      entityType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response<any>>;
    findIsPublishingEntityAdmin(
      entityType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response<boolean>>;
    deleteEntityAdmin(
      authHeaders: { Authorization: string },
      entityType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response<boolean>>;

    // api admin image posts
    createImagePostAdmin(
      authHeaders: { Authorization: string },
      imagePostCreate: any
    ): Cypress.Chainable<Cypress.Response<any>>;
    uploadImagePostAdmin(entityId: string): Promise<any>;

    // api admin images
    uploadThreeSixtyImageAdmin(
      entityId: string,
      filePath: string
    ): Promise<any>;
    updateImageAdmin(
      id: string,
      entityId: string,
      imageUpdate: any
    ): Promise<any>;
    updateThreeSixtySettingsImageAdmin(
      id: string,
      entityId: string,
      imageDimensionType: string,
      threeSixtySettings: any
    ): Promise<any>;
    findAllImagesAdmin(entityId: string, state: string): Promise<any[]>;
    findOneImageAdmin(id: string, entityId: string): Promise<any>;
    streamImageAdmin(
      id: string,
      entityId: string,
      imageDimensionType: string
    ): Promise<any>;
    removeImageAdmin(id: string, entityId: string): Promise<void>;

    // api public about
    findAllAboutPublic(): Promise<string[]>;
    findOneAboutPublic(): Promise<string[]>;

    // api public best-of
    findAllBestOfPublic(): Promise<string[]>;
    findOneBestOfPublic(): Promise<string>;

    // api public destinations
    findAllDestinationsPublic(): Promise<string[]>;
    findOneDestinationPublic(id: string): Promise<string>;

    // api public entity-push-notifications
    // api public events
    findAllEventsPublic(): Promise<string[]>;
    findOneEventPublic(id: string): Promise<string>;

    // api public favorites
    findOneFavoritesPublic(): Promise<string>;

    // api public images
    findOneImagePublic(): Promise<string>;

    // api public photo-of-the-week
    findAllPhotoOfTheWeekPublic(): Promise<string[]>;
    findOnePhotoOfTheWeekPublic(id: string): Promise<string>;

    // api public reviews
    findAllReviewsPublic(): Promise<string[]>;

    // api public review-media
    findOneReviewMediaPublic(): Promise<string>;

    // api public sitemap
    findSitemapPublic(): Promise<string>;

    // api user comments
    addCommentUser(): Promise<string[]>;
    updateCommentUser(
      id: string,
      entityId: string,
      commentUpdate: string
    ): Promise<string>;
    findAllCommentsUser(
      id: string,
      entityId: string,
      mediaId?: string
    ): Promise<string[]>;
    findOneCommentUser(id: string, entityId: string): Promise<string[]>;
    removeCommentUser(id: string, entityId: string): Promise<void>;

    // api user emotions
    addEmotionUser(): Promise<string[]>;
    findAllEmotionsUser(
      id: string,
      entityId: string,
      mediaId?: string
    ): Promise<string[]>;
    findOneEmotionUser(id: string, entityId: string): Promise<string[]>;
    removeEmotionUser(id: string, entityId: string): Promise<void>;

    // api auth
    loginAdmin(): Promise<string>;
    loginUser(): Promise<string>;
  }
}
