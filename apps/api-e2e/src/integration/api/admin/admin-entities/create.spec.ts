import { EntityWithoutGroupType } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Create Admin Entities', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return application/json', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('headers')
      .its('content-type')
      .should('include', 'application/json'));

  it('should create a test entity', () => {
    cy.createTestAdminEntities(getAuthHeaders())
      .its('body.type')
      .should('equal', 'Test');
  });

  it('should create multiple test entities', () => {
    cy.createTestAdminEntities(getAuthHeaders());
    cy.createTestAdminEntities(getAuthHeaders());
    cy.findAllAdminEntities(getAuthHeaders(), EntityWithoutGroupType.Test)
      .its('body.length')
      .should('equal', 2);
  });

  it('should return a status of 201 when created', () => {
    cy.createTestAdminEntities(getAuthHeaders())
      .its('status')
      .should('equal', 201);
  });

  it('should return an unauthorized status when not authenticated', () => {
    cy.createTestAdminEntities({ Authorization: '' })
      .its('status')
      .should('equal', 401);
  });

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .createTestAdminEntities({ Authorization: '' })
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
