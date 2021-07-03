/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { About, EntityType } from '@dark-rush-photography/shared/types';

describe('aboutCreateAdmin', () => {
  beforeEach(() =>
    cy
      .authenticateApi()
      .then(() =>
        cy
          .findAllAboutAdmin()
          .then(($body) =>
            $body.body.forEach((about: About) =>
              cy.deleteEntityAdmin(EntityType.About, about.id!)
            )
          )
      )
  );

  it('should return application/json', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    cy.createAboutAdmin(`test-about-${randomNumber}`)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('should create about', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    cy.createAboutAdmin(`test-about-${randomNumber}`)
      .its('body.slug')
      .should('equal', `test-about-${randomNumber}`);
  });

  it.skip('should return conflict error when calling create for the same slug', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    cy.createAboutAdmin(`test-about-${randomNumber}`)
      .then(() => cy.createAboutAdmin(`test-about-${randomNumber}`))
      .its('body.slug')
      .should('equal', `test-about-${randomNumber}`);
  });
});
