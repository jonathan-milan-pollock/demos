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
      .findGroupsEntityAdmin(getAuthHeaders(), EntityWithGroupType.Event)
      .then((response) => {
        const group = response.body[0];
        return cy.findAllForGroupEntityAdmin(
          getAuthHeaders(),
          EntityWithGroupType.Event,
          group
        );
      })
      .its('headers')
      .its('content-type')
      .should('include', 'application/json'));

  it('should find entities with groups', () =>
    entityWithGroupTypes.forEach((entityWithGroupType) =>
      cy
        .findGroupsEntityAdmin(getAuthHeaders(), entityWithGroupType)
        .then((response) => {
          const group = response.body[0];
          return cy.findAllForGroupEntityAdmin(
            getAuthHeaders(),
            entityWithGroupType,
            group
          );
        })
        .its('body.length')
        .should('be.greaterThan', 0)
    ));

  it('should return a status of 200 when finding entities', () =>
    cy
      .findGroupsEntityAdmin(getAuthHeaders(), EntityWithGroupType.Event)
      .then((response) => {
        const group = response.body[0];
        return cy.findAllForGroupEntityAdmin(
          getAuthHeaders(),
          EntityWithGroupType.Event,
          group
        );
      })
      .its('status')
      .should('equal', 200));

  it('should return a bad request status if called with invalid entity with group type', () =>
    entityWithoutGroupTypes.forEach((entityWithoutGroupType) =>
      cy
        .findGroupsEntityAdmin(getAuthHeaders(), entityWithoutGroupType)
        .then((response) => {
          const group = response.body[0];
          return cy.findAllForGroupEntityAdmin(
            getAuthHeaders(),
            entityWithoutGroupType,
            group
          );
        })
        .its('status')
        .should('equal', 400)
    ));

  it('should return an unauthorized status when not logged in', () =>
    cy
      .findGroupsEntityAdmin(getAuthHeaders(), EntityWithGroupType.Event)
      .then((response) => {
        const group = response.body[0];
        return cy.findAllForGroupEntityAdmin(
          { Authorization: '' },
          EntityWithGroupType.Event,
          group
        );
      })
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not logged in', () =>
    cy
      .findGroupsEntityAdmin(getAuthHeaders(), EntityWithGroupType.Event)
      .then((response) => {
        const group = response.body[0];
        return cy.findAllForGroupEntityAdmin(
          { Authorization: '' },
          EntityWithGroupType.Event,
          group
        );
      })
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
