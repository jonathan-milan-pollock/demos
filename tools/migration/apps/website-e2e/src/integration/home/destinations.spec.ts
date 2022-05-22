describe('/destinations', () => {
  beforeEach(() => {
    cy.visit('/destinations');
  });

  it('has the correct title', () => {
    cy.title().should('eq', 'Destinations');
  });

  it('has the correct description', () => {
    cy.verifyMetaTag(
      'description',
      'Extended Reality (XR) destinations presented by Dark Rush Photography'
    );
  });

  it('has the correct open graph title', () => {
    cy.verifyMetaTag('"og:title"', 'Destinations');
  });

  it('has the correct open graph description', () => {
    cy.verifyMetaTag(
      '"og:description"',
      'Extended Reality (XR) destinations presented by Dark Rush Photography'
    );
  });

  it('has the correct open graph url', () => {
    cy.verifyMetaTag('"og:url"', '/destinations');
  });
});
