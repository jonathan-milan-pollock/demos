import { DUMMY_MONGODB_ID } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

// TODO: Test what happens when google drive folder not found

describe('Load New Images Admin Entity', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return a not found status when called for an invalid entity id', () =>
    cy
      .loadNewImagesEntityAdmin(getAuthHeaders(), DUMMY_MONGODB_ID)
      .its('status')
      .should('equal', 404));

  it('should return an unauthorized status when not logged in', () =>
    cy
      .loadNewImagesEntityAdmin({ Authorization: '' }, DUMMY_MONGODB_ID)
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not logged in', () =>
    cy
      .loadNewImagesEntityAdmin({ Authorization: '' }, DUMMY_MONGODB_ID)
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
