describe('/events/classic-cars-1952-pontiac', () => {
  beforeEach(() => {
    cy.visit('/events/classic-cars-1952-pontiac');
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

  it('links to /events/classic-cars-1952-pontiac/classic-cars-1952-pontiac-1', () => {
    cy.contains('classic-cars-1952-pontiac-1').should(
      'have.attr',
      'href',
      '/events/classic-cars-1952-pontiac/classic-cars-1952-pontiac-1'
    );
  });
});
