/* eslint-disable @typescript-eslint/no-explicit-any */
Cypress.Commands.add(
  'findAllPhotoOfTheWeekPublic',
  async (): Promise<any[]> => {
    return fetch('/api/v1/photo-of-the-week', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);

Cypress.Commands.add(
  'findOnePhotoOfTheWeekPublic',
  async (id: string): Promise<any> => {
    return fetch(`/api/v1/photo-of-the-week/${id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => JSON.parse(json));
  }
);
