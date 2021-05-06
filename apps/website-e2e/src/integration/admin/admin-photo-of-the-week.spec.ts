describe('/admin/photo-of-the-week', () => {
  beforeEach(() => {
    cy.login('/admin/photo-of-the-week');
  });

  it('has the correct title', () => {
    cy.title().should('eq', 'Admin Photo of the Week');
  });

  it('has the correct description', () => {
    cy.verifyMetaTag(
      'description',
      'Administrate Photo of the Week for Dark Rush Photography'
    );
  });

  it('has the correct open graph title', () => {
    cy.verifyMetaTag('"og:title"', 'Admin Photo of the Week');
  });

  it('has the correct open graph description', () => {
    cy.verifyMetaTag(
      '"og:description"',
      'Administrate Photo of the Week for Dark Rush Photography'
    );
  });

  it('has the correct open graph url', () => {
    cy.verifyMetaTag('"og:url"', '/admin/photo-of-the-week');
  });

  /*
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('Should allow login', () => {});

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('Should allow logout', () => {});

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('Should allow adding a Photo of the Week', () => {});

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('Should allow editing a Photo of the Week', () => {});

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('Should allow deleting a Photo of the Week', () => {});
    */
});
