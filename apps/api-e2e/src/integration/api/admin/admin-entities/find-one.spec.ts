import {
  DUMMY_MONGODB_ID,
  EntityMinimalAdmin,
} from '@dark-rush-photography/shared/types';

import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Find one Admin Entity', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return application/json', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        slug: 'test-image-post-1',
      })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy.findOneEntityAdmin(getAuthHeaders(), entityMinimalAdmin.id)
      )
      .its('headers')
      .its('content-type')
      .should('include', 'application/json'));

  it('should find a created entity', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        slug: 'test-image-post-1',
      })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy.findOneEntityAdmin(getAuthHeaders(), entityMinimalAdmin.id)
      )
      .its('body.slug')
      .should('equal', 'test-image-post-1'));

  it('should return a status of 200 when find an entity', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        slug: 'test-image-post-1',
      })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy.findOneEntityAdmin(getAuthHeaders(), entityMinimalAdmin.id)
      )
      .its('status')
      .should('equal', 200));

  it('should return a not found request status when cannot find an entity', () =>
    cy
      .findOneEntityAdmin(getAuthHeaders(), DUMMY_MONGODB_ID)
      .its('status')
      .should('equal', 404));

  it('should return an unauthorized status when not logged in', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        slug: 'test-image-post-1',
      })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy.findOneEntityAdmin({ Authorization: '' }, entityMinimalAdmin.id)
      )
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not logged in', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        slug: 'test-image-post-1',
      })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy.findOneEntityAdmin({ Authorization: '' }, entityMinimalAdmin.id)
      )
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
