import {
  DUMMY_MONGODB_ID,
  EntityMinimalAdmin,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Delete Admin Entities', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should delete a created image post', () => {
    cy.uploadImagePostAdmin(getAuthHeaders(), {
      text: 'test-image-post-1',
    })
      .its('body.id')
      .then((id) => cy.deleteEntityAdmin(getAuthHeaders(), id))
      .then(() => cy.findAllEntityAdmin(getAuthHeaders(), EntityType.ImagePost))
      .its('body.length')
      .should('equal', 0);
  });

  it('should return a status of 204 when delete', () => {
    cy.createImagePostAdmin(getAuthHeaders(), {
      text: 'test-image-post-1',
    })
      .its('body.id')
      .then((id) => cy.deleteEntityAdmin(getAuthHeaders(), id))
      .its('status')
      .should('equal', 204);
  });

  it('should not fail when deleting multiple times', () => {
    cy.createImagePostAdmin(getAuthHeaders(), {
      text: 'test-image-post-1',
    })
      .its('body.id')
      .then((id) => {
        return cy
          .deleteEntityAdmin(getAuthHeaders(), id)
          .then(() => id as string);
      })
      .then((id) => cy.deleteEntityAdmin(getAuthHeaders(), id))
      .its('status')
      .should('equal', 204);
  });

  it('should not fail if deleting id that does not exist', () => {
    cy.deleteEntityAdmin(getAuthHeaders(), DUMMY_MONGODB_ID)
      .its('status')
      .should('equal', 204);
  });

  it('should return an unauthorized status when not logged in', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        text: 'test-image-post-1',
      })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy.deleteEntityAdmin({ Authorization: '' }, entityMinimalAdmin.id)
      )
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not logged in', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        text: 'test-image-post-1',
      })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy.deleteEntityAdmin({ Authorization: '' }, entityMinimalAdmin.id)
      )
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
