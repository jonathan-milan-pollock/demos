/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { About, DUMMY_MONGODB_ID } from '@dark-rush-photography/shared/types';

describe('aboutFindOneAdmin', () => {
  beforeEach(() =>
    cy
      .authenticateApi()
      .then(() =>
        cy
          .aboutFindAllAdmin()
          .then(($body) =>
            $body.body.forEach((about: About) => cy.aboutDeleteAdmin(about.id!))
          )
      )
  );

  it('should return application/json', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    cy.aboutCreateAdmin(`test-about-${randomNumber}`)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('should find a created about', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    cy.aboutCreateAdmin(`test-about-${randomNumber}`)
      .its('body.id')
      .then((id) => cy.aboutFindOneAdmin(id))
      .its('body.slug')
      .should('equal', `test-about-${randomNumber}`);
  });

  it('should not find an about that does not exist', () => {
    cy.aboutFindOneAdmin(DUMMY_MONGODB_ID).its('status').should('equal', 404);
  });
});
