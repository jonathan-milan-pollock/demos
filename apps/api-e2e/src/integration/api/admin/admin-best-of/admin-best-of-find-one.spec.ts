import { BestOfType } from '@dark-rush-photography/shared/types';

describe('bestOfFindOneAdmin', () => {
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

  it('should find one best of', () => {
    cy.bestOfCreateAdmin(BestOfType.Children)
      .then(() => cy.bestOfFindOneAdmin(BestOfType.Children))
      .its('body.slug')
      .should('equal', BestOfType.Children);
  });

  it.skip('should error if not created', () => {
    //
  });
});
