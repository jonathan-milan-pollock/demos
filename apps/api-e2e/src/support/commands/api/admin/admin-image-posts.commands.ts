import { EntityAdmin } from '@dark-rush-photography/shared/types';

Cypress.Commands.add(
  'uploadImagePostAdmin',
  async (
    authHeaders: { Authorization: string },
    entityId: string,
    text: string
  ): Promise<EntityAdmin> => {
    const imageUrl =
      'https://images.unsplash.com/photo-1554137454-8369250f411d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2182&q=80';
    const formData = new FormData();
    formData.append(
      'file',
      await Cypress.Blob.imgSrcToBlob(imageUrl),
      'test-image.jpg'
    );

    return fetch(
      `http://localhost:1111/api/v1/admin/image-posts/upload?entityId=${entityId}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          ...authHeaders,
          'DARK-RUSH-PHOTOGRAPHY-IMAGE-POST-TEXT': text,
        },
      }
    ).then((response) => response.json());
  }
);
