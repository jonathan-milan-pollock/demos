/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars */
import { DestinationUpdate } from '@dark-rush-photography/shared/types';
import { getAdminHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createDestinationAdmin',
  (slug: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/destinations/${slug}`,
      headers: {
        ...getAdminHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateDestinationAdmin',
  (
    id: string,
    destinationUpdate: DestinationUpdate
  ): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'PUT',
      url: `/api/admin/v1/destinations/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
      body: { ...destinationUpdate },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'postDestinationAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/destinations/${id}/post`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findAllDestinationsAdmin',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: '/api/admin/v1/destinations',
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneDestinationAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/destinations/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findIsProcessingDestinationAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/destinations/${id}/processing`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'deleteDestinationAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/destinations/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);
