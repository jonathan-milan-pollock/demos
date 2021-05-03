describe('/stories', () => {
  beforeEach(() => {
    cy.visit('/stories');
  });

  it('contains a header with stories works', () => {
    cy.contains('p', 'stories works!');
  });

  it('links to /stories/classic-cars-1952-pontiac', () => {
    cy.contains('Classic 1952 Pontiac').should(
      'have.attr',
      'href',
      '/stories/classic-cars-1952-pontiac'
    );
  });
});
