describe('/', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('routes to home for invalid routes', () => {
    cy.visit(`/${Math.random().toString()}`);
    cy.location('pathname').should('eq', '/');
  });

  it('has the correct title', () => {
    cy.title().should('eq', 'Dark Rush Photography');
  });

  it('has the correct description', () => {
    cy.verifyMetaTag(
      'description',
      'About the Photographers of Dark Rush Photography who specialize in Event Photography, Real Estate Photography, and Extended Reality (XR)'
    );
  });

  it('has the correct open graph title', () => {
    cy.verifyMetaTag('"og:title"', 'About');
  });

  it('has the correct open graph description', () => {
    cy.verifyMetaTag(
      '"og:description"',
      'About the Photographers of Dark Rush Photography who specialize in Event Photography, Real Estate Photography, and Extended Reality (XR)'
    );
  });

  it('has the correct open graph url', () => {
    cy.verifyMetaTag('"og:url"', '/about');
  });

  it('links to /about', () => {
    cy.contains('About').should('have.attr', 'href', '/about');
  });

  it('links to /reviews', () => {
    cy.contains('Reviews').should('have.attr', 'href', '/reviews');
  });

  it('links to /', () => {
    cy.contains('Home').should('have.attr', 'href', '/');
  });

  it('links to /photo-of-the-week', () => {
    cy.contains('Photo of the Week').should(
      'have.attr',
      'href',
      '/photo-of-the-week'
    );
  });

  it('links to /events', () => {
    cy.contains('Events').should('have.attr', 'href', '/events');
  });

  it('links to /destinations', () => {
    cy.contains('Destinations').should('have.attr', 'href', '/destinations');
  });
});
