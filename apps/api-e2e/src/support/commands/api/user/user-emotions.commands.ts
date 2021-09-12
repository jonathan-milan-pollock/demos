/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthHeaders } from '../auth.functions';

const findAllEmotionsUserUrl = (
  entityId: string,
  mediaId?: string,
  commentId?: string
) => {
  let url = `/api/v1/user/emotions?entityId=${entityId}`;
  if (mediaId) {
    if (commentId) {
      url = `/api/v1/user/emotions?entityId=${entityId}&mediaId=${mediaId}&commentId=${commentId}`;
    } else {
      url = `/api/v1/user/emotions?entityId=${entityId}&mediaId=${mediaId}`;
    }
  } else if (commentId) {
    url = `/api/v1/user/emotions?entityId=${entityId}&commentId=${commentId}`;
  }
  return url;
};

Cypress.Commands.add(
  'addEmotionUser',
  async (emotionAdd: any): Promise<any[]> => {
    return fetch('/api/v1/user/emotions', {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
      body: JSON.stringify(emotionAdd),
    })
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);

Cypress.Commands.add(
  'findAllEmotionsUser',
  async (
    entityId: string,
    mediaId?: string,
    commentId?: string
  ): Promise<any[]> => {
    return fetch(findAllEmotionsUserUrl(entityId, mediaId, commentId), {
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
  'findOneEmotionUser',
  async (id: string, entityId: string): Promise<any> => {
    return fetch(`/api/v1/user/emotions/${id}?entityId=${entityId}`, {
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
  'removeEmotionUser',
  async (id: string, entityId: string): Promise<void> => {
    return fetch(`/api/v1/user/emotions/${id}?entityId=${entityId}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      },
    }).then(() => undefined);
  }
);
