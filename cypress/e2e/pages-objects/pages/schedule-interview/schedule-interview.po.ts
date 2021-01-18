import { ScheduleInterviewConstants } from './schedule-interview.constant';

const {
  attributes: { classes, name },
} = ScheduleInterviewConstants;
export class ScheduleInterviewPage {
  static readonly interview = Object.freeze({
    get bookingContainer() {
      return `[data-container='${classes.bookingContainer}']`;
    },

    get bookableButton() {
      return `button[class*='${classes.buttonBookable}']`;
    },

    get timeButton() {
      return `button[class*='${classes.timeButton}']`;
    },

    get confirmbutton() {
      return `button[class*='${classes.confirmButton}']`;
    },

    get fullName() {
      return `[name*='${name.fullName}']`;
    },

    get email() {
      return `[name*='${name.email}']`;
    },

    get phoneNo() {
      return `[name*='${name.phoneNo}']`;
    },

    get scheduleEventButton() {
      return "button[class*='Button']";
    },

    get confirmationHeader() {
      return `[data-component*='${classes.confirmationHeader}'] h2`;
    },
  });
}
