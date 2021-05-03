describe('/events/admin', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/events/admin');
  });

  it('greets with Events Admin', () => {
    cy.contains('h2', 'Events Admin');
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow logout', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow posting an Event', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow editing an Event', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('Should allow deleting an Event', () => {});
});
