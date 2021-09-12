/* eslint-disable @typescript-eslint/no-explicit-any */

Cypress.Commands.add('findAllBestOfPublic', async (): Promise<any[]> => {
  return fetch('v1/api/best-of', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => JSON.parse(json));
});

Cypress.Commands.add(
  'findOneBestOfPublic',
  async (bestofType: string): Promise<any> => {
    return fetch(`/api/v1/best-of/${bestofType}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);
