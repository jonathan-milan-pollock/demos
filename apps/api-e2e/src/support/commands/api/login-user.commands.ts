import {
  AUTH0_AUDIENCE,
  AUTH0_ISSUER,
} from '@dark-rush-photography/shared/types';

Cypress.Commands.add('loginUser', async (): Promise<string> => {
  if (Cypress.env('ACCESS_TOKEN'))
    return Promise.resolve(Cypress.env('ACCESS_TOKEN'));

  if (!Cypress.env('AUTH0_CLIENT_ID')) {
    throw new Error(
      'Please add CYPRESS_AUTH0_CLIENT_ID to environment variables'
    );
  }

  if (!Cypress.env('AUTH0_EMAIL')) {
    throw new Error('Please add CYPRESS_AUTH0_EMAIL to environment variables');
  }

  if (!Cypress.env('AUTH0_PASSWORD')) {
    throw new Error(
      'Please add CYPRESS_AUTH0_PASSWORD to environment variables'
    );
  }

  return fetch(`${AUTH0_ISSUER}oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'password',
      audience: AUTH0_AUDIENCE,
      client_id: Cypress.env('AUTH0_CLIENT_ID'),
      username: Cypress.env('AUTH0_EMAIL'),
      password: Cypress.env('AUTH0_PASSWORD'),
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      Cypress.env('ACCESS_TOKEN', json.access_token);
      return Cypress.env('ACCESS_TOKEN');
    });
});
