describe('/photo-of-the-week/aint-no-mountain-high-enough', () => {
  beforeEach(() => {
    cy.visit('/photo-of-the-week/aint-no-mountain-high-enough');
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
