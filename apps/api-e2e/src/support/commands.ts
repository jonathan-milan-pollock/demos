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
  interface Chainable<Subject>
    extends ApiAuth<Subject>,
      ApiAdminAbout<Subject>,
      ApiAdminBestOf<Subject>,
      ApiAdminDestinations<Subject>,
      ApiAdminEntities<Subject>,
      ApiAdminEvents<Subject>,
      ApiAdminFavorites<Subject>,
      ApiAdminImageDimensions<Subject>,
      ApiAdminImages<Subject> {}

  interface ApiAuth<Subject> {
    authenticateApi(): Promise<string>;
  }

  interface ApiAdminAbout<Subject> {
    createAboutAdmin(slug: string): Cypress.Chainable<Cypress.Response>;
    findAllAboutAdmin(): Cypress.Chainable<Cypress.Response>;
    findOneAboutAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    findIsProcessingAboutAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    deleteAboutAdmin(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiAdminBestOf<Subject> {
    createBestOfAdmin(bestOfType: string): Cypress.Chainable<Cypress.Response>;
    findOneBestOfAdmin(bestOfType: string): Cypress.Chainable<Cypress.Response>;
    findIsProcessingBestOfAdmin(
      bestOfType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response>;
    deleteBestOfAdmin(
      bestOfType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiAdminDestinations<Subject> {
    createDestinationAdmin(slug: string): Cypress.Chainable<Cypress.Response>;
    updateDestinationAdmin(
      id: string,
      destinationUpdate: string
    ): Cypress.Chainable<Cypress.Response>;
    postDestinationAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    findAllDestinationsAdmin(): Cypress.Chainable<Cypress.Response>;
    findOneDestinationAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    findIsProcessingDestinationAdmin(
      id: string
    ): Cypress.Chainable<Cypress.Response>;
    deleteDestinationAdmin(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiAdminEntities<Subject> {
    createEntityAdmin(
      entityType: string,
      entityCreate: string
    ): Cypress.Chainable<Cypress.Response>;
    updateEntityAdmin(
      entityType: string,
      id: string,
      entityUpdate: string
    ): Cypress.Chainable<Cypress.Response>;
    setIsProcessingEntityAdmin(
      entityType: string,
      id: string,
      isProcessing: boolean
    ): Cypress.Chainable<Cypress.Response>;
    findAllEntitiesAdmin(
      entityType: string
    ): Cypress.Chainable<Cypress.Response>;
    findOneEntityAdmin(
      entityType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response>;
    deleteEntityAdmin(
      entityType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiAdminEvents<Subject> {
    createEventAdmin(eventCreate: string): Cypress.Chainable<Cypress.Response>;
    updateEventAdmin(
      id: string,
      eventUpdate: string
    ): Cypress.Chainable<Cypress.Response>;
    postEventAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    findAllEventsAdmin(): Cypress.Chainable<Cypress.Response>;
    findOneEventAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    findIsProcessingEventAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    deleteEventAdmin(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiAdminFavorites<Subject> {
    createFavoriteAdmin(): Cypress.Chainable<Cypress.Response>;
    findOneFavoritesAdmin(): Cypress.Chainable<Cypress.Response>;
    findIsProcessingFavoriteAdmin(
      id: string
    ): Cypress.Chainable<Cypress.Response>;
    deleteFavoritesAdmin(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiAdminImageDimensions<Subject> {
    addImageDimensionAdmin(
      entityId: string,
      imageId: string
    ): Cypress.Chainable<Cypress.Response>;
    updateImageDimensionAdmin(
      id: string,
      entityId: string,
      imageDimensionUpdate: string
    ): Cypress.Chainable<Cypress.Response>;
    findOneImageDimensionAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    dataUriImageDimensionAdmin(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiAdminImages<Subject> {
    addImageAdmin(slug: string): Cypress.Chainable<Cypress.Response>;
    updateImageAdmin(
      slug: string,
      imageUpdate: string
    ): Cypress.Chainable<Cypress.Response>;
    findOneImageAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    postImageAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    removeImageAdmin(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiAdminMediaProcesses<Subject> {
    createMediaProcessAdmin(
      mediaProcessType: string,
      slug: string
    ): Cypress.Chainable<Cypress.Response>;
    processMediaProcessAdmin(
      mediaProcessType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response>;
    findAllMediaProcessesAdmin(
      mediaProcessType: string
    ): Cypress.Chainable<Cypress.Response>;
    findOneMediaProcessAdmin(
      mediaProcessType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response>;
    findIsProcessingMediaProcessAdmin(
      mediaProcessType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response>;
    deleteMediaProcessAdmin(
      mediaProcessType: string,
      id: string
    ): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiAdminPhotoOfTheWeek<Subject> {
    createPhotoOfTheWeekAdmin(
      photoOfTheWeekCreate: string
    ): Cypress.Chainable<Cypress.Response>;
    updatePhotoOfTheWeekAdmin(
      id: string,
      photoOfTheWeekUpdate: string
    ): Cypress.Chainable<Cypress.Response>;
    postPhotoOfTheWeekAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    findAllPhotoOfTheWeekAdmin(): Cypress.Chainable<Cypress.Response>;
    findOnePhotoOfTheWeekAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    findIsProcessingPhotoOfTheWeekAdmin(
      id: string
    ): Cypress.Chainable<Cypress.Response>;
    deletePhotoOfTheWeekAdmin(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface AdminReviewMedia<Subject> {
    createReviewMediaAdmin(): Cypress.Chainable<Cypress.Response>;
    findOneReviewMediaAdmin(): Cypress.Chainable<Cypress.Response>;
    findIsProcessingReviewMediaAdmin(
      id: string
    ): Cypress.Chainable<Cypress.Response>;
    deleteReviewMediaAdmin(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface AdminReviews<Subject> {
    createReviewAdmin(slug: string): Cypress.Chainable<Cypress.Response>;
    updateReviewAdmin(
      slug: string,
      destinationsUpdate: string
    ): Cypress.Chainable<Cypress.Response>;
    postReviewAdmin(): Cypress.Chainable<Cypress.Response>;
    findAllReviewsAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    findOneReviewAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    findIsProcessingReviewAdmin(
      id: string
    ): Cypress.Chainable<Cypress.Response>;
    deleteReviewAdmin(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface AdminSocialMedia<Subject> {
    createSocialMediaAdmin(slug: string): Cypress.Chainable<Cypress.Response>;
    findAllSocialMediaAdmin(): Cypress.Chainable<Cypress.Response>;
    findOneSocialMediaAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    findIsProcessingSocialMediaAdmin(
      id: string
    ): Cypress.Chainable<Cypress.Response>;
    deleteSocialMediaAdmin(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface AdminVideoDimensions<Subject> {
    videoDimensionsCreateAdmin(
      slug: string
    ): Cypress.Chainable<Cypress.Response>;
    videoDimensionsUpdateAdmin(
      slug: string,
      destinationsUpdate: string
    ): Cypress.Chainable<Cypress.Response>;
    videoDimensionsFindAllAdmin(): Cypress.Chainable<Cypress.Response>;
    videoDimensionsFindOneAdmin(
      id: string
    ): Cypress.Chainable<Cypress.Response>;
    videoDimensionsPostAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    videoDimensionsDeleteAdmin(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface AdminVideos<Subject> {
    videosCreateAdmin(slug: string): Cypress.Chainable<Cypress.Response>;
    videosUpdateAdmin(
      slug: string,
      destinationsUpdate: string
    ): Cypress.Chainable<Cypress.Response>;
    videosFindAllAdmin(): Cypress.Chainable<Cypress.Response>;
    videosFindOneAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    videosPostAdmin(id: string): Cypress.Chainable<Cypress.Response>;
    videosDeleteAdmin(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiPublicAbout<Subject> {
    findAllAboutPublic(): Cypress.Chainable<Cypress.Response>;
    findOneAboutPublic(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiPublicBestOf<Subject> {
    bestOfFindOnePublic(
      bestOfType: string
    ): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiPublicDestinations<Subject> {
    findAllDestinationsPublic(): Cypress.Chainable<Cypress.Response>;
    findOneDestinationPublic(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiPublicEvents<Subject> {
    findAllEventsPublic(): Cypress.Chainable<Cypress.Response>;
    findOneEventPublic(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiPublicFavorites<Subject> {
    favoritesFindOnePublic(): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiPublicPhotoOfTheWeek<Subject> {
    findAllPhotoOfTheWeekPublic(): Cypress.Chainable<Cypress.Response>;
    findOnePhotoOfTheWeekPublic(
      id: string
    ): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiPublicReviewMedia<Subject> {
    findOneReviewMediaPublic(): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiPublicReviews<Subject> {
    findAllReviewsPublic(): Cypress.Chainable<Cypress.Response>;
    findOneReviewPublic(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiUserComments<Subject> {
    commentsCreateUser(slug: string): Cypress.Chainable<Cypress.Response>;
    commentsUpdateUser(id: string): Cypress.Chainable<Cypress.Response>;
    commentsDeleteUser(id: string): Cypress.Chainable<Cypress.Response>;
    commentsStartingUser(id: string): Cypress.Chainable<Cypress.Response>;
    commentsEndingUser(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ApiUserEmotions<Subject> {
    emotionsCreateUser(slug: string): Cypress.Chainable<Cypress.Response>;
    emotionsDeleteUser(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ServerlessDataUri<Subject> {
    dataUriImage(slug: string): Cypress.Chainable<Cypress.Response>;
    dataUriVideo(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ServerlessDelete<Subject> {
    emotionsCreateUser(slug: string): Cypress.Chainable<Cypress.Response>;
    emotionsDeleteUser(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ServerlessPost<Subject> {
    postServerless(slug: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ServerlessUpload<Subject> {
    emotionsCreateUser(slug: string): Cypress.Chainable<Cypress.Response>;
    emotionsDeleteUser(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ServerlessSitemap<Subject> {
    dataUriImage(slug: string): Cypress.Chainable<Cypress.Response>;
    dataUriVideo(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ServerlessUpdate<Subject> {
    emotionsCreateUser(slug: string): Cypress.Chainable<Cypress.Response>;
    emotionsDeleteUser(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ServerlessPost<Subject> {
    emotionsCreateUser(slug: string): Cypress.Chainable<Cypress.Response>;
    emotionsDeleteUser(id: string): Cypress.Chainable<Cypress.Response>;
  }

  interface ServerlessMediaProcess<Subject> {
    emotionsCreateUser(slug: string): Cypress.Chainable<Cypress.Response>;
    emotionsDeleteUser(id: string): Cypress.Chainable<Cypress.Response>;
  }
}
