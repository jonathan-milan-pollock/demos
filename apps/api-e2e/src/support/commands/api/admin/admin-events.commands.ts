import { EventCreate, EventUpdate } from '@dark-rush-photography/shared/types';
import { getAdminHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createEventAdmin',
  (eventCreate: EventCreate): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/events`,
      headers: {
        ...getAdminHeaders(),
      },
      body: {
        ...eventCreate,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateEventAdmin',
  (id: string, eventUpdate: EventUpdate): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'PUT',
      url: `/api/admin/v1/events/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
      body: { ...eventUpdate },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'postEventAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/events/${id}/post`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findAllEventsAdmin',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: '/api/admin/v1/events',
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneEventAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/events/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findIsProcessingEventAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/events/${id}/processing`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'deleteEventAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/events/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);
