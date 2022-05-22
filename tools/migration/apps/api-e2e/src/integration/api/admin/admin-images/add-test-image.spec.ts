import {
  DUMMY_MONGODB_ID,
  ImageAdmin,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Add Test Image Admin Images', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return application/json', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('headers')
      .its('content-type')
      .should('include', 'application/json'));

  it('should add a test image', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) => {
        return cy
          .loadImagesAdminImages(getAuthHeaders(), adminImage.entityId, {
            imageStates: [ImageState.New],
          })
          .its('body')
          .then((adminImages) => adminImages[0].id)
          .should('equal', adminImage.id);
      }));

  it('should add multiple test images', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) =>
        cy.addTestImageAdminImages(getAuthHeaders(), adminImage.entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) =>
        cy.loadImagesAdminImages(getAuthHeaders(), adminImage.entityId, {
          imageStates: [ImageState.New],
        })
      )
      .its('body')
      .then((adminImages: ImageAdmin[]) =>
        expect(adminImages.length).equal(2)
      ));

  it('should return a status of 201 when added', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('status')
      .should('equal', 201));

  it('should return a not found request status when cannot find an entity', () =>
    cy
      .addTestImageAdminImages(getAuthHeaders(), DUMMY_MONGODB_ID)
      .its('status')
      .should('equal', 404));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .addTestImageAdminImages({ Authorization: '' }, DUMMY_MONGODB_ID)
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .addTestImageAdminImages({ Authorization: '' }, DUMMY_MONGODB_ID)
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
