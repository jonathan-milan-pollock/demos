import { DUMMY_MONGODB_ID } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Update New Images Admin Images', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return a 204 status when updating new images', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.updateNewImagesAdminImages(getAuthHeaders(), entityId)
      )
      .its('status')
      .should('equal', 204));

  it('should return a not found status when cannot find an entity', () =>
    cy
      .updateNewImagesAdminImages(getAuthHeaders(), DUMMY_MONGODB_ID)
      .its('status')
      .should('equal', 404));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .updateNewImagesAdminImages({ Authorization: '' }, DUMMY_MONGODB_ID)
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .updateNewImagesAdminImages({ Authorization: '' }, DUMMY_MONGODB_ID)
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
