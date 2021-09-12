export const AUTH0_AUDIENCE = 'https://www.darkrushphotography.com';
export const AUTH0_ISSUER = 'https://darkrushphotography.us.auth0.com/';

Cypress.Commands.add('authenticateApi', async (): Promise<string> => {
  if (Cypress.env('ACCESS_TOKEN'))
    return Promise.resolve(Cypress.env('ACCESS_TOKEN'));

  if (!Cypress.env('AUTH0_CLIENT_ID')) {
    throw new Error(
      'Please add CYPRESS_AUTH0_CLIENT_ID to environment variables'
    );
  }

  if (!Cypress.env('AUTH0_CLIENT_SECRET')) {
    throw new Error(
      'Please add CYPRESS_AUTH0_CLIENT_SECRET to environment variables'
    );
  }

  return fetch(`${AUTH0_ISSUER}oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: Cypress.env('AUTH0_CLIENT_ID'),
      client_secret: Cypress.env('AUTH0_CLIENT_SECRET'),
      audience: AUTH0_AUDIENCE,
      grant_type: 'client_credentials',
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      Cypress.env('ACCESS_TOKEN', json.access_token);
      return Cypress.env('ACCESS_TOKEN');
    });
});
