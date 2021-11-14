import {
  DUMMY_MONGODB_ID,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Delete Admin Entities', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should delete a created entity', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((id) => cy.deleteAdminEntities(getAuthHeaders(), id))
      .then(() => cy.findAllAdminEntities(getAuthHeaders(), EntityType.Test))
      .its('body.length')
      .should('equal', 0));

  it('should return a status of 204 when delete', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((id) => cy.deleteAdminEntities(getAuthHeaders(), id))
      .its('status')
      .should('equal', 204));

  it('should return a status of 204 when deleting multiple times', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((id) => {
        return cy
          .deleteAdminEntities(getAuthHeaders(), id)
          .then(() => id as string);
      })
      .then((id) => cy.deleteAdminEntities(getAuthHeaders(), id))
      .its('status')
      .should('equal', 204));

  it('should return a status of 204 when attempt to delete id that does not exist', () =>
    cy
      .deleteAdminEntities(getAuthHeaders(), DUMMY_MONGODB_ID)
      .its('status')
      .should('equal', 204));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((id) => {
        return cy.deleteAdminEntities({ Authorization: '' }, id);
      })
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((id) => {
        return cy.deleteAdminEntities({ Authorization: '' }, id);
      })
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
