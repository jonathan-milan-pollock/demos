import { ImageAdmin, ImageState } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Load Images Admin Images', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return application/json', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.loadImagesAdminImages(getAuthHeaders(), entityId, {
          imageStates: [],
        })
      )
      .its('headers')
      .its('content-type')
      .should('include', 'application/json'));

  it('should have a count of 0 when no image states are provided', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body.entityId')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body.entityId')
      .then((entityId) =>
        cy.loadImagesAdminImages(getAuthHeaders(), entityId, {
          imageStates: [],
        })
      )
      .its('body.length')
      .should('equal', 0));

  it('should load new images with an image state of new', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body.entityId')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body.entityId')
      .then((entityId) =>
        cy.loadImagesAdminImages(getAuthHeaders(), entityId, {
          imageStates: [ImageState.New],
        })
      )
      .its('body.length')
      .should('equal', 2));

  it('should load selected images with an image state of selected', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) => {
        return cy
          .selectNewImagesAdminImages(getAuthHeaders(), adminImage.entityId, {
            imageIds: [adminImage.id],
          })
          .then(() =>
            cy.loadImagesAdminImages(getAuthHeaders(), adminImage.entityId, {
              imageStates: [ImageState.Selected],
            })
          )
          .its('body.length')
          .should('equal', 1);
      }));

  it('should load public images with an image state of public', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) => {
        return cy
          .selectNewImagesAdminImages(getAuthHeaders(), adminImage.entityId, {
            imageIds: [adminImage.id],
          })
          .then(() =>
            cy.updatePublishImageAdminImages(
              getAuthHeaders(),
              adminImage.id,
              adminImage.entityId,
              {
                state: ImageState.Public,
                isThreeSixtyImage: adminImage.isThreeSixtyImage,
                isThreeSixtyImageStorageId: adminImage.threeSixtyImageStorageId,
                isStarred: adminImage.isStarred,
                isLoved: adminImage.isLoved,
                title: adminImage.title,
                seoDescription: adminImage.seoDescription,
                seoKeywords: adminImage.seoKeywords,
              }
            )
          )
          .then(() =>
            cy.loadImagesAdminImages(getAuthHeaders(), adminImage.entityId, {
              imageStates: [ImageState.Public],
            })
          )
          .its('body.length')
          .should('equal', 1);
      }));

  it('should load archived images with an image state of archived', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) => {
        return cy
          .selectNewImagesAdminImages(getAuthHeaders(), adminImage.entityId, {
            imageIds: [adminImage.id],
          })
          .then(() =>
            cy.updatePublishImageAdminImages(
              getAuthHeaders(),
              adminImage.id,
              adminImage.entityId,
              {
                state: ImageState.Public,
                isThreeSixtyImage: adminImage.isThreeSixtyImage,
                isThreeSixtyImageStorageId: adminImage.threeSixtyImageStorageId,
                isStarred: adminImage.isStarred,
                isLoved: adminImage.isLoved,
                title: adminImage.title,
                seoDescription: adminImage.seoDescription,
                seoKeywords: adminImage.seoKeywords,
              }
            )
          )
          .then(() =>
            cy.archiveImageAdminImages(
              getAuthHeaders(),
              adminImage.id,
              adminImage.entityId
            )
          )
          .then(() =>
            cy.loadImagesAdminImages(getAuthHeaders(), adminImage.entityId, {
              imageStates: [ImageState.Archived],
            })
          )
          .its('body.length')
          .should('equal', 1);
      }));

  it('should load images with multiple image states', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body.entityId')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) => {
        return cy
          .selectNewImagesAdminImages(getAuthHeaders(), adminImage.entityId, {
            imageIds: [adminImage.id],
          })
          .then(() =>
            cy.loadImagesAdminImages(getAuthHeaders(), adminImage.entityId, {
              imageStates: [ImageState.New, ImageState.Selected],
            })
          )
          .its('body.length')
          .should('equal', 2);
      }));

  it('should return a status of 200 when loading images', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.loadImagesAdminImages(getAuthHeaders(), entityId, {
          imageStates: [],
        })
      )
      .its('status')
      .should('equal', 200));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.loadImagesAdminImages({ Authorization: '' }, entityId, {
          imageStates: [],
        })
      )
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.loadImagesAdminImages({ Authorization: '' }, entityId, {
          imageStates: [],
        })
      )
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
