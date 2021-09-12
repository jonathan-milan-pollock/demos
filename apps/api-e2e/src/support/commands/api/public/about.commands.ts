/* eslint-disable @typescript-eslint/no-explicit-any */

Cypress.Commands.add('findAllAboutPublic', async (): Promise<any[]> => {
  return fetch('v1/api/about', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => JSON.parse(json));
});
