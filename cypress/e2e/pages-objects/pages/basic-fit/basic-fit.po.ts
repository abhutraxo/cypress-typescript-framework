import { $ } from '../../../components/misc-utils/df-elements-helper';

import { BasicFitConstants } from './basic-fit.constant';

const {
  attributes: { classes },
  elementNames: eNames,
} = BasicFitConstants;
export class BasicFitPage {
  static readonly bfq = Object.freeze({
    get startAssessmentButton() {
      return $(`[class*='${classes.basicFitButton}']`, eNames.startAssessment);
    },

    get iframe() {
      return `[class*='${classes.iframeWrapper}'] iframe`;
    },

    get questionTitle() {
      return `[class*='${classes.questionTitle}']`;
    },

    get submitButton() {
      return `[class*='${classes.submitButton}']`;
    },

    get radioButtonOptions() {
      return `[class*='${classes.radioButtonDisplay}']`;
    },

    get waitingMessage() {
      return $('h4', eNames.waitingForEval);
    },

    get takeTheTestButton() {
      return $(`[class*='${classes.basicFitButton}']`, eNames.takeTheTest).vItem.contains(eNames.takeTheTest);
    },

    get successNotification() {
      return $(`[class*='${classes.successNotification}']`, 'Success notification');
    },

    get successNotificationText() {
      return $(`[class*='${classes.successNotification}'] app-snackbar`, eNames.successMessage);
    },

    jobBasicFitSuccessStatus(positionName: string) {
      return cy
        .contains("[class*='headline']", eNames.jobApplication)
        .parent('div')
        .next('table')
        .children('tbody')
        .contains(`[class*='${classes.role}']`, positionName)
        .next(`td[class*='${classes.bfq}']`)
        .children(`i[class*='${classes.successCheckMark}']`);
    },
    get tooltip() {
      return $(`div[class*='cdk-overlay'] ${classes.tooltipComponent} div[class*='${classes.tooltip}']`, 'Tool tip');
    },

    jobBasicFitNotCompleteStatus(positionName: string) {
      return cy
        .contains("[class*='headline']", eNames.jobApplication)
        .parent('div')
        .next('table')
        .children('tbody')
        .contains(`[class*='${classes.role}']`, positionName)
        .next(`td[class*='${classes.bfq}']`)
        .children('div')
        .children(`i[class*='${classes.notCompleteBFQ}']`);
    },

    get recommendedCard() {
      return $(`[class*='${classes.recommendedStep}']`, eNames.recommended);
    },

    get badgeName() {
      return $(`[class*='${classes.badgeName}']`, 'Badge Name');
    },

    get checkBasicFitButton() {
      return cy.cssContainingText(`[class*='${classes.startButton}']`, eNames.checkBasicFit);
    },

    get startButton() {
      return cy.cssContainingText(`[class*='${classes.startButton}']`, eNames.start);
    },

    jobBasicFitFailStatus(positionName: string) {
      return cy
        .contains("[class*='headline']", eNames.jobApplication)
        .parent('div')
        .next('table')
        .children('tbody')
        .contains(`[class*='${classes.role}']`, positionName)
        .next(`td[class*='${classes.bfq}']`)
        .children(`i[class*='${classes.failBfq}']`);
    },

    get failedNotification() {
      return $(`[class*='${classes.failedNotification}']`, 'Failed notification');
    },

    get failedNotificationText() {
      return $(`[class*='${classes.failedNotification}'] app-snackbar`, eNames.failMessage);
    },

    jobBasicFitWarningStatus(positionName: string) {
      return cy
        .contains("[class*='headline']", eNames.jobApplication)
        .parent('div')
        .next('table')
        .children('tbody')
        .contains(`[class*='${classes.role}']`, positionName)
        .next(`td[class*='${classes.bfq}']`)
        .children(`i[class*='${classes.warningBfq}']`);
    },

    get warningNotification() {
      return $(`[class*='${classes.warningNotification}']`, 'Warning notification');
    },

    get waringNotificationText() {
      return $(`[class*='${classes.warningNotification}'] app-snackbar`, eNames.warnMessage);
    },
  });
}
