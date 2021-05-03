describe('/', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('contains a header with home works', () => {
    cy.contains('p', 'home-images works!');
  });

  it('routes to home for invalid routes', () => {
    cy.visit(`/${Math.random().toString()}`);

    cy.location('pathname').should('eq', '/');
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

  it('links to /stories', () => {
    cy.contains('Stories').should('have.attr', 'href', '/stories');
  });

  it('links to /destinations', () => {
    cy.contains('Destinations').should('have.attr', 'href', '/destinations');
  });
});
