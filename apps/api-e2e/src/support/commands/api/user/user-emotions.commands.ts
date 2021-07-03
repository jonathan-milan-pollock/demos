import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'findAllEmotionsUser',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: '/api/user/v1/emotions',
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneEmotionsUser',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/user/v1/emotions/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);
