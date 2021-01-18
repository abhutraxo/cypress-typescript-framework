import { StepLogger } from '../../../core/step-logger';
import { User } from '../../../helpers/user.helper';

import { ScheduleInterviewConstants } from './schedule-interview.constant';
import { ScheduleInterviewPage } from './schedule-interview.po';

export class ScheduleInterviewHelper {
  static verifyCalendlyBookingCalender() {
    StepLogger.subVerification('Verify booking calender');
    cy.frameLoaded();
    cy.iframe()
      .find(ScheduleInterviewPage.interview.bookingContainer)
      .should('be.visible');
  }

  static selectDateTimeFromCalender() {
    StepLogger.subStep('Select Date and time from the calender');
    cy.frameLoaded();
    cy.iframe()
      .find(ScheduleInterviewPage.interview.bookableButton)
      .first()
      .click();
    cy.iframe()
      .find(ScheduleInterviewPage.interview.timeButton)
      .first()
      .click();
    cy.iframe()
      .find(ScheduleInterviewPage.interview.confirmbutton)
      .should('be.visible');
  }

  static clickConfirmButton() {
    StepLogger.subStep('Click Confirm button');
    cy.frameLoaded();
    cy.iframe()
      .find(ScheduleInterviewPage.interview.confirmbutton)
      .click();
  }

  static verifyPersonalInfoPage(user: User) {
    StepLogger.subVerification('Verify candidate information page is displayed');
    cy.frameLoaded();
    cy.iframe()
      .find(ScheduleInterviewPage.interview.fullName)
      .invoke('val')
      .should('equal', `${user.fName} ${user.lName}`);

    cy.iframe()
      .find(ScheduleInterviewPage.interview.email)
      .invoke('val')
      .should('equal', user.email);

    cy.iframe()
      .find(ScheduleInterviewPage.interview.phoneNo)
      .invoke('val')
      .should('not.be.null');

    cy.iframe()
      .find(ScheduleInterviewPage.interview.scheduleEventButton)
      .contains(ScheduleInterviewConstants.elementNames.scheduleEvent)
      .should('be.visible');
  }

  static clickScheduleEventButton() {
    cy.frameLoaded();
    cy.iframe()
      .find(ScheduleInterviewPage.interview.scheduleEventButton)
      .contains(ScheduleInterviewConstants.elementNames.scheduleEvent)
      .click();
  }

  static verifyInterviewConfirmed() {
    cy.frameLoaded();
    cy.iframe()
      .find(ScheduleInterviewPage.interview.confirmationHeader)
      .invoke('text')
      .should('contain', ScheduleInterviewConstants.elementNames.confirmed);
  }
}
