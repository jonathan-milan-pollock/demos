describe('/admin', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });

  it('has the correct title', () => {
    cy.title().should('eq', 'Admin');
  });

  it('has the correct description', () => {
    cy.verifyMetaTag('description', 'Administration for Dark Rush Photography');
  });

  it('has the correct open graph title', () => {
    cy.verifyMetaTag('"og:title"', 'Admin');
  });

  it('has the correct open graph description', () => {
    cy.verifyMetaTag(
      '"og:description"',
      'Administration for Dark Rush Photography'
    );
  });

  it('has the correct open graph url', () => {
    cy.verifyMetaTag('"og:url"', '/admin');
  });

  /*
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('greets with Sign in', () => {
    // should have a button with the text Sign in
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('allows a user to register', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('links to #/photo-of-the-week/admin', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('links to /admin/events', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('links to #/destinations/admin', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('links to #/reviews/admin', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('navigates to #/ on successful login', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('logs a user out when Log Out button clicked', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('clears session when a user logs out', () => {
    /*
  const store = createStore(reducer, ...)
  if (window.Cypress){
    window.__store__ = store
  }

    //cy
    //   .window()
    //   .its('__store__')
    //   .then((store) => {
    //    store.dispatch({type: 'LOGOUT'})
    //  })
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'jwt')
      .should('not.exist');
  });
  */
});
