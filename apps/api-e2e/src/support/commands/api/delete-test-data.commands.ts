import {
  EntityAdmin,
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
        cy.findOneEntityAdmin(authHeaders, entityMinimalAdmin.id).then(
          (response) => {
            const entityAdmin = response.body as EntityAdmin;
            if (
              entityAdmin.text.length > 0 &&
              entityAdmin.text[0].startsWith('test')
            ) {
              cy.deleteEntityAdmin(authHeaders, entityMinimalAdmin.id);
            }
          }
        );
      })
    )
);
