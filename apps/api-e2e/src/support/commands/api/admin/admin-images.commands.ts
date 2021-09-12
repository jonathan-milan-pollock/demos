/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
//import * as fs from 'fs-extra';
//import * as path from 'path';
//import { StreamableFile } from '@nestjs/common';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'uploadImageAdmin',
  async (entityId: string, filePath: string): Promise<any> => {
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append(
      'file'
      //fs.readFileSync(filePath, 'utf8'),
      //path.basename(filePath)
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
  async (entityId: string, filePath: string): Promise<any> => {
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append(
      'file'
      //  fs.readFileSync(filePath, 'utf8'),
      //  path.basename(filePath)
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
  'updateImageAdmin',
  async (id: string, entityId: string, imageUpdate: any): Promise<any> => {
    return fetch(`/api/v1/admin/images/${id}?entityId=${entityId}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        ...imageUpdate,
      }),
    })
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);

Cypress.Commands.add(
  'updateThreeSixtySettingsImageAdmin',
  async (
    id: string,
    entityId: string,
    imageDimensionType: string,
    threeSixtySettings: any
  ): Promise<any> => {
    return fetch(
      `/api/v1/admin/images/${id}/${imageDimensionType}/three-sixty-settings?entityId=${entityId}`,
      {
        method: 'PUT',
        headers: {
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          ...threeSixtySettings,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);

Cypress.Commands.add(
  'findAllImageAdmin',
  async (entityId: string, state: string): Promise<any> => {
    return fetch(`/api/v1/admin/images?entityId=${entityId}&state=${state}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
    })
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);

Cypress.Commands.add(
  'findOneImageAdmin',
  async (id: string, entityId: string): Promise<any> => {
    return fetch(`/api/v1/admin/images/${id}?entityId=${entityId}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
    })
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);

Cypress.Commands.add(
  'streamImageAdmin',
  async (
    id: string,
    entityId: string,
    imageDimensionType: string
  ): Promise<any> => {
    return fetch(
      `/api/v1/admin/images/${id}/${imageDimensionType}/string?entityId=${entityId}`,
      {
        method: 'GET',
        headers: {
          ...getAuthHeaders(),
        },
      }
    )
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);

Cypress.Commands.add(
  'removeImageAdmin',
  async (id: string, entityId: string): Promise<void> => {
    return fetch(`/api/v1/admin/images/${id}?entityId=${entityId}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      },
    }).then(() => undefined);
  }
);
