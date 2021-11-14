import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  ImageAdmin,
  ImageState,
  ImageUpdate,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Update Publish Image Admin Images', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  const imageUpdate: ImageUpdate = {
    threeSixtyImageStorageId: faker.datatype.uuid(),
    isStarred: faker.datatype.boolean(),
    isLoved: faker.datatype.boolean(),
    title: faker.lorem.sentence(),
    seoDescription: faker.lorem.sentences(),
    seoKeywords: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
  };

  it('should update values', () =>
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
              imageUpdate
            )
          )
          .then(() =>
            cy.loadImagesAdminImages(getAuthHeaders(), adminImage.entityId, {
              imageStates: [ImageState.Selected],
            })
          )
          .then((response) => response.body[0] as ImageAdmin)
          .then((updatedAdminImage: ImageAdmin) => {
            const {
              threeSixtyImageStorageId,
              isStarred,
              isLoved,
              title,
              seoDescription,
              seoKeywords,
            } = updatedAdminImage;
            return {
              threeSixtyImageStorageId,
              isStarred,
              isLoved,
              title,
              seoDescription,
              seoKeywords,
            };
          })
          .should('deep.equal', imageUpdate);
      }));

  it('should return a status of 204 when update a published image', () =>
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
              imageUpdate
            )
          );
      })
      .its('status')
      .should('equal', 204));

  it('should return a status of 409 when attempt to update an image that is not a publish image', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) =>
        cy.updatePublishImageAdminImages(
          getAuthHeaders(),
          adminImage.id,
          adminImage.entityId,
          imageUpdate
        )
      )
      .its('status')
      .should('equal', 409));

  it('should return a not found request status when cannot find an entity', () =>
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
              DUMMY_MONGODB_ID,
              imageUpdate
            )
          );
      })
      .its('status')
      .should('equal', 404));

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
            cy.updatePublishImageAdminImages(
              { Authorization: '' },
              adminImage.id,
              DUMMY_MONGODB_ID,
              imageUpdate
            )
          );
      })
      .its('status')
      .should('equal', 401));

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
            cy.updatePublishImageAdminImages(
              { Authorization: '' },
              adminImage.id,
              DUMMY_MONGODB_ID,
              imageUpdate
            )
          );
      })
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
