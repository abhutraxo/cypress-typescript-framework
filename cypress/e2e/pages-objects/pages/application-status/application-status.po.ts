import { $, $$ } from '../../../components/misc-utils/df-elements-helper';

import { ApplicationStatusConstants } from './application-status.constant';

const {
  attributes: { classes, formControlName: fNames },
  elementNames: eNames,
} = ApplicationStatusConstants;
export class ApplicationStatusPage {
  static readonly status = Object.freeze({
    jobApplicationStatus(applicationName: string) {
      return cy
        .xpath(
          `//*[contains(text(), '${eNames.jobApplication}')]/parent::div/following-sibling::table/
       tbody/tr[contains(@class, '${classes.applicationRow}')]/td/a[normalize-space(text())= '${applicationName}']/parent::td
       /following-sibling::td[contains(@class, '${classes.statusColum}')]`,
        )
        .find(`span[class*='${classes.terminalStatus}']`);
    },

    statusInfoIcon(applicationName: string) {
      return cy
        .xpath(
          `//*[contains(text(), '${eNames.jobApplication}')]/parent::div/following-sibling::table/
      tbody/tr[contains(@class, '${classes.applicationRow}')]/td/a[normalize-space(text())= '${applicationName}']/parent::td
      /following-sibling::td[contains(@class, '${classes.statusColum}')]`,
        )
        .find(`i[class*='${classes.statusInfoIcon}']`);
    },

    get tooltip() {
      return $(`div[class*='cdk-overlay'] ${classes.tooltipComponent} div[class*='${classes.tooltip}']`, 'Tool tip');
    },

    get contactUsAppTab() {
      return cy.cssContainingText(`[class*='${classes.contactUsAppTab}']`, eNames.contactUsAppTab);
    },

    get testHeader() {
      return $(`[class*='${classes.takingTestHeader}']`, 'Take test header');
    },

    get contactUsLink() {
      return cy.cssContainingText(`[class*=${classes.contactUsLink}]`, eNames.contactUs);
    },

    get supportDialogHeading() {
      return $(`[class*='${classes.supportHeading}']`, 'Support Dialog Heading');
    },

    get submitYourQuestionButton() {
      return `[class*='${classes.startButton}']`;
    },

    get messageTextArea() {
      return `[formcontrolname='${fNames.message}']`;
    },

    get messageRequiredError() {
      return $(`[class*='${classes.error}']`, eNames.messageError);
    },

    get successNotification() {
      return $(`[class*='${classes.successNotification}']`, 'Message Sent notification');
    },

    get successNotificationText() {
      return $(`[class*='${classes.successNotification}'] app-snackbar`, 'Success Notification text');
    },

    interviewTerminalState(positionName: string) {
      return $$(
        `//*[contains(text(), '${eNames.jobApplication}')]/parent::div/following-sibling::table/tbody/
      tr[contains(@class, '${classes.applicationRow}')]/td/a[contains(text(), '${positionName}')]
      /parent::td/following-sibling::td[contains(@class, '${classes.statusColum}')]
      /div/div/div[contains(@class, '${classes.terminalStatus}') and contains(., 'Interview')]`,
        'Interview Stage',
      );
    },

    get scheduleInterviewButton() {
      return cy.cssContainingText(`[class*='${classes.actionButton}']`, eNames.scheduleInterview);
    },
  });
}
