import { CandidateEmailUtils } from '../../../api/candidate-email-utils';
import { CaseUtils } from '../../../api/case-utils';
import { LoginUtils } from '../../../api/login-utils';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { StepLogger } from '../../../core/step-logger';

import { ApplicationStatusConstants } from './application-status.constant';
import { ApplicationStatusPage } from './application-status.po';

export class ApplicationStatusHelper {
  static verifyApplicationStatus(applicationName: string, status: string) {
    StepLogger.subVerification(`Verify ${applicationName} status: ${status}`);
    ExpectationHelper.verifyDisplayedStatus(ApplicationStatusPage.status.jobApplicationStatus(applicationName));
    ApplicationStatusPage.status.jobApplicationStatus(applicationName).then(($txt: JQuery<HTMLElement>) => {
      expect($txt.text()).to.contain(status);
    });
  }

  static hoverOverStatus(applicationName: string) {
    StepLogger.subStep('Hover over the info icon for status');
    ApplicationStatusPage.status.statusInfoIcon(applicationName).trigger('mouseenter');
  }

  static mouseLeaveStatus(applicationName: string) {
    ApplicationStatusPage.status.statusInfoIcon(applicationName).trigger('mouseleave');
  }

  static verifyTheToolTipText(message: string) {
    StepLogger.subVerification('Verify the Tool tip is displayed');
    ExpectationHelper.verifyTextContains(ApplicationStatusPage.status.tooltip, message);
  }

  static verifyContactUsOnAppTab() {
    StepLogger.subVerification('Verify Contact us on the application tab');
    ExpectationHelper.verifyDisplayedStatus(ApplicationStatusPage.status.contactUsAppTab);
  }

  static verifyTheContactUsBasicFitHeader() {
    StepLogger.subVerification('Verify take test header have contact us link');
    ApplicationStatusPage.status.testHeader.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(
      ApplicationStatusPage.status.testHeader,
      ApplicationStatusConstants.elementNames.contactUs,
    );
  }

  static clickContactUs() {
    StepLogger.subStep('Click Contact Us link');
    ApplicationStatusPage.status.contactUsLink.click();
  }

  static verifySupportDialog() {
    StepLogger.subVerification('Verify the support dialog ');
    ExpectationHelper.verifyTextContains(
      ApplicationStatusPage.status.supportDialogHeading,
      ApplicationStatusConstants.elementNames.supportHeading,
    );
  }

  static focusBlurMessageTextArea() {
    cy.get(ApplicationStatusPage.status.messageTextArea)
      .focus()
      .blur();
  }

  static verifyErrorMessage() {
    StepLogger.subVerification('Verify message required error');
    ExpectationHelper.verifyTextContains(
      ApplicationStatusPage.status.messageRequiredError,
      ApplicationStatusConstants.elementNames.messageError,
    );
  }

  static enterQuestion(message: string) {
    StepLogger.subStep('Enter query');
    cy.get(ApplicationStatusPage.status.messageTextArea).type(message);
  }

  static verifySubmitYourQuestionDisabled() {
    StepLogger.subVerification('Verify Submit your question is disabled');
    cy.get(ApplicationStatusPage.status.submitYourQuestionButton).should('be.disabled');
  }

  static verifySubmitButtonEnabled() {
    StepLogger.subVerification('Verify Submit Button Enabled');
    cy.get(ApplicationStatusPage.status.submitYourQuestionButton).should('be.enabled');
  }

  static clickSubmitYourQuestionEnabled() {
    StepLogger.subStep('Click Submit your question button Enabled');
    cy.get(ApplicationStatusPage.status.submitYourQuestionButton).click();
  }

  static verifyCaseCreatedAtBackend(email: string, message: string) {
    StepLogger.subVerification('Verify the Case is created at the backend');
    LoginUtils.getLogin();
    cy.getLocalStorage('loginToken').then(token => {
      CandidateEmailUtils.getCandidateDetails(email, token).then(account => {
        CaseUtils.getCaseData(`${account.body.records[0].Id}`, token).then(cases => {
          expect(cases.body.records[0].Description).to.equal(message);
        });
      });
    });
  }

  static verifyMessageSentNotification() {
    StepLogger.subVerification('Verify the message sent notification');
    ExpectationHelper.verifyTextContains(
      ApplicationStatusPage.status.successNotificationText,
      ApplicationStatusConstants.elementNames.messageSent,
    );
  }

  static verifyInterviewTerminalStatus(/*positionName: string*/) {
    StepLogger.subStep('Verify Interview Terminal Status of Job Position');
    cy.cssContainingText("[class*='terminal-state-status']", 'Interview').should('be.visible');
  }

  static verifyScheduleInterviewButton() {
    StepLogger.subStep('Verify schedule interview button');
    ExpectationHelper.verifyDisplayedStatus(ApplicationStatusPage.status.scheduleInterviewButton);
  }

  static clickScheduleInterviewButton() {
    StepLogger.subStep('Click Schedule Interview button');
    ApplicationStatusPage.status.scheduleInterviewButton.click();
  }
}
