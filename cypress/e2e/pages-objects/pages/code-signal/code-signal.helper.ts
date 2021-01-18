import { CredentialsHelper } from '../../../components/misc-utils/credentials-helper';
import { StepLogger } from '../../../core/step-logger';

import { CodeSignalConstant } from './code-signal.constants';
import { CodeSignalPage } from './code-signal.po';

const { elementNames: eNames } = CodeSignalConstant;
export class CodeSignalHelper {
  static quickSignUp() {
    StepLogger.subStep('Do the Quick Sign up for Code signal');
    cy.frameLoaded();
    cy.iframe().find(CodeSignalPage.csPage.signUpPageForm);
    cy.iframe()
      .find(CodeSignalPage.csPage.termsCheckBox)
      .click();
    cy.iframe()
      .find(CodeSignalPage.csPage.quickSignUpButton)
      .contains(CodeSignalConstant.elementNames.quickSignUp)
      .click();
  }

  static verifyIntroPage() {
    StepLogger.subVerification('Verify CodeSignal Intro page');
    cy.frameLoaded();
    cy.iframe().find(CodeSignalPage.csPage.introScreen);
    cy.iframe().find(CodeSignalPage.csPage.nextButton);
  }

  static clickNextButton() {
    StepLogger.subStep('Click Next Button');
    cy.iframe()
      .find(CodeSignalPage.csPage.nextButton)
      .click();
  }

  static verifyNextIntroPage() {
    StepLogger.subStep('Verify Next Intro Page');
    cy.iframe()
      .find(CodeSignalPage.csPage.termsCheckBox)
      .its(1)
      .should('be.visible');
  }

  static selectTermsAndClickNext() {
    StepLogger.subStep('Select Terms and Click Next');
    cy.iframe()
      .find(CodeSignalPage.csPage.termsCheckBox)
      .its(0)
      .click();
    cy.iframe()
      .find(CodeSignalPage.csPage.termsCheckBox)
      .its(1)
      .click();
    cy.iframe()
      .find(CodeSignalPage.csPage.termsCheckBox)
      .its(2)
      .click();
    cy.iframe()
      .find(CodeSignalPage.csPage.nextButton)
      .contains('Start')
      .click();
  }

  static verifyViewTaskPage() {
    StepLogger.subVerification('Verify view task page');
    cy.frameLoaded();
    cy.iframe()
      .find(CodeSignalPage.csPage.viewTaskButton)
      .contains(eNames.viewTask)
      .should('be.visible');
    cy.iframe()
      .find(CodeSignalPage.csPage.finisTheTestButton)
      .contains(eNames.finishTheTest)
      .should('be.visible');
  }

  static clickViewTaskButton() {
    StepLogger.subStep('Click View task Button');
    cy.iframe()
      .find(CodeSignalPage.csPage.viewTaskButton)
      .contains(eNames.viewTask)
      .click();
  }

  static verifyTestPage() {
    StepLogger.subVerification('Verify test page');
    cy.frameLoaded();
    cy.iframe()
      .find(CodeSignalPage.csPage.testBody)
      .should('be.visible');
  }

  static selectCorrectOption() {
    StepLogger.subStep('Select correct option');
    cy.iframe()
      .find(CodeSignalPage.csPage.questionOptions)
      .contains('Worst case: Θ(N · log(N))')
      .click();
  }

  static clickSubmitButton() {
    StepLogger.subStep('Click Submit button');
    cy.iframe()
      .find(CodeSignalPage.csPage.submitButton)
      .contains(eNames.submit)
      .click();
  }

  static clickBackToTaskButton() {
    StepLogger.subStep('Click Back to task button');
    cy.iframe()
      .find(CodeSignalPage.csPage.backToTaskButton)
      .contains(eNames.backToTasks)
      .click();
  }

  static clickFinishTheTestButton() {
    StepLogger.subStep('Click Finish test button');
    cy.iframe()
      .find(CodeSignalPage.csPage.finisTheTestButton)
      .contains(eNames.finishTheTest)
      .click();
  }

  static clickAlertFinishButton() {
    StepLogger.subStep('Click finish button on the alert');
    cy.iframe()
      .find(CodeSignalPage.csPage.finishButton)
      .contains('Finish')
      .click();
  }

  static verifyAlertFinishButton() {
    StepLogger.subStep('Click finish button on the alert');
    cy.iframe()
      .find(CodeSignalPage.csPage.finishButton)
      .contains('Finish')
      .should('be.visible');
  }

  static verifyFeedBackPage() {
    StepLogger.subVerification('Verify the Feedback page');
    cy.frameLoaded();
    cy.iframe()
      .find(CodeSignalPage.csPage._4Starts)
      .first()
      .should('be.visible');
    cy.iframe()
      .find(CodeSignalPage.csPage.submitFeedbackButton)
      .contains(eNames.submitFeedBack)
      .should('be.visible');
  }

  static submitFeedBack() {
    StepLogger.subVerification('Verify the Feedback page');
    cy.iframe()
      .find(CodeSignalPage.csPage._4Starts)
      .first()
      .click();
    cy.iframe()
      .find(CodeSignalPage.csPage._4Starts)
      .last()
      .click();
    cy.iframe()
      .find(CodeSignalPage.csPage.submitFeedbackButton)
      .contains(eNames.submitFeedBack)
      .click();
  }

  static verifyThankYouMessage() {
    StepLogger.subVerification('Verify Thankyou message');
    cy.frameLoaded();
    cy.iframe().find('h1');
  }

  static signInToCodeSignal() {
    StepLogger.subStep('Sign In into Code Signal');
    cy.frameLoaded();
    cy.iframe()
      .find(CodeSignalPage.csPage.passwordInput)
      .type(CredentialsHelper.loginDetails.codeSignal.credPass);
    cy.iframe()
      .find(CodeSignalPage.csPage.signInButton)
      .contains(CodeSignalConstant.elementNames.signIn)
      .click();
  }
}
