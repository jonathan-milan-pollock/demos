describe('/reviews/admin', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/reviews/admin');
  });

  it('greets with Reviews Admin', () => {
    cy.contains('h2', 'Reviews Admin');
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('redirects to login page if not logged in', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('allows adding a Review', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('allows editing a Review', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('allows deleting a Review', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('allows logout', () => {});
});
