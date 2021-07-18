import {
  PhotoOfTheWeek,
  PhotoOfTheWeekUpdate,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createPhotoOfTheWeekAdmin',
  (slug: string): Cypress.Chainable<Cypress.Response<PhotoOfTheWeek>> =>
    cy.request({
      method: 'POST',
      url: '/api/v1/admin/photo-of-the-week',
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
  'updatePhotoOfTheWeekAdmin',
  (
    id: string,
    photoOfTheWeekUpdate: PhotoOfTheWeekUpdate
  ): Cypress.Chainable<Cypress.Response<PhotoOfTheWeek>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/photo-of-the-week/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      body: { ...photoOfTheWeekUpdate },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'postPhotoOfTheWeekAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<PhotoOfTheWeek>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/photo-of-the-week/${id}/post`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findAllPhotoOfTheWeekAdmin',
  (): Cypress.Chainable<Cypress.Response<PhotoOfTheWeek[]>> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/admin/photo-of-the-week',
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOnePhotoOfTheWeekAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<PhotoOfTheWeek>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/photo-of-the-week/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'deletePhotoOfTheWeekAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/photo-of-the-week/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);
