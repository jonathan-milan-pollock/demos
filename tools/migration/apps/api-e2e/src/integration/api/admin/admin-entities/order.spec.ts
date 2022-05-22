/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as faker from 'faker';

import {
  EntityAdmin,
  EntityOrders,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Order Admin Entities', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should order entities', () => {
    const firstEntityOrder = faker.datatype.number({ min: 0 });
    const secondEntityOrder = faker.datatype.number({ min: 0 });
    const thirdEntityOrder = faker.datatype.number({ min: 0 });

    return cy
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
                  entityIdOrders: [
                    {
                      entityId: firstEntityId,
                      order: firstEntityOrder,
                    },
                    {
                      entityId: secondEntityId,
                      order: secondEntityOrder,
                    },
                    {
                      entityId: thirdEntityId,
                      order: thirdEntityOrder,
                    },
                  ],
                };
                return cy
                  .orderAdminEntities(getAuthHeaders(), entityOrders)
                  .then(() =>
                    cy.findAllAdminEntities(getAuthHeaders(), EntityType.Test)
                  )
                  .its('body')
                  .then((adminEntities: EntityAdmin[]) => {
                    const firstAdminEntity = adminEntities.find(
                      (adminEntity) => adminEntity.id === firstEntityId
                    );
                    expect(firstAdminEntity!.order).equal(firstEntityOrder);
                    const secondAdminEntity = adminEntities.find(
                      (adminEntity) => adminEntity.id === secondEntityId
                    );
                    expect(secondAdminEntity!.order).equal(secondEntityOrder);
                    const thirdAdminEntity = adminEntities.find(
                      (adminEntity) => adminEntity.id === thirdEntityId
                    );
                    expect(thirdAdminEntity!.order).equal(thirdEntityOrder);
                  });
              });
          });
      });
  });

  it('should return a status of 204 when ordering entities', () =>
    cy
      .orderAdminEntities(getAuthHeaders(), {
        entityIdOrders: [],
      })
      .its('status')
      .should('equal', 204));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .orderAdminEntities(
        { Authorization: '' },
        {
          entityIdOrders: [],
        }
      )
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .orderAdminEntities(
        { Authorization: '' },
        {
          entityIdOrders: [],
        }
      )
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
