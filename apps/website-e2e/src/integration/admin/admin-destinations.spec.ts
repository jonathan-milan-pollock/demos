describe('/admin/destinations', () => {
  beforeEach(() => {
    cy.login('/admin/destinations');
  });

  it('has the correct title', () => {
    cy.title().should('eq', 'Admin Destinations');
  });

  it('has the correct description', () => {
    cy.verifyMetaTag(
      'description',
      'Administrate Destinations for Dark Rush Photography'
    );
  });

  it('has the correct open graph title', () => {
    cy.verifyMetaTag('"og:title"', 'Admin Destinations');
  });

  it('has the correct open graph description', () => {
    cy.verifyMetaTag(
      '"og:description"',
      'Administrate Destinations for Dark Rush Photography'
    );
  });

  it('has the correct open graph url', () => {
    cy.verifyMetaTag('"og:url"', '/admin/destinations');
  });

  /*
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow login', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow registration', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow logout', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow updating settings', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow favorite a photo', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow deep linking if accessing from an iPhone', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should display destination if not displaying from an iPhone', () => {});
  */
});
