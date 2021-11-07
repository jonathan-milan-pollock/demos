import {
  CronProcess,
  DUMMY_CRON_PROCESS_ROW_KEY,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Find One Admin Cron Processes', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return application/json', () =>
    cy
      .findOneAdminCronProcesses(getAuthHeaders(), DUMMY_CRON_PROCESS_ROW_KEY)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json'));

  it('should find one cron processes', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy
          .deleteAdminEntities(getAuthHeaders(), entityId)
          .then(() => cy.findAllAdminCronProcesses(getAuthHeaders()))
          .its('body')
          .then(
            (cronProcesses: CronProcess[]) =>
              cronProcesses.filter(
                (cronProcess) => cronProcess.entityId === entityId
              )[0]
          )
          .then((entityCronProcess) =>
            cy.findOneAdminCronProcesses(
              getAuthHeaders(),
              entityCronProcess.key
            )
          )
          .its('body.entityId')
          .should('equal', entityId)
      ));

  it('should return a status of 200 when finding entities', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy
          .deleteAdminEntities(getAuthHeaders(), entityId)
          .then(() => cy.findAllAdminCronProcesses(getAuthHeaders()))
          .its('body')
          .then(
            (cronProcesses: CronProcess[]) =>
              cronProcesses.filter(
                (cronProcess) => cronProcess.entityId === entityId
              )[0]
          )
          .then((entityCronProcess) =>
            cy.findOneAdminCronProcesses(
              getAuthHeaders(),
              entityCronProcess.key
            )
          )
          .its('status')
          .should('equal', 200)
      ));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .findOneAdminCronProcesses(
        { Authorization: '' },
        DUMMY_CRON_PROCESS_ROW_KEY
      )
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .findOneAdminCronProcesses(
        { Authorization: '' },
        DUMMY_CRON_PROCESS_ROW_KEY
      )
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
