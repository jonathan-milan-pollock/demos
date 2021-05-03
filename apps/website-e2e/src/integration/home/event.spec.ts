describe('/events/classic-cars-1952-pontiac', () => {
  beforeEach(() => {
    cy.visit('/events/classic-cars-1952-pontiac');
  });

  it('contains a header with event works', () => {
    cy.contains('p', 'event works!');
  });

  it('links to /events/classic-cars-1952-pontiac/classic-cars-1952-pontiac-1', () => {
    cy.contains('classic-cars-1952-pontiac-1').should(
      'have.attr',
      'href',
      '/events/classic-cars-1952-pontiac/classic-cars-1952-pontiac-1'
    );
  });
});
