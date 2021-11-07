Cypress.Commands.add(
  'loadDarkRushPhotographySitemapPublicSitemaps',
  (): Cypress.Chainable<Cypress.Response<string>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/sitemaps/dark-rush-photography`,
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'loadThirtySevenPhotosSitemapPublicSitemaps',
  (): Cypress.Chainable<Cypress.Response<string>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/sitemaps/thirty-seven-photos`,
      failOnStatusCode: false,
    })
);
