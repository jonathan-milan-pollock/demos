import { BestOfType } from '@dark-rush-photography/shared/types';

Cypress.Commands.add(
  'findOneBestOfPublic',
  (bestOfType: BestOfType): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/best-of/${bestOfType}`,
      failOnStatusCode: false,
    })
);
