import {
  MediaProcess,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createMediaProcessAdmin',
  (
    type: MediaProcessType,
    slug: string
  ): Cypress.Chainable<Cypress.Response<MediaProcess>> =>
    cy.request({
      method: 'POST',
      url: '/api/v1/admin/media-processes',
      headers: {
        ...getAuthHeaders(),
      },
      body: {
        type,
        slug,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'processMediaProcessAdmin',
  (
    mediaProcessType: MediaProcessType,
    id: string
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/media-processes/${mediaProcessType}/${id}/process`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findAllMediaProcessesAdmin',
  (
    mediaProcessType: MediaProcessType
  ): Cypress.Chainable<Cypress.Response<MediaProcess[]>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/media-processes/${mediaProcessType}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneMediaProcessAdmin',
  (
    mediaProcessType: MediaProcessType,
    id: string
  ): Cypress.Chainable<Cypress.Response<MediaProcess>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/media-processes/${mediaProcessType}/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'deleteMediaProcessAdmin',
  (
    mediaProcessType: MediaProcessType,
    id: string
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/media-processes/${mediaProcessType}/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);
