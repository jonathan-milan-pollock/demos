import { MediaProcessType } from '@dark-rush-photography/shared/types';
import { getAdminHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createMediaProcessAdmin',
  (
    mediaProcessType: MediaProcessType,
    slug: string
  ): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/media-processes/${mediaProcessType}/${slug}`,
      headers: {
        ...getAdminHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'processMediaProcessAdmin',
  (
    mediaProcessType: MediaProcessType,
    id: string
  ): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/media-processes/${mediaProcessType}/${id}/process`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findAllMediaProcessesAdmin',
  (mediaProcessType: MediaProcessType): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/media-processes/${mediaProcessType}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneMediaProcessAdmin',
  (
    mediaProcessType: MediaProcessType,
    id: string
  ): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/media-processes/${mediaProcessType}/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findIsProcessingMediaProcessAdmin',
  (
    mediaProcessType: MediaProcessType,
    id: string
  ): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/media-processes/${mediaProcessType}/${id}/processing`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);

Cypress.Commands.add(
  'deleteMediaProcessAdmin',
  (
    mediaProcessType: MediaProcessType,
    id: string
  ): Cypress.Chainable<Cypress.Response> =>
    cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/media-processes/${mediaProcessType}/${id}`,
      headers: {
        ...getAdminHeaders(),
      },
    })
);
