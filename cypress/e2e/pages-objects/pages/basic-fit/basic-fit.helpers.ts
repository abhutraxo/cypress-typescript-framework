import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { StepLogger } from '../../../core/step-logger';

import { BasicFitConstants } from './basic-fit.constant';
import { BasicFitPage } from './basic-fit.po';

const { elementNames: eNames } = BasicFitConstants;
export class BasicFitHelper {
  static clickStartAssessmentButton() {
    StepLogger.subStep('Click Start Assessment');
    BasicFitPage.bfq.startAssessmentButton.vItem
      .contains(BasicFitConstants.elementNames.startAssessment)
      .should('be.visible')
      .click();
  }

  static verifyBasicFitPage() {
    StepLogger.subVerification('Verify the Basic fit page');
    cy.frameLoaded(BasicFitPage.bfq.iframe);
    cy.iframe()
      .find(BasicFitPage.bfq.questionTitle)
      .should('be.visible');
    cy.iframe()
      .contains(BasicFitPage.bfq.radioButtonOptions, eNames.over8years)
      .should('be.visible');
    cy.iframe()
      .find(BasicFitPage.bfq.submitButton)
      .should('be.visible');
  }

  static selectTheBfqAnswer(option: string) {
    StepLogger.subStep('Select the BFQ Answer');
    cy.frameLoaded(BasicFitPage.bfq.iframe);
    cy.iframe()
      .contains(BasicFitPage.bfq.radioButtonOptions, option)
      .should('be.visible')
      .click();
  }

  static verifyOptionIsSelected(option: string) {
    cy.frameLoaded(BasicFitPage.bfq.iframe);
    cy.iframe()
      .contains(BasicFitPage.bfq.radioButtonOptions, option)
      .parent('label')
      .siblings('input')
      .invoke('attr', 'aria-checked')
      .should('equal', 'true');
  }

  static clickSubmitButton() {
    cy.frameLoaded(BasicFitPage.bfq.iframe);
    cy.iframe()
      .find(BasicFitPage.bfq.submitButton)
      .click();
  }

  static verifyWaitingEvaluationMsg() {
    cy.frameLoaded(BasicFitPage.bfq.iframe);
    cy.iframe()
      .contains('h4', eNames.waitingForEval)
      .should('be.visible');
  }

  static verifyBasicFitSuccessResultStatus(positionName: string) {
    BasicFitPage.bfq.successNotification.verifyDisplayedStatus();
    StepLogger.subVerification('Verify Basic fit Success Result Status');
    BasicFitPage.bfq.jobBasicFitSuccessStatus(positionName).should('be.visible');
    // BasicFitPage.bfq.takeTheTestButton.should('be.visible');
    BasicFitPage.bfq.successNotificationText.vItem.then(($ele: any) => {
      expect($ele.text()).to.contain(BasicFitConstants.elementNames.successMessage);
    });
  }

  static hoverOverBasicFitSuccessStatus(positionName: string) {
    StepLogger.subVerification('MouseEnter');
    BasicFitPage.bfq.jobBasicFitSuccessStatus(positionName).trigger('mouseenter');
    BasicFitPage.bfq.tooltip.vItem.then(($ele: any) => {
      expect($ele.text()).to.contain(BasicFitConstants.elementNames.successMessage);
    });
    StepLogger.subVerification('MouseLeave');
    BasicFitPage.bfq.jobBasicFitSuccessStatus(positionName).trigger('mouseleave');
  }

  static verifyBasicFitNotCompleteStatus(positionName: string) {
    StepLogger.subVerification('Verify the basic fit status in not complete');
    BasicFitPage.bfq.jobBasicFitNotCompleteStatus(positionName).should('be.visible');
  }

  static verifyRecommendedForYou() {
    StepLogger.subVerification('Verify Recommended for you card');
    BasicFitPage.bfq.recommendedCard.verifyDisplayedStatus();
    ExpectationHelper.verifyDisplayedStatus(BasicFitPage.bfq.checkBasicFitButton);
  }

  static clickCheckBasicFitButton() {
    StepLogger.subStep('Click Check Basic fit button');
    BasicFitPage.bfq.checkBasicFitButton.click();
  }

  static verifyStartButton() {
    StepLogger.subStep('Verify Start button');
    ExpectationHelper.verifyDisplayedStatus(BasicFitPage.bfq.startButton);
  }

  static clickStartButton() {
    StepLogger.subStep('Click Start Button');
    BasicFitPage.bfq.startButton.click();
  }

  static verifyBFQFailedNotification() {
    StepLogger.subStep('Verify failed notification');
    BasicFitPage.bfq.failedNotification.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(
      BasicFitPage.bfq.failedNotificationText,
      BasicFitConstants.elementNames.failMessage,
    );
  }

  static verifyBFQFailedStatus(positionName: string) {
    StepLogger.subStep('Verify the BFQ failed Status');
    BasicFitPage.bfq.jobBasicFitFailStatus(positionName).should('be.visible');
  }

  static hoverOverBasicFitFailedStatus(positionName: string) {
    StepLogger.subVerification('MouseEnter');
    BasicFitPage.bfq.jobBasicFitFailStatus(positionName).trigger('mouseenter');
    BasicFitPage.bfq.tooltip.vItem.then(($ele: any) => {
      expect($ele.text()).to.contain(BasicFitConstants.elementNames.failMessage);
    });
    StepLogger.subVerification('MouseLeave');
    BasicFitPage.bfq.jobBasicFitFailStatus(positionName).trigger('mouseleave');
  }

  static verifyBFQWarningStatus(positionName: string) {
    StepLogger.subVerification('Verify the basic fit warning/pass-minimum status');
    BasicFitPage.bfq.jobBasicFitWarningStatus(positionName).should('be.visible');
    BasicFitPage.bfq.takeTheTestButton.should('be.visible');
  }

  static verifyBasicFitWarningNotification() {
    StepLogger.subVerification('Verify Basic fit warning notification');
    BasicFitPage.bfq.warningNotification.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(
      BasicFitPage.bfq.waringNotificationText,
      BasicFitConstants.elementNames.warnMessage,
    );
  }

  static hoverOverBasicFitWarningStatus(positionName: string) {
    StepLogger.subVerification('MouseEnter');
    BasicFitPage.bfq.jobBasicFitWarningStatus(positionName).trigger('mouseenter');
    BasicFitPage.bfq.tooltip.vItem.then(($ele: any) => {
      expect($ele.text()).to.contain(BasicFitConstants.elementNames.warnMessage);
    });
    StepLogger.subVerification('MouseLeave');
    BasicFitPage.bfq.jobBasicFitWarningStatus(positionName).trigger('mouseleave');
  }

  static verifyBasicFitSuccessNotification() {
    StepLogger.subVerification('Verify Basic fit Success Notification');
    BasicFitPage.bfq.successNotification.verifyDisplayedStatus();
    BasicFitPage.bfq.successNotificationText.vItem.then(($ele: any) => {
      expect($ele.text()).to.contain(BasicFitConstants.elementNames.successMessage);
    });
  }
}
