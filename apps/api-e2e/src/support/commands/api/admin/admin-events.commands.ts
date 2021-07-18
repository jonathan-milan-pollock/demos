import { Event, EventUpdate } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createEventAdmin',
  (group: string, slug: string): Cypress.Chainable<Cypress.Response<Event>> =>
    cy.request({
      method: 'POST',
      url: '/api/v1/admin/events',
      headers: {
        ...getAuthHeaders(),
      },
      body: {
        group,
        slug,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateEventAdmin',
  (
    id: string,
    eventUpdate: EventUpdate
  ): Cypress.Chainable<Cypress.Response<Event>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/events/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      body: { ...eventUpdate },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'postEventAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<Event>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/events/${id}/post`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findAllEventsAdmin',
  (): Cypress.Chainable<Cypress.Response<Event[]>> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/admin/events',
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneEventAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<Event>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/events/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'deleteEventAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/events/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);
