describe('form-review-group', () => {
  beforeEach(() => {
    cy.visitStorybook();
    cy.loadStory('ui-admin-form-review-group', 'default-story');
  });

  it('renders the component', () => {
    cy.verifyRendersDataTestId('review-group');
  });

  it('renders a slug input', () => {
    cy.verifyRendersDataTestId('slug-input');
  });

  it('renders slug input with slug form control name', () => {
    cy.verifyFormControlName('slugFormControlName', 'slug2', 'slug-input');
  });

  it('renders a required error when slug input is not entered', () => {
    cy.verifyRequiredInputErrorDisplayed(
      'slug-input',
      'name-input',
      'Slug is required'
    );
  });

  it('renders an invalid pattern error when slug input is not valid', () => {
    cy.verifySlugPatternErrorDisplayed('name-input');
  });

  it('renders a name input', () => {
    cy.verifyRendersDataTestId('name-input');
  });

  it('renders name input with name form control name', () => {
    cy.verifyFormControlName('nameFormControlName', 'name2', 'name-input');
  });

  it('renders a required error when name is not entered', () => {
    cy.verifyRequiredInputErrorDisplayed(
      'name-input',
      'text-input',
      'Name is required'
    );
  });

  it('renders a text input', () => {
    cy.verifyRendersDataTestId('text-input');
  });

  it('renders text input with text form control name', () => {
    cy.verifyFormControlName('textFormControlName', 'text2', 'text-input');
  });

  it('renders a required error when text is not entered', () => {
    cy.verifyRequiredInputErrorDisplayed(
      'text-input',
      'name-input',
      'Text is required'
    );
  });
});
