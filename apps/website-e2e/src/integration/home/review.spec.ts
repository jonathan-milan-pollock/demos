describe('/reviews/review', () => {
  beforeEach(() => {
    cy.visit('/reviews/review');
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
});
