import { BestOfType } from '@dark-rush-photography/shared/types';

describe('bestOfCreateAdmin', () => {
  beforeEach(() =>
    cy
      .authenticateApi()
      .then(() =>
        Object.keys(BestOfType).forEach((key) =>
          cy.aboutDeleteAdmin(key as BestOfType)
        )
      )
  );

  it('should return application/json', () => {
    cy.bestOfCreateAdmin(BestOfType.Children)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('should create children', () => {
    cy.bestOfCreateAdmin(BestOfType.Children)
      .its('body.slug')
      .should('equal', BestOfType.Children);
  });

  it('should return existing best of when created with same type', () => {
    cy.bestOfCreateAdmin(BestOfType.Children)
      .then(() => cy.bestOfCreateAdmin(BestOfType.Children))
      .its('body.slug')
      .should('equal', BestOfType.Children);
  });

  it('should find one best of', () => {
    cy.bestOfCreateAdmin(BestOfType.Children)
      .then(() => cy.bestOfFindOneAdmin(BestOfType.Children))
      .its('body.slug')
      .should('equal', BestOfType.Children);
  });

  it('should delete a created best of', () => {
    cy.bestOfCreateAdmin(BestOfType.Children)
      .then(() => cy.bestOfDeleteAdmin(BestOfType.Children))
      .then(() => cy.bestOfFindOneAdmin(BestOfType.Children))
      .its('status')
      .should('equal', 404);
  });

  it('should return a status of 204 when delete', () => {
    cy.bestOfCreateAdmin(BestOfType.Children)
      .then(() => cy.bestOfDeleteAdmin(BestOfType.Children))
      .its('status')
      .should('equal', 204);
  });

  it('should return an empty body when delete', () => {
    cy.bestOfCreateAdmin(BestOfType.Children)
      .then(() => cy.bestOfDeleteAdmin(BestOfType.Children))
      .its('body')
      .should('equal', '');
  });

  it('should not fail when deleting multiple times', () => {
    cy.bestOfCreateAdmin(BestOfType.Children)
      .then(() => cy.bestOfDeleteAdmin(BestOfType.Children))
      .then(() => cy.bestOfDeleteAdmin(BestOfType.Children))
      .its('status')
      .should('equal', 204);
  });
});
