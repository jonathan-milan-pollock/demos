/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars */
import {
  Destination,
  DestinationUpdateDto,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createDestinationAdmin',
  (slug: string): Cypress.Chainable<Cypress.Response<Destination>> =>
    cy.request({
      method: 'POST',
      url: '/api/v1/admin/destinations',
      headers: {
        ...getAuthHeaders(),
      },
      body: {
        slug,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateDestinationAdmin',
  (
    id: string,
    destinationUpdate: DestinationUpdateDto
  ): Cypress.Chainable<Cypress.Response<Destination>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/destinations/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      body: { ...destinationUpdate },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'postDestinationAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<Destination>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/destinations/${id}/post`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findAllDestinationsAdmin',
  (): Cypress.Chainable<Cypress.Response<Destination[]>> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/admin/destinations',
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneDestinationAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<Destination>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/destinations/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'deleteDestinationAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/destinations/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);
