describe('/admin/sitemap', () => {
  beforeEach(() => {
    cy.login('/admin/sitemap');
  });

  it('has the correct title', () => {
    cy.title().should('eq', 'Admin Sitemap');
  });

  it('has the correct description', () => {
    cy.verifyMetaTag(
      'description',
      'Administrate Sitemap for Dark Rush Photography'
    );
  });

  it('has the correct open graph title', () => {
    cy.verifyMetaTag('"og:title"', 'Admin Sitemap');
  });

  it('has the correct open graph description', () => {
    cy.verifyMetaTag(
      '"og:description"',
      'Administrate Sitemap for Dark Rush Photography'
    );
  });

  it('has the correct open graph url', () => {
    cy.verifyMetaTag('"og:url"', '/admin/sitemap');
  });
});
