describe('/destinations/colorado', () => {
  beforeEach(() => {
    cy.visit('/destinations/colorado');
  });

  it('has a title', () => {
    cy.title().should('eq', 'My Awesome Application');
  });

  it('has a description', () => {
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'This description is so meta'
    );
  });
});
