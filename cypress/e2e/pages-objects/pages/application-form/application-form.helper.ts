import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { RandomHelper } from '../../../components/misc-utils/random-helper';
import { StepLogger } from '../../../core/step-logger';
import { EndpointHelper } from '../../../helpers/end-point.helper';
import { User } from '../../../helpers/user.helper';
import { BasePageHelper } from '../base-page.helper';

import { ApplicationFormConstant } from './application-form.constant';
import { ApplicationForm } from './application-form.po';

export class ApplicationFormHelper extends BasePageHelper {
  private constructor() {
    super();
  }
  private static vInstance: ApplicationFormHelper;

  public static getInstance(): ApplicationFormHelper {
    return this.vInstance || (this.vInstance = new this());
  }

  static verifyApplicationForm() {
    StepLogger.subStep('Verify Application form opens');
    ApplicationForm.form.applicationForm.verifyDisplayedStatus();
  }

  static verifyFormDetails() {
    StepLogger.subStep('Verify Application form details');
    ApplicationForm.form.firstName.verifyDisplayedStatus();
    ApplicationForm.form.lastName.verifyDisplayedStatus();
    ApplicationForm.form.email.verifyDisplayedStatus();
    ApplicationForm.form.linkedIn.verifyDisplayedStatus();
    ApplicationForm.form.country.verifyDisplayedStatus();
    ApplicationForm.form.phoneNo.verifyDisplayedStatus();
    ApplicationForm.form.oneAccount.verifyDisplayedStatus();
    ApplicationForm.form.emailOptIn.verifyDisplayedStatus();
    ApplicationForm.form.submitButton.verifyDisplayedStatus();
  }

  static enterFirstName(text: string) {
    StepLogger.subStep('Enter the firstName');
    ApplicationForm.form.firstName.sendKeys(text);
  }

  static enterLastName(text: string) {
    StepLogger.subStep('Enter the last name');
    ApplicationForm.form.lastName.sendKeys(text);
  }

  static verifySubmitButtonDisable() {
    StepLogger.subStep('Verify Submit button is disabled');
    ApplicationForm.form.submitButton.verifyDisabledStatus();
  }

  static enterEmail(email: string) {
    StepLogger.subStep('Enter email Id');
    ApplicationForm.form.email.sendKeys(email);
  }

  static enterLinkedInAddress(linkedIn: string) {
    StepLogger.subStep('Enter LinkedIn Profile');
    ApplicationForm.form.linkedIn.sendKeys(linkedIn);
  }

  static verifyInvalidEmailErrorMessage() {
    StepLogger.subVerification('Verify Invalid Email Error');
    ApplicationForm.form.errorMessage(ApplicationFormConstant.elementsNames.invalidEmail).should('be.visible');
  }

  static verifyCountryIsSelected() {
    StepLogger.subVerification('Verify Country is selected');
    ApplicationForm.form.country.vItem.should('not.have.text', ApplicationFormConstant.elementsNames.pleaseSelect);
  }

  static enterPhoneNumber(phoneNo: string) {
    StepLogger.subStep('Enter Phone number');
    ApplicationForm.form.phoneNo.sendKeys(phoneNo);
  }

  static enterPhoneNumberWithCountryCode(countryName: string, phoneNo: string) {
    StepLogger.subStep('Enter Phone number with country code');
    ApplicationForm.form.dropDownArrow.click();
    ApplicationForm.form.countrySearchBox.typeSlowly(countryName, 500);
    ApplicationForm.form
      .countryNameDropDownItem(countryName)
      .should('be.visible')
      .click();
    this.enterPhoneNumber(phoneNo);
  }

  static verifySubmitApplicationButtonEnabled() {
    StepLogger.subVerification('Verify Submit application button enabled');
    ApplicationForm.form.submitButton.verifyEnabledStatus();
  }

  static verifyApplicationCheckBoxUnchecked() {
    StepLogger.subVerification('Verify Application Checkbox Unchecked');
    ApplicationForm.form.oneAccountInput.vItem.invoke('attr', 'aria-checked').should('equal', 'false');

    ApplicationForm.form.emailOptInInput.vItem.invoke('attr', 'aria-checked').should('equal', 'false');
  }

  static clickSubmitApplicationButton() {
    StepLogger.subStep('Click Submit Application button');
    ApplicationForm.form.submitButton.click();
  }

  static verifyCertifyError() {
    StepLogger.subVerification('Verify Certify Error');
    ApplicationForm.form.errorMessage(ApplicationFormConstant.elementsNames.certify).should('be.visible');
  }

  static selectApplicationCheckBox() {
    StepLogger.subStep('Select Application Check boxes');
    ApplicationForm.form.oneAccountInput.vItem.then(($ele: any) => {
      const isSelected = $ele.attr('aria-checked');
      const oneAccount = isSelected.toString();
      if (oneAccount.includes(false)) {
        ApplicationForm.form.oneAccount.click();
      }
    });

    ApplicationForm.form.emailOptInInput.vItem.then(($ele: any) => {
      const isSelected = $ele.attr('aria-checked');
      const emailOpt = isSelected.toString();
      if (emailOpt.includes(false)) {
        ApplicationForm.form.emailOptIn.click();
      }
    });
  }

  static verifyProfileHome(firstName: string, lastName: string) {
    StepLogger.subVerification('Verify Profile Home');
    ApplicationForm.form.userProfileName(`${firstName} ${lastName}`).should('be.visible');
  }

  static verifyProfileTour() {
    StepLogger.subVerification('Verify Profile Tour started');
    ApplicationForm.form.takeTourDialog.should('be.visible');
  }

  static createNewCandidate() {
    StepLogger.subStep('Create new candidate');
    const firstName = `R${RandomHelper.getRandomStringWithoutNumber(6).toLowerCase()}`;
    const lastName = 'Test';
    const pEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}_${RandomHelper.getRandomNumber(4)}@qa.test`;
    const user = {
      fName: firstName,
      lName: lastName,
      email: pEmail,
      linkedIn: 'linkedIn123',
      dialCode: 'United States',
      phoneNumber: '2024777722',
    };
    this.enterFirstName(user.fName);
    this.enterLastName(user.lName);
    this.enterEmail(user.email);
    this.enterLinkedInAddress(user.linkedIn);
    this.verifyCountryIsSelected();
    this.enterPhoneNumberWithCountryCode(user.dialCode, user.phoneNumber);
    this.selectApplicationCheckBox();
    this.clickSubmitApplicationButton();

    return user;
  }

  static createNewCandidateWithTempEmail(domain: string) {
    StepLogger.subStep('Create new candidate');
    const firstName = `R${RandomHelper.getRandomStringWithoutNumber(6).toLowerCase()}`;
    const lastName = 'Test';
    const pEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}_${RandomHelper.getRandomNumber(4)}${domain}`;
    const user = {
      fName: firstName,
      lName: lastName,
      email: pEmail,
      linkedIn: 'linkedIn123',
      dialCode: 'United States',
      phoneNumber: '2024777722',
    };
    this.enterFirstName(user.fName);
    this.enterLastName(user.lName);
    this.enterEmail(user.email);
    this.enterLinkedInAddress(user.linkedIn);
    this.verifyCountryIsSelected();
    this.enterPhoneNumberWithCountryCode(user.dialCode, user.phoneNumber);
    this.selectApplicationCheckBox();
    this.clickSubmitApplicationButton();

    return user;
  }

  static getResetPassword(response: string) {
    const result = response.match(/"((?:\\.|[^"\\])*)"/);
    let emailContent: any;

    if (result) {
      emailContent = result[1];
    }

    return emailContent;
  }

  static verifyYouHaveActiveAppAlert() {
    StepLogger.subVerification('Verify You have active app alert');
    ExpectationHelper.verifyDisplayedStatus(ApplicationForm.form.youHaveActiveAppAlertHeading);
    ExpectationHelper.verifyDisplayedStatus(ApplicationForm.form.gotoMyActiveAppButton);
  }

  static clickGoToMyApplicationButton() {
    StepLogger.subStep('Click Go to my application button');
    ApplicationForm.form.gotoMyActiveAppButton.click();
  }

  static createAutoLoginUrl(username: string, password: string) {
    const autoLoginUrl = `${Cypress.config().baseUrl}/application?username=${username}&password=${password}`;
    StepLogger.subStep(`Auto login Url: ${autoLoginUrl}`);
    return autoLoginUrl;
  }

  static clickGoToMyApplicationButtonOnAlert() {
    StepLogger.subStep('Click Go to my application button on ');
    ApplicationForm.form.gotoMyActiveAppButton.click();
  }

  static verifyApplicationFromforLoggedInCandidate(user: any) {
    StepLogger.subStep('Verify application for form for logged in candidate');
    cy.wait(5000);
    ExpectationHelper.verifyAttributeValue(ApplicationForm.form.firstName, user.firstName);
    ExpectationHelper.verifyAttributeValue(ApplicationForm.form.lastName, user.lastName);
    ExpectationHelper.verifyAttributeValue(ApplicationForm.form.email, user.username);
    ExpectationHelper.verifyAttributeValue(ApplicationForm.form.linkedIn, user.linkedIn);
  }

  static verifyCannotApplyAlert() {
    StepLogger.subVerification('Verify the Cannot apply to position alert');
    ExpectationHelper.verifyDisplayedStatus(ApplicationForm.form.cannotApplyHeading);
    ExpectationHelper.verifyDisplayedStatus(ApplicationForm.form.cancelButton);
    ExpectationHelper.verifyDisplayedStatus(ApplicationForm.form.okButton);
  }

  static clickOkButton() {
    StepLogger.subStep('Click ok button');
    ApplicationForm.form.okButton.click();
  }

  static verifyPipelinePage() {
    StepLogger.subVerification('Verify the Pipeline page');
    ApplicationForm.form.pipelineContent.verifyDisplayedStatus();
  }

  static verifyLoggedInUserApplicationFrom(user: User) {
    StepLogger.subStep('Verify application for form for logged in candidate');
    cy.wait(5000);
    ExpectationHelper.verifyAttributeValue(ApplicationForm.form.firstName, user.fName);
    ExpectationHelper.verifyAttributeValue(ApplicationForm.form.lastName, user.lName);
    ExpectationHelper.verifyAttributeValue(ApplicationForm.form.email, user.email);
    ExpectationHelper.verifyAttributeValue(ApplicationForm.form.linkedIn, user.linkedIn);
  }

  url(): string {
    const env = Cypress.env('server_instance');
    if (env.includes('prod')) {
      return EndpointHelper.testPositionProductionProfile;
    } else if (env.includes('stage')) {
      return EndpointHelper.testPositionStagingProfile;
    } else {
      return EndpointHelper.testPositionSandboxProfile;
    }
  }
}
