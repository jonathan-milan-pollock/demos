import {
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Find all Admin Entities for a group', () => {
  const entityWithGroupTypes = Object.values(EntityWithGroupType);
  const entityWithoutGroupTypes = Object.values(EntityWithoutGroupType);

  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return application/json', () =>
    cy
      .findGroupsAdminEntities(getAuthHeaders(), EntityWithGroupType.Event)
      .then((response) => response.body[0])
      .then((group) =>
        cy.findAllForGroupAdminEntities(
          getAuthHeaders(),
          EntityWithGroupType.Event,
          group
        )
      )
      .its('headers')
      .its('content-type')
      .should('include', 'application/json'));

  it('should find entities with groups', () =>
    entityWithGroupTypes.forEach((entityWithGroupType) =>
      cy
        .findGroupsAdminEntities(getAuthHeaders(), entityWithGroupType)
        .then((response) => response.body[0])
        .then((group) =>
          cy.findAllForGroupAdminEntities(
            getAuthHeaders(),
            entityWithGroupType,
            group
          )
        )
        .its('body.length')
        .should('be.greaterThan', 0)
    ));

  it('should return a status of 200 when finding entities', () =>
    cy
      .findGroupsAdminEntities(getAuthHeaders(), EntityWithGroupType.Event)
      .then((response) => response.body[0])
      .then((group) =>
        cy.findAllForGroupAdminEntities(
          getAuthHeaders(),
          EntityWithGroupType.Event,
          group
        )
      )
      .its('status')
      .should('equal', 200));

  it('should return a 400 response if called for an entity without a group', () =>
    entityWithoutGroupTypes.forEach((entityWithoutGroupType) =>
      cy
        .findGroupsAdminEntities(getAuthHeaders(), entityWithoutGroupType)
        .then((response) => response.body[0])
        .then((group) =>
          cy.findAllForGroupAdminEntities(
            getAuthHeaders(),
            entityWithoutGroupType,
            group
          )
        )
        .its('status')
        .should('equal', 400)
    ));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .findGroupsAdminEntities(getAuthHeaders(), EntityWithGroupType.Event)
      .then((response) => response.body[0])
      .then((group) =>
        cy.findAllForGroupAdminEntities(
          { Authorization: '' },
          EntityWithGroupType.Event,
          group
        )
      )
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .findGroupsAdminEntities(getAuthHeaders(), EntityWithGroupType.Event)
      .then((response) => response.body[0])
      .then((group) =>
        cy.findAllForGroupAdminEntities(
          { Authorization: '' },
          EntityWithGroupType.Event,
          group
        )
      )
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
