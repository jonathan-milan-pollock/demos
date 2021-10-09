import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  EntityMinimalAdmin,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Set is Processing Admin Entity', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should set is processing to be true', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        text: 'test-image-post-1',
      })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy
          .setIsProcessingEntityAdmin(
            getAuthHeaders(),
            entityMinimalAdmin.id,
            true
          )
          .then(() => entityMinimalAdmin)
      )
      .then((entityMinimalAdmin) =>
        cy.findOneEntityAdmin(getAuthHeaders(), entityMinimalAdmin.id)
      )
      .its('body.isProcessing')
      .should('equal', true));

  it('should set is processing to be false', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        text: 'test-image-post-1',
      })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy
          .setIsProcessingEntityAdmin(
            getAuthHeaders(),
            entityMinimalAdmin.id,
            false
          )
          .then(() => entityMinimalAdmin)
      )
      .then((entityMinimalAdmin) =>
        cy.findOneEntityAdmin(getAuthHeaders(), entityMinimalAdmin.id)
      )
      .its('body.isProcessing')
      .should('equal', false));

  it('should return a status of 204 when update an entity', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        text: 'test-image-post-1',
      })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy.setIsProcessingEntityAdmin(
          getAuthHeaders(),
          entityMinimalAdmin.id,
          faker.datatype.boolean()
        )
      )
      .its('status')
      .should('equal', 204));

  it('should return a not found request status when cannot find an entity', () =>
    cy
      .setIsProcessingEntityAdmin(
        getAuthHeaders(),
        DUMMY_MONGODB_ID,
        faker.datatype.boolean()
      )
      .its('status')
      .should('equal', 404));

  it('should return an unauthorized status when not logged in', () =>
    cy
      .setIsProcessingEntityAdmin(
        { Authorization: '' },
        DUMMY_MONGODB_ID,
        faker.datatype.boolean()
      )
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not logged in', () =>
    cy
      .setIsProcessingEntityAdmin(
        { Authorization: '' },
        DUMMY_MONGODB_ID,
        faker.datatype.boolean()
      )
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
