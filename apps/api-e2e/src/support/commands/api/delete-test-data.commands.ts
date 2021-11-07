import {
  CronProcess,
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
  }): Cypress.Chainable<Cypress.Response<CronProcess[]>> =>
    cy.findAllAdminCronProcesses(authHeaders).then((response) =>
      response.body.forEach((cronProcess: CronProcess) => {
        if (cronProcess.entityType === EntityType.Test) {
          cy.deleteAdminCronProcesses(authHeaders, cronProcess.key);
        }
      })
    )
);
