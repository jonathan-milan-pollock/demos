/* eslint-disable @typescript-eslint/no-explicit-any */
Cypress.Commands.add('findAllEventsPublic', async (): Promise<any[]> => {
  return fetch('/api/v1/events', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => JSON.parse(json));
});

Cypress.Commands.add('findOneEventPublic', async (id: string): Promise<any> => {
  return fetch(`/api/v1/events/${id}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => JSON.parse(json));
});
