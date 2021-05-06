// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
    verifyRendersDataTestId(dataTestId: string): void;
    verifyFormControlName(
      formControlName: string,
      formControlNameValue: string,
      dataTestId: string
    ): void;
    verifyRequiredInputErrorDisplayed(
      inputDataTestId: string,
      otherDataTestId: string,
      errorMessage: string
    ): void;
    verifySlugPatternErrorDisplayed(otherDataTestId: string): void;
  }
}

Cypress.Commands.add('verifyRendersDataTestId', (dataTestId: string) => {
  cy.get(`[data-testid=${dataTestId}`).should('be.visible');
});

Cypress.Commands.add(
  'verifyFormControlName',
  (
    formControlName: string,
    formControlNameValue: string,
    dataTestId: string
  ) => {
    cy.changeArg(formControlName, formControlNameValue);
    cy.get(`[data-testid=${dataTestId}]`).should(
      'have.attr',
      'ng-reflect-name',
      formControlNameValue
    );
  }
);

Cypress.Commands.add(
  'verifyRequiredInputErrorDisplayed',
  (inputDataTestId: string, otherDataTestId: string, errorMessage: string) => {
    cy.get(`[data-testid=${inputDataTestId}]`)
      .type('A')
      .type('{backspace}')
      .get(`[data-testid=${otherDataTestId}]`)
      .click()
      .get('mat-error[role=alert]')
      .contains(errorMessage)
      .should('be.visible');
  }
);

Cypress.Commands.add(
  'verifySlugPatternErrorDisplayed',
  (otherDataTestId: string) => {
    cy.get('[data-testid=slug-input]')
      .type('An Invalid Value')
      .get(`[data-testid=${otherDataTestId}]`)
      .click()
      .get('mat-error[role=alert]')
      .contains('Slug allows lowercase and dash (-) characters')
      .should('be.visible');
  }
);

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
