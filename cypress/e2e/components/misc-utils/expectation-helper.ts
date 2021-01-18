import { StepLogger } from '../../core/step-logger';

import { DfElement } from './df-elements-helper';

export class ExpectationHelper {
  static verifyTextContains(element: DfElement, text: string) {
    element.vItem.then(($txt: JQuery<HTMLElement>) => {
      expect($txt.text()).to.contain(text);
    });
  }

  static verifyStringValueContains(element: DfElement, expectedValue: string, actualValue: string) {
    StepLogger.step(`Verify ${element.name} have ${expectedValue}`);
    expect(expectedValue).to.contain(actualValue);
  }

  static verifyDisplayedStatus(element: Cypress.Chainable<any>) {
    element.should('be.visible');
  }

  static verifyAttributeValue(element: DfElement, expectedValue: string) {
    element.vItem.then(($txt: JQuery<HTMLElement>) => {
      expect($txt.val()).to.contain(expectedValue);
    });
  }
}
