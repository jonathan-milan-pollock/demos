import {
  EntityMinimalAdmin,
  EntityWithGroupType,
  EntityWithoutGroupType,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

// TODO: Test what happens when google drive folder not found

describe('Load New Images Admin Entity', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return application/json', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        slug: 'test-image-post-1',
      })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy.findAllImagesAdmin(
          getAuthHeaders(),
          entityMinimalAdmin.id,
          ImageState.New
        )
      )
      .its('headers')
      .its('content-type')
      .should('include', 'application/json'));

  it('should load new images', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        slug: 'test-image-post-1',
      })
      .then(() =>
        Object.values(EntityWithGroupType).forEach((entityWithoutGroupType) =>
          cy
            .findAllEntityAdmin(getAuthHeaders(), entityWithoutGroupType)
            .its('body.length')
            .should('be.greaterThan', 0)
        )
      ));

  it('should find image posts', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        slug: 'test-image-post-1',
      })
      .then(() =>
        cy.createImagePostAdmin(getAuthHeaders(), {
          slug: 'test-image-post-2',
        })
      )
      .then(() =>
        cy.findAllEntityAdmin(
          getAuthHeaders(),
          EntityWithoutGroupType.ImagePost
        )
      )
      .its('body.length')
      .should('equal', 2));

  it('should have a count of 0 when no entities for type are created', () =>
    cy
      .findAllEntityAdmin(getAuthHeaders(), EntityWithoutGroupType.ImagePost)
      .its('body.length')
      .should('equal', 0));

  it('should return a status of 200 when finding entities', () =>
    cy
      .findAllEntityAdmin(getAuthHeaders(), EntityWithoutGroupType.About)
      .its('status')
      .should('equal', 200));

  it('should return a bad request status when called for an entity that requires a group', () =>
    Object.values(EntityWithGroupType).forEach((entityWithGroupType) =>
      cy
        .findAllEntityAdmin(getAuthHeaders(), entityWithGroupType)
        .its('status')
        .should('equal', 400)
    ));

  it('should return an unauthorized status when not logged in', () =>
    cy
      .findAllEntityAdmin({ Authorization: '' }, EntityWithoutGroupType.About)
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not logged in', () =>
    cy
      .findAllEntityAdmin({ Authorization: '' }, EntityWithoutGroupType.About)
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
