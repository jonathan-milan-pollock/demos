describe('/about', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io');
  });

  it('displays Dark Rush Photography information', () => {
    cy.contains('type').click();
    cy.url().should('include', '/commands/actions');

    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'face@email.com');
  });

  /*
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('displays Dark Rush information', () => {});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('displays Milan Pollock information', () => {});
  */
});
