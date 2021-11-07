import { EntityType } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Find all Public Entities', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return application/json', () =>
    cy
      .findAllPublicEntities(EntityType.Test)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json'));

  it('should find all public entities', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId1) =>
        cy.updateAdminEntities(getAuthHeaders(), entityId1, {
          isPublic: true,
          seoKeywords: [],
          starredImageIsCentered: false,
        })
      )
      .then(() => cy.createTestAdminEntities(getAuthHeaders()))
      .its('body.id')
      .then((entityId2) =>
        cy.updateAdminEntities(getAuthHeaders(), entityId2, {
          isPublic: true,
          seoKeywords: [],
          starredImageIsCentered: false,
        })
      )
      .then(() => cy.findAllPublicEntities(EntityType.Test))
      .its('body.length')
      .should('equal', 2));

  it('should have a count of 0 when no public entities are found', () =>
    cy
      .findAllPublicEntities(EntityType.Test)
      .its('body.length')
      .should('equal', 0));

  it('should return a status of 200 when finding public entities', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId1) => {
        return cy.updateAdminEntities(getAuthHeaders(), entityId1, {
          isPublic: true,
          seoKeywords: [],
          starredImageIsCentered: false,
        });
      })
      .findAllPublicEntities(EntityType.Test)
      .its('status')
      .should('equal', 200));
});
