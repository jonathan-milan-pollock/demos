import {
  EntityMinimalPublic,
  EntityPublic,
} from '@dark-rush-photography/shared/types';

Cypress.Commands.add(
  'findAllPublicEntities',
  (
    entityType: string
  ): Cypress.Chainable<Cypress.Response<EntityMinimalPublic[]>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/entities/entity-type/${entityType}`,
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findOnePublicEntities',
  (entityId: string): Cypress.Chainable<Cypress.Response<EntityPublic>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/entities/${entityId}`,
      failOnStatusCode: false,
    })
);
