import {
  DEFAULT_ENTITY_GROUP,
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Order Admin Entities for a group', () => {
  const entityWithoutGroupTypes = Object.values(EntityWithoutGroupType);

  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return a status of 204 when ordering entities', () =>
    cy
      .findGroupsAdminEntities(getAuthHeaders(), EntityWithGroupType.Event)
      .then((response) => response.body[0])
      .then((group) =>
        cy.orderForGroupAdminEntities(
          getAuthHeaders(),
          EntityWithGroupType.Event,
          group,
          {
            entityIds: [],
          }
        )
      )
      .its('status')
      .should('equal', 204));

  it('should return a 400 response when called for an entity without a group', () =>
    entityWithoutGroupTypes.forEach((entityWithoutGroupType) =>
      cy
        .orderForGroupAdminEntities(
          getAuthHeaders(),
          entityWithoutGroupType,
          DEFAULT_ENTITY_GROUP,
          {
            entityIds: [],
          }
        )
        .its('status')
        .should('equal', 400)
    ));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .orderForGroupAdminEntities(
        { Authorization: '' },
        EntityWithGroupType.Event,
        DEFAULT_ENTITY_GROUP,
        {
          entityIds: [],
        }
      )
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .orderForGroupAdminEntities(
        { Authorization: '' },
        EntityWithGroupType.Event,
        DEFAULT_ENTITY_GROUP,
        {
          entityIds: [],
        }
      )
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
