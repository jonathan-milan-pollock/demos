import {
  CronProcessResponse,
  EntityAdmin,
  EntityType,
} from '@dark-rush-photography/shared/types';

Cypress.Commands.add(
  'deleteTestData',
  (authHeaders: {
    Authorization: string;
  }): Cypress.Chainable<Cypress.Response<EntityAdmin[]>> =>
    cy
      .deleteTestEntities(authHeaders)
      .then(() => cy.deleteTestCronProcesses(authHeaders))
);

Cypress.Commands.add(
  'deleteTestEntities',
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

Cypress.Commands.add(
  'deleteTestCronProcesses',
  (authHeaders: {
    Authorization: string;
  }): Cypress.Chainable<Cypress.Response<CronProcessResponse[]>> =>
    cy.findAllAdminCronProcesses(authHeaders).then((response) =>
      response.body.forEach((cronProcessResponse: CronProcessResponse) => {
        if (cronProcessResponse.entityType === EntityType.Test) {
          cy.deleteAdminCronProcesses(authHeaders, cronProcessResponse.key);
        }
      })
    )
);
