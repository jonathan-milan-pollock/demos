describe('/photo-of-the-week', () => {
  beforeEach(() => {
    cy.visit('/photo-of-the-week');
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

  it('links to /photo-of-the-week/aint-no-mountain-high-enough', () => {
    cy.contains(`Ain't No Mountain High Enough`).should(
      'have.attr',
      'href',
      '/photo-of-the-week/aint-no-mountain-high-enough'
    );
  });
});
