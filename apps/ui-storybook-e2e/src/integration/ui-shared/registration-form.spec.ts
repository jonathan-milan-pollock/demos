describe('registration-form', () => {
  beforeEach(() => cy.visit('/iframe.html?id=registrationformcomponent'));

  it('should render the component', () => {
    cy.get('drp-button').should('exist');
  });

  it('requires email', () => {
    cy.get('form').contains('Sign in').click();
    cy.get('.error-messages').should('contain', "email can't be blank");
  });

  it('requires password', () => {
    cy.get('[data-testid=email]').type('dark@darkrush.photo{enter}');
    cy.get('.error-messages').should('contain', "password can't be blank");
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('requires valid username and password', () => {});
});
