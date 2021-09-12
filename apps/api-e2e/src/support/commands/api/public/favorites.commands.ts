/* eslint-disable @typescript-eslint/no-explicit-any */
Cypress.Commands.add('findOneFavoritesPublic', async (): Promise<any> => {
  return fetch('/api/v1/favorites', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => JSON.parse(json));
});
