import { ImageAdmin, ImageState } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Select New Images Admin Images', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should select new images', () => {
    cy.createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((firstAdminImage: ImageAdmin) => {
        return cy
          .addTestImageAdminImages(getAuthHeaders(), firstAdminImage.entityId)
          .its('body')
          .then((secondAdminImage: ImageAdmin) => {
            return cy
              .selectNewImagesAdminImages(
                getAuthHeaders(),
                secondAdminImage.entityId,
                {
                  imageIds: [firstAdminImage.id, secondAdminImage.id],
                }
              )
              .then(() =>
                cy.loadImagesAdminImages(
                  getAuthHeaders(),
                  firstAdminImage.entityId,
                  {
                    imageStates: [ImageState.Selected],
                  }
                )
              )
              .its('body.length')
              .should('equal', 2);
          });
      });
  });

  it('should only select images requested', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((firstAdminImage: ImageAdmin) => {
        return cy
          .addTestImageAdminImages(getAuthHeaders(), firstAdminImage.entityId)
          .its('body')
          .then((secondAdminImage: ImageAdmin) => {
            return cy
              .selectNewImagesAdminImages(
                getAuthHeaders(),
                secondAdminImage.entityId,
                {
                  imageIds: [firstAdminImage.id],
                }
              )
              .then(() =>
                cy.loadImagesAdminImages(
                  getAuthHeaders(),
                  firstAdminImage.entityId,
                  {
                    imageStates: [ImageState.Selected],
                  }
                )
              )
              .its('body.length')
              .should('equal', 1);
          });
      }));

  it('should not select any images if none are requested', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((firstAdminImage: ImageAdmin) => {
        return cy
          .addTestImageAdminImages(getAuthHeaders(), firstAdminImage.entityId)
          .its('body')
          .then((secondAdminImage: ImageAdmin) => {
            return cy
              .selectNewImagesAdminImages(
                getAuthHeaders(),
                secondAdminImage.entityId,
                {
                  imageIds: [],
                }
              )
              .then(() =>
                cy.loadImagesAdminImages(
                  getAuthHeaders(),
                  firstAdminImage.entityId,
                  {
                    imageStates: [ImageState.Selected],
                  }
                )
              )
              .its('body.length')
              .should('equal', 0);
          });
      }));

  it('should return a status of 204 when loading images', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) =>
        cy
          .selectNewImagesAdminImages(getAuthHeaders(), adminImage.entityId, {
            imageIds: [adminImage.id],
          })
          .its('status')
          .should('equal', 204)
      ));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) =>
        cy
          .selectNewImagesAdminImages(
            { Authorization: '' },
            adminImage.entityId,
            {
              imageIds: [adminImage.id],
            }
          )
          .its('status')
          .should('equal', 401)
      ));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) =>
        cy
          .selectNewImagesAdminImages(
            { Authorization: '' },
            adminImage.entityId,
            {
              imageIds: [adminImage.id],
            }
          )
          .its('body.message')
          .should('equal', 'Unauthorized')
      ));
});
