describe('/reviews', () => {
  beforeEach(() => {
    cy.visit('/reviews');
  });

  it('contains a header with reviews works', () => {
    cy.contains('p', 'reviews works!');
  });

  it('links to /reviews/review', () => {
    cy.get('a[routerlink="review"]').should(
      'have.attr',
      'href',
      '/reviews/review'
    );
  });
});
