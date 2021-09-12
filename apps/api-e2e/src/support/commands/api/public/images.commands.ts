/* eslint-disable @typescript-eslint/no-explicit-any */
Cypress.Commands.add('findOneImagePublic', async (id: string): Promise<any> => {
  return fetch(`/api/v1/images/${id}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => JSON.parse(json));
});
