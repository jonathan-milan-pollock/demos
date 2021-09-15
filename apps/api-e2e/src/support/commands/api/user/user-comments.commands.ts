/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthHeaders } from '../auth-headers.functions';

Cypress.Commands.add(
  'addCommentUser',
  async (commentAdd: any): Promise<any[]> => {
    return fetch('/api/v1/user/comments', {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
      body: JSON.stringify(commentAdd),
    })
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);

Cypress.Commands.add(
  'updateCommentUser',
  async (id: string, entityId: string, commentUpdate: any): Promise<any[]> => {
    return fetch(`/api/v1/user/comments/${id}?entityId=${entityId}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
      },
      body: JSON.stringify(commentUpdate),
    })
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);

Cypress.Commands.add(
  'findAllCommentsUser',
  async (entityId: string, mediaId?: string): Promise<any[]> => {
    return fetch(
      mediaId
        ? `/api/v1/user/comments?entityId=${entityId}&mediaId=${mediaId}`
        : `/api/v1/user/comments?entityId=${entityId}`,
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
  'findOneCommentUser',
  async (id: string, entityId: string): Promise<any> => {
    return fetch(`/api/v1/user/comments/${id}?entityId=${entityId}`, {
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
  'removeCommentUser',
  async (id: string, entityId: string): Promise<void> => {
    return fetch(`/api/v1/user/comments/${id}?entityId=${entityId}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      },
    }).then(() => undefined);
  }
);
