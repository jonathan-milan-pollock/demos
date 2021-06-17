describe('form-identifier-group', () => {
  beforeEach(() => {
    cy.visitStorybook();
    cy.loadStory('ui-admin-form-identifier-group', 'default-story');
  });

  it('renders the component', () => {
    cy.verifyRendersDataTestId('identifier-group');
  });

  it('renders an invalid pattern error when slug input is not valid', () => {
    cy.verifySlugPatternErrorDisplayed('group-input');
  });

  it('renders a group input', () => {
    cy.verifyRendersDataTestId('group-input');
  });

  it('renders group input with group form control name', () => {
    cy.verifyFormControlName('groupFormControlName', 'group2', 'group-input');
  });

  it('renders groups that are provided to the component', () => {
    cy.changeArg('groups', [2001]);
    cy.get('mat-select[data-testid=group-input]')
      .click()
      .get('mat-option')
      .contains('2001')
      .click()
      .should('exist');
  });

  it('does not render groups is groups are not provided', () => {
    cy.changeArg('groups', []);
    cy.get('mat-select[data-testid=group-input]')
      .click()
      .get('span')
      .contains('2001')
      .should('not.exist');
  });

  it('renders a required error when group value is not selected', () => {
    cy.get('mat-select[data-testid=group-input]')
      .click()
      .type('{esc}')
      .get('input[data-testid=slug-input]')
      .click()
      .get('mat-error[role=alert]')
      .contains('Group is required')
      .should('be.visible');
  });

  it('renders a slug input', () => {
    cy.verifyRendersDataTestId('slug-input');
  });

  it('renders slug input with slug form control name', () => {
    cy.verifyFormControlName('slugFormControlName', 'slug2', 'slug-input');
  });

  it('renders a required error when slug input is not entered', () => {
    cy.verifyRequiredInputErrorDisplayed(
      'group-input',
      'slug-input',
      'Slug is required'
    );
  });
});
