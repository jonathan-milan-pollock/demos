import { DUMMY_CRON_PROCESS_ROW_KEY } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Delete Admin Cron Processes', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return a status of 204 when delete a cron process', () =>
    cy
      .deleteAdminCronProcesses(getAuthHeaders(), DUMMY_CRON_PROCESS_ROW_KEY)
      .its('status')
      .should('equal', 204));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .deleteAdminCronProcesses(
        { Authorization: '' },
        DUMMY_CRON_PROCESS_ROW_KEY
      )
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .deleteAdminCronProcesses(
        { Authorization: '' },
        DUMMY_CRON_PROCESS_ROW_KEY
      )
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
