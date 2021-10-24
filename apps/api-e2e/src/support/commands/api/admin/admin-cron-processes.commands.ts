import { CronProcessResponse } from '@dark-rush-photography/shared/types';

Cypress.Commands.add(
  'findAllAdminCronProcesses',
  (authHeaders: {
    Authorization: string;
  }): Cypress.Chainable<Cypress.Response<CronProcessResponse[]>> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/admin/cron-processes',
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findOneAdminCronProcesses',
  (
    authHeaders: {
      Authorization: string;
    },
    key: string
  ): Cypress.Chainable<Cypress.Response<CronProcessResponse>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/cron-processes/${key}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'deleteAdminCronProcesses',
  (
    authHeaders: {
      Authorization: string;
    },
    key: string
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/cron-processes/${key}`,
      headers: {
        ...authHeaders,
      },
      failOnStatusCode: false,
    })
);
