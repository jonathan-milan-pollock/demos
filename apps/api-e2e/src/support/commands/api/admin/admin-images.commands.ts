/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  Image,
  ImageDimensionType,
  ImageUpdate,
  ThreeSixtySettings,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'uploadImageAdmin',
  async (entityId: string, filePath: string): Promise<Image> => {
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append(
      'file',
      fs.readFileSync(filePath, 'utf8'),
      path.basename(filePath)
    );

    return fetch(`/api/v1/admin/images/upload?entityId=${entityId}`, {
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
  'uploadThreeSixtyImageAdmin',
  async (entityId: string, filePath: string): Promise<Image> => {
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append(
      'file',
      fs.readFileSync(filePath, 'utf8'),
      path.basename(filePath)
    );

    return fetch(
      `/api/v1/admin/images/upload-three-sixty?entityId=${entityId}`,
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
  'uploadLightroomImageAdmin',
  async (lightroomPath: string, filePath: string): Promise<Image> => {
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append(
      'file',
      fs.readFileSync(filePath, 'utf8'),
      path.basename(filePath)
    );

    return fetch('/api/v1/admin/images/upload-lightroom', {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Length': formData.getLengthSync(),
        'X-LIGHTROOM-PATH': lightroomPath,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => json);
  }
);

Cypress.Commands.add(
  'updateImageAdmin',
  (
    id: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Cypress.Chainable<Cypress.Response<Image>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/images/${id}?entityId=${entityId}`,
      headers: {
        ...getAuthHeaders(),
      },
      body: {
        ...imageUpdate,
      },
    })
);

Cypress.Commands.add(
  'updateThreeSixtySettingsImageAdmin',
  (
    id: string,
    entityId: string,
    imageDimensionType: ImageDimensionType,
    threeSixtySettings: ThreeSixtySettings
  ): Cypress.Chainable<Cypress.Response<Image>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/images/${id}/${imageDimensionType}/three-sixty-settings?entityId=${entityId}`,
      headers: {
        ...getAuthHeaders(),
      },
      body: {
        ...threeSixtySettings,
      },
    })
);

Cypress.Commands.add(
  'setIsProcessingImageAdmin',
  (
    id: string,
    entityId: string,
    isProcessing: boolean
  ): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/images/${id}/processing/${isProcessing}?entityId=${entityId}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneImageAdmin',
  (id: string, entityId: string): Cypress.Chainable<Cypress.Response<Image>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/images/${id}?entityId=${entityId}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findDataUriImageAdmin',
  (
    id: string,
    entityId: string,
    imageDimensionType: ImageDimensionType
  ): Cypress.Chainable<Cypress.Response<string>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/images/${id}/${imageDimensionType}/data-uri?entityId=${entityId}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'removeImageAdmin',
  (id: string, entityId: string): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/images/${id}?entityId=${entityId}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);
