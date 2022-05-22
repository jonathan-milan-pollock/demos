describe('/admin/videos', () => {
  beforeEach(() => {
    cy.login('/admin/videos');
  });

  it('has the correct title', () => {
    cy.title().should('eq', 'Admin Videos');
  });

  it('has the correct description', () => {
    cy.verifyMetaTag(
      'description',
      'Administrate Videos for Dark Rush Photography'
    );
  });

  it('has the correct open graph title', () => {
    cy.verifyMetaTag('"og:title"', 'Admin Videos');
  });

  it('has the correct open graph description', () => {
    cy.verifyMetaTag(
      '"og:description"',
      'Administrate Videos for Dark Rush Photography'
    );
  });

  it('has the correct open graph url', () => {
    cy.verifyMetaTag('"og:url"', '/admin/videos');
  });
});
