/* eslint-disable @typescript-eslint/no-explicit-any */
Cypress.Commands.add('findAllDestinationsPublic', async (): Promise<any[]> => {
  return fetch('/api/v1/destinations', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => JSON.parse(json));
});

Cypress.Commands.add(
  'findOneDestinationPublic',
  async (id: string): Promise<any> => {
    return fetch(`/api/v1/destinations/${id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);
