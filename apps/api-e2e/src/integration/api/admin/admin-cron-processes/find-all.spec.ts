import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Find All Admin Cron Processes', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return application/json', () =>
    cy
      .findAllAdminCronProcesses(getAuthHeaders())
      .its('headers')
      .its('content-type')
      .should('include', 'application/json'));

  it('should return a status of 200 when finding cron processes', () =>
    cy
      .findAllAdminCronProcesses(getAuthHeaders())
      .its('status')
      .should('equal', 200));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .findAllAdminCronProcesses({ Authorization: '' })
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .findAllAdminCronProcesses({ Authorization: '' })
      .its('body.message')
      .should('equal', 'Unauthorized'));
});