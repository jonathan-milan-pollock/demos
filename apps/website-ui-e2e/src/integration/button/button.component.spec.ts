describe('website-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--primary&knob-text=Click me!&knob-padding=0&knob-style=default'));

  it('should render the component', () => {
    cy.get('drp-button').should('exist');
  });
});
