/* eslint-disable @typescript-eslint/no-explicit-any */
Cypress.Commands.add('findAllReviewsPublic', async (): Promise<any[]> => {
  return fetch('/api/v1/review', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => JSON.parse(json));
});
