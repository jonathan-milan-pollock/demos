import {
  PhotoOfTheWeekCreate,
  PhotoOfTheWeekUpdate,
} from '@dark-rush-photography/shared/types';
import { getAdminHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createPhotoOfTheWeekAdmin',
  (
    photoOfTheWeekCreate: PhotoOfTheWeekCreate
  ): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/photo-of-the-week`,
      headers: {
        ...getAdminHeaders(),
      },
      body: {
        ...photoOfTheWeekCreate,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updatePhotoOfTheWeekAdmin',
  (
    id: string,
    photoOfTheWeekUpdate: PhotoOfTheWeekUpdate
  ): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'PUT',
      url: `/api/admin/v1/photo-of-the-week/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
      body: { ...photoOfTheWeekUpdate },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'postPhotoOfTheWeekAdmin',
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
  'findAllPhotoOfTheWeekAdmin',
  (): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: '/api/admin/v1/photo-of-the-week',
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOnePhotoOfTheWeekAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/photo-of-the-week/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findIsProcessingPhotoOfTheWeekAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/photo-of-the-week/${id}/processing`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'deletePhotoOfTheWeekAdmin',
  (id: string): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/photo-of-the-week/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);
