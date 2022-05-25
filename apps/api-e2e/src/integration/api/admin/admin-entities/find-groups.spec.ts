import {
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Find Admin Entity groups', () => {
  const entityWithGroupTypes = Object.values(EntityWithGroupType);
  const entityWithoutGroupTypes = Object.values(EntityWithoutGroupType);

  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return application/json', () =>
    cy
      .findGroupsAdminEntities(getAuthHeaders(), EntityWithGroupType.Event)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json'));

  it('should find groups', () =>
    entityWithGroupTypes.forEach((entityWithGroupType) =>
      cy
        .findGroupsAdminEntities(getAuthHeaders(), entityWithGroupType)
        .its('body.length')
        .should('be.greaterThan', 0)
    ));

  it('should return a status of 200 when returning groups', () =>
    cy
      .findGroupsAdminEntities(getAuthHeaders(), EntityWithGroupType.Event)
      .its('status')
      .should('equal', 200));

  it('should return a 400 response if called with invalid entity with group type', () =>
    entityWithoutGroupTypes.forEach((entityWithoutGroupType) =>
      cy
        .findGroupsAdminEntities(getAuthHeaders(), entityWithoutGroupType)
        .its('status')
        .should('equal', 400)
    ));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .findGroupsAdminEntities({ Authorization: '' }, EntityWithGroupType.Event)
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .findGroupsAdminEntities({ Authorization: '' }, EntityWithGroupType.Event)
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
