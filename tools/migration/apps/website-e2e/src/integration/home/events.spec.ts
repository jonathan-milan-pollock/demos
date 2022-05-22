describe('/events', () => {
  beforeEach(() => {
    cy.visit('/events');
  });

  it('has the correct title', () => {
    cy.title().should('eq', 'Events');
  });

  it('has the correct description', () => {
    cy.verifyMetaTag(
      'description',
      'Event Photography by Dark Rush Photography'
    );
  });

  it('has the correct open graph title', () => {
    cy.verifyMetaTag('"og:title"', 'Events');
  });

  it('has the correct open graph description', () => {
    cy.verifyMetaTag(
      '"og:description"',
      'Event Photography by Dark Rush Photography'
    );
  });

  it('has the correct open graph url', () => {
    cy.verifyMetaTag('"og:url"', '/events');
  });

  it('links to /events/classic-cars-1952-pontiac', () => {
    cy.contains('Classic 1952 Pontiac').should(
      'have.attr',
      'href',
      '/events/classic-cars-1952-pontiac'
    );
  });
});
