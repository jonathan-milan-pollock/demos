describe('/reviews/review', () => {
  beforeEach(() => {
    cy.visit('/reviews/review');
  });

  it('contains a header with review works', () => {
    cy.contains('p', 'review works!');
  });
});
