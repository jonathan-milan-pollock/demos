describe('/destinations/colorado', () => {
  beforeEach(() => {
    cy.visit('/destinations/colorado');
  });

  it('has the correct title', () => {
    cy.title().should('eq', 'Colorado');
  });

  it('has the correct description', () => {
    cy.verifyMetaTag(
      'description',
      'An Extended Reality (XR) experience in Colorado presented by Dark Rush Photography'
    );
  });

  it('has the correct open graph title', () => {
    cy.verifyMetaTag('"og:title"', 'Colorado');
  });

  it('has the correct open graph description', () => {
    cy.verifyMetaTag(
      '"og:description"',
      'An Extended Reality (XR) experience in Colorado presented by Dark Rush Photography'
    );
  });

  it('has the correct open graph url', () => {
    cy.verifyMetaTag('"og:url"', '/destinations/colorado');
  });
});
