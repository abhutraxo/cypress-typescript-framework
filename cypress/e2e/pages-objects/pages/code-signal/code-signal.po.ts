import { CodeSignalConstant } from './code-signal.constants';

const {
  attributes: { classes },
} = CodeSignalConstant;
export class CodeSignalPage {
  static readonly csPage = Object.freeze({
    get signUpPageForm() {
      return `[class*='${classes.signInForm}']`;
    },

    get termsCheckBox() {
      return `[class*='${classes.termsCheckBox}']`;
    },

    get quickSignUpButton() {
      return `[class*='${classes.button}']`;
    },

    get introScreen() {
      return `[class*='${classes.introScreen}']`;
    },

    get nextButton() {
      return `[class*='${classes.introScreenButton}']`;
    },

    get viewTaskButton() {
      return `[class*='${classes.viewTaskButton}']`;
    },

    get finisTheTestButton() {
      return `[class*='${classes.finishTestButton}']`;
    },

    get testBody() {
      return `[class*='${classes.testBody}']`;
    },

    get questionOptions() {
      return `[class*='${classes.questionOptions}']`;
    },

    get submitButton() {
      return `[class*='${classes.viewTaskButton}']`;
    },

    get backToTaskButton() {
      return `[class*='${classes.button}']`;
    },

    get finishButton() {
      return `[class*='${classes.alertButton}']`;
    },

    get _4Starts() {
      return `[data-name='${classes.star4}']`;
    },

    get submitFeedbackButton() {
      return `[class*='${classes.alertButton}']`;
    },

    get passwordInput() {
      return `[name='${classes.password}']`;
    },

    get signInButton() {
      return `[class*='${classes.alertButton}']`;
    },
  });
}
