import { DUMMY_MONGODB_ID } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Publish Admin Entity', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return a not found status when called for an invalid entity id', () =>
    cy
      .publishAdminEntities(getAuthHeaders(), DUMMY_MONGODB_ID, false)
      .its('status')
      .should('equal', 404));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .publishAdminEntities({ Authorization: '' }, DUMMY_MONGODB_ID, false)
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .publishAdminEntities({ Authorization: '' }, DUMMY_MONGODB_ID, false)
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
