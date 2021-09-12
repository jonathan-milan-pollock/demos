/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars */
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
    watchEntityAdmin(entityType: string, id: string): Promise<any>;
    socialMediaPostEntityAdmin(entityType: string, id: string): Promise<any>;
    updateEntityAdmin(
      entityType: string,
      id: string,
      entityUpdate: any
    ): Promise<any>;
    publishEntityAdmin(entityType: string, id: string): Promise<any>;
    setIsPublishingEntityAdmin(
      entityType: string,
      id: string,
      isPublishing: boolean
    ): Promise<any>;
    findAllGroupsEntityAdmin(entityType: string): Promise<any[]>;
    findAllEntityAdmin(
      entityType: string
    ): Cypress.Chainable<Cypress.Response<any[]>>;
    findOneEntityAdmin(entityType: string, id: string): Promise<any>;
    findIsPublishingEntityAdmin(
      entityType: string,
      id: string
    ): Promise<boolean>;
    deleteEntityAdmin(
      entityType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response<boolean>>;

    // api admin images
    uploadImageAdmin(entityId: string, filePath: string): Promise<any>;
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

    // api admin media processes
    createMediaProcessAdmin(
      mediaProcessType: any,
      mediaProcessCreate: any
    ): Cypress.Chainable<Cypress.Response<any>>;

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

    // api public review-media
    findOneReviewMediaPublic(): Promise<string>;

    // api public reviews
    findAllReviewsPublic(): Promise<string[]>;

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
    authenticateApi(): Promise<string>;
  }
}
