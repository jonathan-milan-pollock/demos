describe('/reviews', () => {
  beforeEach(() => {
    cy.visit('/reviews');
  });

  it('has the correct title', () => {
    cy.title().should('eq', 'About');
  });

  it('has the correct description', () => {
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'This description is so meta'
    );
  });

  it('links to /reviews/review', () => {
    cy.get('a[routerlink="review"]').should(
      'have.attr',
      'href',
      '/reviews/review'
    );
  });
});
