/* eslint-disable @typescript-eslint/no-explicit-any */
Cypress.Commands.add('findOneReviewMediaPublic', async (): Promise<any> => {
  return fetch('/api/v1/review-media', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => JSON.parse(json));
});
