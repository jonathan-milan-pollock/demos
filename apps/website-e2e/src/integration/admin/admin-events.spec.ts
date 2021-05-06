describe('/admin/events', () => {
  beforeEach(() => {
    cy.login('/admin/events');
  });

  it('has the correct title', () => {
    cy.title().should('eq', 'Admin Events');
  });

  it('has the correct description', () => {
    cy.verifyMetaTag(
      'description',
      'Administrate Events for Dark Rush Photography'
    );
  });

  it('has the correct open graph title', () => {
    cy.verifyMetaTag('"og:title"', 'Admin Events');
  });

  it('has the correct open graph description', () => {
    cy.verifyMetaTag(
      '"og:description"',
      'Administrate Events for Dark Rush Photography'
    );
  });

  it('has the correct open graph url', () => {
    cy.verifyMetaTag('"og:url"', '/admin/events');
  });

  /*
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow logout', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow posting an Event', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow editing an Event', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow deleting an Event', () => {});
  */
});
