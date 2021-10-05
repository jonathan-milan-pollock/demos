import { ImageAdmin, ImageUpdate } from '@dark-rush-photography/shared/types';

Cypress.Commands.add(
  'updateImageAdmin',
  async (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Promise<ImageAdmin> => {
    return fetch(`/api/v1/admin/images/${imageId}?entityId=${entityId}`, {
      method: 'PUT',
      headers: {
        ...authHeaders,
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
  'selectImageAdmin',
  async (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string
  ): Promise<ImageAdmin> => {
    return fetch(
      `/api/v1/admin/images/${imageId}/select?entityId=${entityId}`,
      {
        method: 'PUT',
        headers: {
          ...authHeaders,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);

Cypress.Commands.add(
  'archiveImageAdmin',
  async (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string
  ): Promise<ImageAdmin> => {
    return fetch(
      `/api/v1/admin/images/${imageId}/archive?entityId=${entityId}`,
      {
        method: 'PUT',
        headers: {
          ...authHeaders,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);

Cypress.Commands.add(
  'unarchiveImageAdmin',
  async (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string
  ): Promise<ImageAdmin> => {
    return fetch(
      `/api/v1/admin/images/${imageId}/unarchive?entityId=${entityId}`,
      {
        method: 'PUT',
        headers: {
          ...authHeaders,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);

Cypress.Commands.add(
  'removeImageAdmin',
  async (
    authHeaders: { Authorization: string },
    imageId: string,
    entityId: string
  ): Promise<void> => {
    return fetch(`/api/v1/admin/images/${imageId}?entityId=${entityId}`, {
      method: 'DELETE',
      headers: {
        ...authHeaders,
      },
    }).then(() => undefined);
  }
);
