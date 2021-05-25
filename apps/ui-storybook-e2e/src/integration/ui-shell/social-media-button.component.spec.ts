describe('social-media-button', () => {
  before(() => {
    cy.visitStorybook();
  });

  beforeEach(() => cy.loadStory('ui-common-social-media-button', 'facebook'));

  it('renders the component', () => {
    cy.get('a[data-testid=social-media-button]').should('exist');
  });

  it('contains a fontawesome icon', () => {
    cy.get('fa-icon[data-testid=social-media-button-icon]').should('exist');
  });

  it('sets an aria-label', () => {
    cy.changeArg('ariaLabel', 'aria label value');

    cy.get('[data-testid=social-media-button]').should(
      'have.attr',
      'aria-label',
      'aria label value'
    );
  });

  it('fires the clicked with the name of the facebook icon', () => {
    cy.get('[data-testid=social-media-button]').click();
    cy.storyAction('clicked').should('have.been.calledWith', 'facebook-f');
  });
});
