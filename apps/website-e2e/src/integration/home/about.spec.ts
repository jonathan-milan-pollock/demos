describe('/about', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('loads the about page at the correct url', () => {
    cy.url().should('eq', 'http://localhost:4200/about');
  });

  it('contains a header with about works', () => {
    cy.contains('p', 'about works!');
  });
});
