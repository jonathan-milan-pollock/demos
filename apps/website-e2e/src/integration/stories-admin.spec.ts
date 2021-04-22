describe('/stories/admin', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/stories/admin');
  });

  it('greets with Reviews Admin', () => {
    cy.contains('h2', 'Reviews Admin');
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow logout', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow posting a Story', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow editing a Story', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow deleting a Story', () => {});
});
