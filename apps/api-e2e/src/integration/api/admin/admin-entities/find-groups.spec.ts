import {
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Find Admin Entities groups', () => {
  const entityWithGroupTypes = Object.values(EntityWithGroupType);
  const entityWithoutGroupTypes = Object.values(EntityWithoutGroupType);

  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return application/json', () =>
    cy
      .findGroupsEntityAdmin(getAuthHeaders(), EntityWithGroupType.Event)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json'));

  it('should find groups', () =>
    entityWithGroupTypes.forEach((entityWithGroupType) =>
      cy
        .findGroupsEntityAdmin(getAuthHeaders(), entityWithGroupType)
        .its('body.length')
        .should('be.greaterThan', 0)
    ));

  it('should return a status of 200 when returning groups', () =>
    cy
      .findGroupsEntityAdmin(getAuthHeaders(), EntityWithGroupType.Event)
      .its('status')
      .should('equal', 200));

  it('should return a bad request status if called with invalid entity with group type', () =>
    entityWithoutGroupTypes.forEach((entityWithoutGroupType) =>
      cy
        .findGroupsEntityAdmin(getAuthHeaders(), entityWithoutGroupType)
        .its('status')
        .should('equal', 400)
    ));

  it('should return an unauthorized status when not logged in', () =>
    cy
      .findGroupsEntityAdmin({ Authorization: '' }, EntityWithGroupType.Event)
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not logged in', () =>
    cy
      .findGroupsEntityAdmin({ Authorization: '' }, EntityWithGroupType.Event)
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
