import {
  DUMMY_MONGODB_ID,
  ImageAdmin,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Remove Publish Image Admin Images', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should remove a publish image', () =>
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
            cy.removePublishImageAdminImages(
              getAuthHeaders(),
              adminImage.id,
              adminImage.entityId
            )
          )
          .then(() =>
            cy.loadImagesAdminImages(getAuthHeaders(), adminImage.entityId, {
              imageStates: [ImageState.Selected],
            })
          )
          .its('body.length')
          .should('equal', 0);
      }));

  it('should return a status of 204 when remove', () =>
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
            cy.removePublishImageAdminImages(
              getAuthHeaders(),
              adminImage.id,
              adminImage.entityId
            )
          )
          .its('status')
          .should('equal', 204);
      }));

  it('should return a status of 204 when removing multiple times', () =>
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
            cy.removePublishImageAdminImages(
              getAuthHeaders(),
              adminImage.id,
              adminImage.entityId
            )
          )
          .then(() =>
            cy.removePublishImageAdminImages(
              getAuthHeaders(),
              adminImage.id,
              adminImage.entityId
            )
          )
          .its('status')
          .should('equal', 204);
      }));

  it('should return a status of 204 when attempt to remove an image that is not a publish image', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) => {
        return cy
          .removePublishImageAdminImages(
            getAuthHeaders(),
            adminImage.id,
            adminImage.entityId
          )
          .its('status')
          .should('equal', 204);
      }));

  it('should return a status of 204 when attempt to remove an image for an entity that does not exist', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) => {
        return cy
          .removePublishImageAdminImages(
            getAuthHeaders(),
            adminImage.id,
            DUMMY_MONGODB_ID
          )
          .its('status')
          .should('equal', 204);
      }));

  it('should return an unauthorized status when not authenticated', () =>
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
            cy.removePublishImageAdminImages(
              { Authorization: '' },
              adminImage.id,
              adminImage.entityId
            )
          )
          .its('status')
          .should('equal', 401);
      }));

  it('should return an unauthorized message when not authenticated', () =>
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
            cy.removePublishImageAdminImages(
              { Authorization: '' },
              adminImage.id,
              adminImage.entityId
            )
          )
          .its('body.message')
          .should('equal', 'Unauthorized');
      }));
});
