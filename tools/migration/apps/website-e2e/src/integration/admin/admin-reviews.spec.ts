describe('/admin/reviews', () => {
  beforeEach(() => {
    cy.login('/admin/reviews');
  });

  it('has the correct title', () => {
    cy.title().should('eq', 'Admin Reviews');
  });

  it('has the correct description', () => {
    cy.verifyMetaTag(
      'description',
      'Administrate Reviews for Dark Rush Photography'
    );
  });

  it('has the correct open graph title', () => {
    cy.verifyMetaTag('"og:title"', 'Admin Reviews');
  });

  it('has the correct open graph description', () => {
    cy.verifyMetaTag(
      '"og:description"',
      'Administrate Reviews for Dark Rush Photography'
    );
  });

  it('has the correct open graph url', () => {
    cy.verifyMetaTag('"og:url"', '/admin/reviews');
  });

  /*
  it('greets with Reviews Admin', () => {d
    cy.contains('h2', 'Reviews Admin');
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('redirects to login page when not logged in', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('allows adding a Review', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('allows editing a Review', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('allows deleting a Review', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('allows logout', () => {});
  */
});
