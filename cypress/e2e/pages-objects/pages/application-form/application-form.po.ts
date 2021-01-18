import { $ } from '../../../components/misc-utils/df-elements-helper';

import { ApplicationFormConstant } from './application-form.constant';

const {
  attribute: { classes, formControlName: fNames, ids },
  elementsNames: eNames,
} = ApplicationFormConstant;
export class ApplicationForm {
  static readonly form = Object.freeze({
    get applicationForm() {
      return $(`[class*='${classes.applyForm}']`, eNames.applyForm);
    },

    get firstName() {
      return $(`[formcontrolname='${fNames.firstName}']`, fNames.firstName);
    },

    get lastName() {
      return $(`[formcontrolname='${fNames.lastName}']`, fNames.lastName);
    },

    get email() {
      return $(`[formcontrolname='${fNames.email}']`, fNames.email);
    },

    get linkedIn() {
      return $(`[formcontrolname='${fNames.linkedIn}']`, 'LinkedIn');
    },

    get country() {
      return $(`[formcontrolname='${fNames.country}']`, fNames.country);
    },

    get phoneNo() {
      return $(`[id='${ids.phone}']`, ids.phone);
    },

    get oneAccount() {
      return $(`[formcontrolname='${fNames.oneAccount}']`, fNames.oneAccount);
    },

    get emailOptIn() {
      return $(`[formcontrolname='${fNames.emailOptIn}']`, fNames.emailOptIn);
    },

    get submitButton() {
      return $(`[class*='${classes.submitButton}']`, eNames.submitButton);
    },

    errorMessage(message: string) {
      return cy.contains("[role='alert']", message);
    },

    get dropDownArrow() {
      return $(`[class='${classes.dropDownArrow}']`, eNames.dropDownArrow);
    },

    get countrySearchBox() {
      return $(`[id='${ids.countrySearchBox}']`, eNames.countrySearchBox);
    },

    countryNameDropDownItem(countryName: string) {
      return cy.contains("[class*='country-name']", countryName).parent('li');
    },

    get oneAccountInput() {
      return $(`[formcontrolname='${fNames.oneAccount}'] label div input`, fNames.oneAccount);
    },

    get emailOptInInput() {
      return $(`[formcontrolname='${fNames.emailOptIn}'] label div input`, fNames.emailOptIn);
    },

    get takeTourDialog() {
      return cy.cssContainingText("[class*='dialog-title']", eNames.welcomeMsg);
    },

    userProfileName(userName: string) {
      return cy.cssContainingText("[class*='user-name']", userName);
    },

    get youHaveActiveAppAlertHeading() {
      return cy.cssContainingText(`[class*='${classes.alertTitle}']`, eNames.activeApplication);
    },

    get gotoMyActiveAppButton() {
      return cy.cssContainingText(`[class*='${classes.button}']`, eNames.gotoMyApp);
    },

    get cannotApplyHeading() {
      return cy.cssContainingText(`[class*='${classes.alertTitle}']`, eNames.cannotApply);
    },

    get cancelButton() {
      return cy.cssContainingText(`[class*='${classes.cancelButton}']`, eNames.cancel);
    },

    get okButton() {
      return cy.cssContainingText(`[class*='${classes.button}']`, eNames.ok);
    },

    get pipelineContent() {
      return $(`div[class*='${classes.pipelineContent}']`, eNames.pipelineContent);
    },
  });
}
