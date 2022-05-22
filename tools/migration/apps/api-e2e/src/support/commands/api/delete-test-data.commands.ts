import { EntityAdmin, EntityType } from '@dark-rush-photography/shared/types';

Cypress.Commands.add(
  'deleteTestData',
  (authHeaders: {
    Authorization: string;
  }): Cypress.Chainable<Cypress.Response<EntityAdmin[]>> =>
    cy
      .findAllAdminEntities(authHeaders, EntityType.Test)
      .then((response) =>
        response.body.forEach((entityAdmin: EntityAdmin) =>
          cy.deleteAdminEntities(authHeaders, entityAdmin.id)
        )
      )
);
