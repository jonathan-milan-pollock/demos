describe('form-document-metadata-group', () => {
  beforeEach(() => {
    cy.visitStorybook();
    cy.loadStory('ui-admin-form-metadata-group', 'default-story');
  });

  it('renders the component', () => {
    cy.get('fieldset[data-testid=metadata-group]').should('be.visible');
  });

  it('renders legend if show legend true', () => {
    cy.changeArg('showLegend', true);
    cy.get('legend[data-testid=legend]').should('be.visible');
  });

  it('renders without legend if show legend false', () => {
    cy.changeArg('showLegend', false);
    cy.get('legend[data-testid=legend]').should('not.exist');
  });

  it('renders label with entered label', () => {
    cy.changeArg('titleLabel', 'Name');
    cy.get('mat-label[data-testid=title-label]')
      .contains('Name')
      .should('be.visible');
  });

  it('renders a title input', () => {
    cy.get('input[data-testid=title-input]').should('be.visible');
  });

  it('renders title input with title form control name', () => {
    cy.changeArg('titleFormControlName', 'title2');
    cy.get('input[data-testid=title-input]').should(
      'have.attr',
      'ng-reflect-name',
      'title2'
    );
  });

  it('renders a required error when title input is not entered', () => {
    cy.get('input[data-testid=title-input]')
      .type('A')
      .type('{backspace}')
      .get('textarea[data-testid=description-input]')
      .click()
      .get('mat-error[role=alert]')
      .contains('Title is required')
      .should('be.visible');
  });

  it('renders a required error with updated title label when title input is not entered', () => {
    cy.changeArg('titleLabel', 'Name');
    cy.get('input[data-testid=title-input]')
      .type('A')
      .type('{backspace}')
      .get('textarea[data-testid=description-input]')
      .click()
      .get('mat-error[role=alert]')
      .contains('Name is required')
      .should('be.visible');
  });

  /*

  it('renders an invalid pattern error when slug input is not valid', () => {
    cy.get('input[data-testid=slug-input]')
      .type('An Invalid Value')
      .get('mat-select[data-testid=group-input]')
      .click()
      .get('mat-error[role=alert]')
      .contains('Slug allows lowercase and dash (-) characters')
      .should('be.visible');
  });

  it('renders a group input', () => {
    cy.get('mat-select[data-testid=group-input]').should('be.visible');
  });

  it('does not render a group input if identifier has group is false', () => {
    cy.changeArg('showGroup', false);
    cy.get('mat-select[data-testid=group-input]').should('not.exist');
  });

  it('renders group input with group form control name', () => {
    cy.changeArg('groupFormControlName', 'group2');
    cy.get('mat-select[data-testid=group-input]').should(
      'have.attr',
      'ng-reflect-name',
      'group2'
    );
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
  */
});
