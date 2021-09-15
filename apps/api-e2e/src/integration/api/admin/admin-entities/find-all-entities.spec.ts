import { EntityAdminDto } from '@dark-rush-photography/api/types';

const ABOUT = 'About';
const BEST_OF = 'BestOf';
const DESTINATION = 'Destination';
const EVENT = 'Event';
const FAVORITES = 'Favorites';
const IMAGE_POST = 'ImagePost';
const IMAGE_VIDEO = 'ImageVideo';
const THREE_SIXTY_IMAGE_POST = 'ThreeSixtyImagePost';
const PHOTO_OF_THE_WEEK = 'PhotoOfTheWeek';
const REVIEW_MEDIA = 'ReviewMedia';
const REVIEW = 'Review';
const SHARED_PHOTO_ALBUM = 'SharedPhotoAlbum';
const SOCIAL_MEDIA = 'SocialMedia';

describe('findAllEntities', () => {
  beforeEach(() =>
    cy.loginAdmin().then(() =>
      cy
        .findAllEntityAdmin(IMAGE_POST)
        .then(($body) =>
          $body.body.forEach((entityAdmin: EntityAdminDto) =>
            cy.deleteEntityAdmin(entityAdmin.type, entityAdmin.id)
          )
        )
        .findAllEntityAdmin(IMAGE_VIDEO)
        .then(($body) =>
          $body.body.forEach((entityAdmin: EntityAdminDto) =>
            cy.deleteEntityAdmin(entityAdmin.type, entityAdmin.id)
          )
        )
        .findAllEntityAdmin(THREE_SIXTY_IMAGE_POST)
        .then(($body) =>
          $body.body.forEach((entityAdmin: EntityAdminDto) =>
            cy.deleteEntityAdmin(entityAdmin.type, entityAdmin.id)
          )
        )
    )
  );

  it('return application/json', () => {
    cy.findAllEntityAdmin(ABOUT)
      .then((response) => response)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('find about', () => {
    cy.findAllEntityAdmin(ABOUT)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find best of', () => {
    cy.findAllEntityAdmin(BEST_OF)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find destinations', () => {
    cy.findAllEntityAdmin(DESTINATION)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find events for the first group', () => {
    cy.findAllGroupsEntityAdmin(EVENT)
      .then((response) => cy.findAllEntityAdmin(EVENT, response.body[0]))
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find favorites', () => {
    cy.findAllEntityAdmin(FAVORITES)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find image posts', () => {
    cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-1' })
      .then(() =>
        cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-2' })
      )
      .then(() => cy.findAllEntityAdmin(IMAGE_POST))
      .then((response) => response)
      .its('body.length')
      .should('equal', 2);
  });

  it('find image videos', () => {
    cy.createMediaProcessAdmin(IMAGE_VIDEO, { slug: 'test-image-post-1' })
      .then(() =>
        cy.createMediaProcessAdmin(IMAGE_VIDEO, { slug: 'test-image-post-2' })
      )
      .then(() => cy.findAllEntityAdmin(IMAGE_VIDEO))
      .then((response) => response)
      .its('body.length')
      .should('equal', 2);
  });

  it('find three sixty posts', () => {
    cy.createMediaProcessAdmin(THREE_SIXTY_IMAGE_POST, {
      slug: 'test-image-post-1',
    })
      .then(() =>
        cy.createMediaProcessAdmin(THREE_SIXTY_IMAGE_POST, {
          slug: 'test-image-post-2',
        })
      )
      .then(() => cy.findAllEntityAdmin(THREE_SIXTY_IMAGE_POST))
      .then((response) => response)
      .its('body.length')
      .should('equal', 2);
  });

  it('find photo of the week for the first group', () => {
    cy.findAllGroupsEntityAdmin(PHOTO_OF_THE_WEEK)
      .then((response) =>
        cy.findAllEntityAdmin(PHOTO_OF_THE_WEEK, response.body[0])
      )
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find review media', () => {
    cy.findAllEntityAdmin(REVIEW_MEDIA)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find reviews', () => {
    cy.findAllEntityAdmin(REVIEW)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find shared photo albums for the first group', () => {
    cy.findAllGroupsEntityAdmin(SHARED_PHOTO_ALBUM)
      .then((response) =>
        cy.findAllEntityAdmin(SHARED_PHOTO_ALBUM, response.body[0])
      )
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find social media for the first group', () => {
    cy.findAllGroupsEntityAdmin(SOCIAL_MEDIA)
      .then((response) => cy.findAllEntityAdmin(SOCIAL_MEDIA, response.body[0]))
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('should find all created about', () => {
    cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-1' })
      .then(() =>
        cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-2' })
      )
      .then(() => cy.findAllEntityAdmin(IMAGE_POST))
      .its('body.length')
      .should('equal', 2);
  });

  it('should have a count of 0 when no entities for type are created', () => {
    cy.findAllEntityAdmin(IMAGE_POST).its('body.length').should('equal', 0);
  });

  it('return a status of 200 when finding entities', () => {
    cy.findAllEntityAdmin(ABOUT)
      .then((response) => response)
      .its('status')
      .should('equal', 200);
  });

  it('return a bad request status when called without a group for entity with groups', () => {
    cy.findAllEntityAdmin(EVENT)
      .then((response) => response)
      .its('status')
      .should('equal', 400);
  });

  it('return a bad request message when called without a group for entity with groups', () => {
    cy.findAllEntityAdmin(EVENT)
      .then((response) => response)
      .its('body.message')
      .should('equal', 'A group must be provided');
  });
});
