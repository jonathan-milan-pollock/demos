import {
  EntityAdmin,
  EntityOrders,
  EntityType,
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Order Admin Entities', () => {
  const entityWithGroupTypes = Object.values(EntityWithGroupType);

  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should order entities', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((firstEntityId) => {
        return cy
          .createTestAdminEntities(getAuthHeaders())
          .its('body.id')
          .then((secondEntityId) => {
            return cy
              .createTestAdminEntities(getAuthHeaders())
              .its('body.id')
              .then((thirdEntityId) => {
                const entityOrders: EntityOrders = {
                  entityIds: [
                    ...[firstEntityId, secondEntityId, thirdEntityId].reverse(),
                  ],
                };
                return cy
                  .orderAdminEntities(
                    getAuthHeaders(),
                    EntityWithoutGroupType.Test,
                    entityOrders
                  )
                  .then(() =>
                    cy.findAllAdminEntities(getAuthHeaders(), EntityType.Test)
                  )
                  .then((response) => response.body as EntityAdmin[])
                  .then((entities: EntityAdmin[]) => {
                    const entityOrdersResponse: EntityOrders = {
                      entityIds: [...entities.map((entity) => entity.id)],
                    };
                    return entityOrdersResponse;
                  })
                  .should('deep.equal', entityOrders);
              });
          });
      }));

  it('should return a status of 204 when ordering entities', () =>
    cy
      .orderAdminEntities(getAuthHeaders(), EntityWithoutGroupType.Test, {
        entityIds: [],
      })
      .its('status')
      .should('equal', 204));

  it('should return a 400 response when called for an entity that requires a group', () =>
    entityWithGroupTypes.forEach((entityWithGroupType) =>
      cy
        .orderAdminEntities(getAuthHeaders(), entityWithGroupType, {
          entityIds: [],
        })
        .its('status')
        .should('equal', 400)
    ));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .orderAdminEntities({ Authorization: '' }, EntityWithoutGroupType.Test, {
        entityIds: [],
      })
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .orderAdminEntities({ Authorization: '' }, EntityWithoutGroupType.Test, {
        entityIds: [],
      })
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
