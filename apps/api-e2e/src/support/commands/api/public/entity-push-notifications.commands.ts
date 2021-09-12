Cypress.Commands.add(
  'createEntityPushNotificationsPublic',
  async (
    channelId: string,
    channelToken: string,
    resourceId: string,
    resourceState: string
  ): Promise<void> => {
    return fetch(`v1/api/v1/entity-push-notifications`, {
      method: 'GET',
      headers: {
        'X-Goog-Channel-ID': channelId,
        'X-Goog-Channel-Token': channelToken,
        'X-Goog-Resource-ID': resourceId,
        'X-Goog-Resource-State': resourceState,
      },
    })
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);
