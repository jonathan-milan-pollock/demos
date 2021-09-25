import { Entity, ImagePostCreate } from '@dark-rush-photography/shared/types';
import { getAuthHeadersAdmin } from '../auth-headers.functions';

Cypress.Commands.add(
  'createImagePostAdmin',
  (
    imagePostCreate: ImagePostCreate
  ): Cypress.Chainable<Cypress.Response<Entity>> =>
    cy.request({
      method: 'POST',
      url: '/api/v1/admin/image-posts',
      headers: {
        ...getAuthHeadersAdmin(),
      },
      body: {
        ...imagePostCreate,
      },
      failOnStatusCode: false,
    })
);

/*
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
);*/

Cypress.Commands.add(
  'uploadImagePostAdmin',
  async (entityId: string): Promise<string> => {
    const imageUrl =
      'https://images.unsplash.com/photo-1554137454-8369250f411d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2182&q=80';
    const formData = new FormData();
    formData.append(
      'file',
      await Cypress.Blob.imgSrcToBlob(imageUrl),
      'image.jpg'
    );

    return fetch(
      `http://localhost:1111/api/v1/admin/image-posts/upload?entityId=${entityId}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          ...getAuthHeadersAdmin(),
        },
      }
    ).then((response) => response.json());
  }
);
