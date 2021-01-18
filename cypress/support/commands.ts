import 'happo-cypress';

// tslint:disable-next-line: no-namespace
declare global {
  namespace Cypress {
    interface Chainable {
     cssContainingText(locator: string, text: string): Cypress.Chainable<any>;
    }
  }
}

Cypress.Commands.add(
  'cssContainingText',
  (locator, text): Cypress.Chainable<any> => {
    return cy.contains(locator, text);
  },
);

Cypress.on('uncaught:exception', (_err: any, _runnable: any) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
