import {
  EntityAdminDto,
  MediaProcessCreateDto,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createMediaProcessAdmin',
  (
    mediaProcessType: string,
    mediaProcessCreate: MediaProcessCreateDto
  ): Cypress.Chainable<Cypress.Response<EntityAdminDto>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/media-processes/${mediaProcessType}`,
      headers: {
        ...getAuthHeaders(),
      },
      body: {
        ...mediaProcessCreate,
      },
      failOnStatusCode: false,
    })
);
