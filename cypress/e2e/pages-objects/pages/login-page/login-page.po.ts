import { $, $$ } from '../../../components/misc-utils/df-elements-helper';

import { LoginPageConstant } from './login-page.constants';

const {
  attributes: { classes, formNameControlName: fNames },
  elementNames: eNames,
} = LoginPageConstant;
export class LoginPage {
  static readonly login = Object.freeze({
    get avatarImage() {
      return $$(
        `//*[contains(@class, '${classes.userMenu}')]
        /button/img[contains(@class, '${classes.avatarImage}')]`,
        eNames.avatarImage,
      );
    },

    get menu() {
      return $(`[role='${classes.menu}']`, eNames.menu);
    },

    get logoutButton() {
      return $$(
        `//div[contains(@class, 'menu-panel')]/div/
        button[contains(@class, '${classes.menuItem}') and contains(.,'${eNames.logOut}')]`,
        eNames.logOut,
      );
    },

    get loginHeader() {
      return $(`[class*='${classes.loginHeader}']`, eNames.loginHeader);
    },

    get username() {
      return $(`[formcontrolname = ${fNames.username}`, eNames.username);
    },

    get password() {
      return $(`[formcontrolname = ${fNames.password}`, eNames.password);
    },

    get loginButton() {
      return cy.cssContainingText(`form [class*='${classes.loginButton}']`, eNames.loginButton);
    },

    get oldUiLoginButton() {
      return cy.cssContainingText(`[class*='${classes.oldLoginButton}']`, eNames.loginHeader);
    },

    get emailRequiredErrorMessage() {
      return cy.cssContainingText(`[class*='${classes.error}']`, eNames.emailRequired);
    },

    get passwordRequiredErrorMessage() {
      return cy.cssContainingText(`[class*='${classes.error}']`, eNames.passwordRequired);
    },

    get invalidEmailErrorMessage() {
      return cy.cssContainingText(`[class*='${classes.error}']`, eNames.invalidEmail);
    },

    get loginFailedNotification() {
      return $(`[class*='${classes.notification}']`, 'Failed notification');
    },

    get loginFailedNotificationText() {
      return $(`[class*='${classes.notification}'] app-snackbar`, eNames.invalidUsernamePassword);
    },

    get forgotPassWordHeader() {
      return cy.cssContainingText(`[class*='${classes.forgotPassWordHeader}']`, eNames.forgotPassword);
    },

    get clickHereLink() {
      return cy.cssContainingText(`[class*='${classes.clickHereLink}']`, eNames.clickHere);
    },

    get passRecoveryHeder() {
      return cy.cssContainingText(`[class*='${classes.loginHeader}']`, eNames.passwordRecovery);
    },

    get resetPasswordButton() {
      return $(`[class*='${classes.resetPasswordButton}']`, eNames.resetPassword);
    },

    get noAccountNotificationText() {
      return $(`[class*='${classes.notification}'] app-snackbar`, eNames.noAssociatedAccount);
    },

    get passwordMailSuccessNotification() {
      return $(`[class*='${classes.successNotification}'] app-snackbar`, eNames.passwordSent);
    },

    get loginHereLink() {
      return cy.cssContainingText(`[class*='${classes.clickHereLink}']`, eNames.loginHere);
    },
  });
}
