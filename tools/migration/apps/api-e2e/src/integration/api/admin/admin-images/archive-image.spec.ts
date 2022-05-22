import {
  DUMMY_MONGODB_ID,
  ImageAdmin,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Archive Image Admin Images', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return a status of 409 when archive an image that is not a public image', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) =>
        cy.archiveImageAdminImages(
          getAuthHeaders(),
          adminImage.id,
          adminImage.entityId
        )
      )
      .its('status')
      .should('equal', 409));

  it('should return a not found status when cannot find an entity', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.addTestImageAdminImages(getAuthHeaders(), entityId)
      )
      .its('body')
      .then((adminImage: ImageAdmin) =>
        cy.archiveImageAdminImages(
          getAuthHeaders(),
          adminImage.id,
          DUMMY_MONGODB_ID
        )
      )
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
      .then((adminImage: ImageAdmin) =>
        cy.archiveImageAdminImages(
          { Authorization: '' },
          adminImage.id,
          DUMMY_MONGODB_ID
        )
      )
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
      .then((adminImage: ImageAdmin) =>
        cy.archiveImageAdminImages(
          { Authorization: '' },
          adminImage.id,
          DUMMY_MONGODB_ID
        )
      )
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
