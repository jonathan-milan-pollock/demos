/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs-extra';
import * as path from 'path';

import { Video } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'uploadVideoAdmin',
  async (entityId: string, filePath: string): Promise<Video> => {
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append(
      'file',
      fs.readFileSync(filePath, 'utf8'),
      path.basename(filePath)
    );

    return fetch(`/api/v1/admin/videos/upload?entityId=${entityId}`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Length': formData.getLengthSync(),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => json);
  }
);

Cypress.Commands.add(
  'uploadThreeSixtyVideoAdmin',
  async (entityId: string, filePath: string): Promise<Video> => {
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append(
      'file',
      fs.readFileSync(filePath, 'utf8'),
      path.basename(filePath)
    );

    return fetch(
      `/api/v1/admin/videos/upload-three-sixty?entityId=${entityId}`,
      {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Length': formData.getLengthSync(),
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((json) => json);
  }
);

Cypress.Commands.add(
  'addVideoAdmin',
  (slug: string): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'POST',
      url: `/api/v1/admin/about/${slug}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findAllVideosAdmin',
  (): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/admin/about',
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneVideoAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/about/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'removeVideoAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/about/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);
