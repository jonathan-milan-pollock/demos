/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { About } from '@dark-rush-photography/shared/types';

describe('aboutFindAllAdmin', () => {
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
    cy.aboutFindAllAdmin()
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('should find all created about', () => {
    cy.aboutCreateAdmin('test-about-1')
      .then(() => cy.aboutCreateAdmin('test-about-2'))
      .then(() => cy.aboutFindAllAdmin())
      .its('body.length')
      .should('equal', 2);
  });

  it('should have a count of 0 when no about are created', () => {
    cy.aboutFindAllAdmin().its('body.length').should('equal', 0);
  });
});
