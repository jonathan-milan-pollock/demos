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
      url: `/api/v1/entities/${entityType}`,
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findOnePublicEntities',
  (
    entityType: string,
    entityId: string
  ): Cypress.Chainable<Cypress.Response<EntityPublic>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/entities/${entityType}/${entityId}`,
      failOnStatusCode: false,
    })
);
