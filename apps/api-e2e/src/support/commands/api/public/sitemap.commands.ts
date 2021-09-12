Cypress.Commands.add('findSitemapPublic', async (): Promise<string> => {
  return fetch('/api/v1/sitemap', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => JSON.parse(json));
});
