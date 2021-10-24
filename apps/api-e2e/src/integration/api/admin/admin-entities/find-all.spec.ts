import {
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Find all Admin Entities', () => {
  const entityWithoutGroupTypes = Object.values(EntityWithoutGroupType).filter(
    (entityWithoutGroupType) =>
      entityWithoutGroupType != EntityWithoutGroupType.ImagePost
  );
  const entityWithGroupTypes = Object.values(EntityWithGroupType);

  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return application/json', () =>
    cy
      .findAllAdminEntities(getAuthHeaders(), EntityWithoutGroupType.Test)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json'));

  it('should find all entities', () => {
    cy.createTestAdminEntities(getAuthHeaders()).then(() =>
      entityWithoutGroupTypes.forEach((entityWithoutGroupType) =>
        cy
          .findAllAdminEntities(getAuthHeaders(), entityWithoutGroupType)
          .its('body.length')
          .should('be.greaterThan', 0)
      )
    );
  });

  it('should have a count of 0 when no entities are found', () =>
    cy
      .findAllAdminEntities(getAuthHeaders(), EntityWithoutGroupType.Test)
      .its('body.length')
      .should('equal', 0));

  it('should return a status of 200 when finding entities', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .findAllAdminEntities(getAuthHeaders(), EntityWithoutGroupType.Test)
      .its('status')
      .should('equal', 200));

  it('should return a 400 response when called for an entity that requires a group', () =>
    entityWithGroupTypes.forEach((entityWithGroupType) =>
      cy
        .findAllAdminEntities(getAuthHeaders(), entityWithGroupType)
        .its('status')
        .should('equal', 400)
    ));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .findAllAdminEntities({ Authorization: '' }, EntityWithoutGroupType.Test)
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .findAllAdminEntities({ Authorization: '' }, EntityWithoutGroupType.Test)
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
