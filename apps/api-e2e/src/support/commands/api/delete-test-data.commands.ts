import {
  EntityMinimalAdmin,
  EntityType,
} from '@dark-rush-photography/shared/types';

Cypress.Commands.add(
  'deleteTestData',
  (authHeaders: {
    Authorization: string;
  }): Cypress.Chainable<Cypress.Response<EntityMinimalAdmin[]>> =>
    cy.findAllEntityAdmin(authHeaders, EntityType.ImagePost).then((response) =>
      response.body.forEach((entityMinimalAdmin: EntityMinimalAdmin) => {
        if (entityMinimalAdmin.slug.startsWith('test-')) {
          cy.deleteEntityAdmin(authHeaders, entityMinimalAdmin.id);
        }
      })
    )
);
