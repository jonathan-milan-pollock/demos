describe('/destinations', () => {
  beforeEach(() => {
    cy.visit('/destinations');
  });

  it('contains a header with destinations works', () => {
    cy.contains('p', 'destinations works!');
  });

  it('links to /destinations/colorado', () => {
    cy.contains(`Colorado`).should(
      'have.attr',
      'href',
      '/destinations/colorado'
    );
  });
});
