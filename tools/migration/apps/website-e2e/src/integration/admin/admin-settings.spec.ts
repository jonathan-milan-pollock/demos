describe('/admin/settings', () => {
  beforeEach(() => {
    cy.login('/admin/settings');
  });

  it('has the correct title', () => {
    cy.title().should('eq', 'Admin Settings');
  });

  it('has the correct description', () => {
    cy.verifyMetaTag(
      'description',
      'Administrate Settings for Dark Rush Photography'
    );
  });

  it('has the correct open graph title', () => {
    cy.verifyMetaTag('"og:title"', 'Admin Settings');
  });

  it('has the correct open graph description', () => {
    cy.verifyMetaTag(
      '"og:description"',
      'Administrate Settings for Dark Rush Photography'
    );
  });

  it('has the correct open graph url', () => {
    cy.verifyMetaTag('"og:url"', '/admin/settings');
  });
});
