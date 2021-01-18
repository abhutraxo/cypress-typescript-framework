import { CandidateEmailUtils } from '../../../api/candidate-email-utils';
import { LoginUtils } from '../../../api/login-utils';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { StepLogger } from '../../../core/step-logger';
import { EndpointHelper } from '../../../helpers/end-point.helper';
import { BasePageHelper } from '../base-page.helper';

import { LoginPageConstant } from './login-page.constants';
import { LoginPage } from './login-page.po';

export class LoginPageHelper extends BasePageHelper {
  private static vInstance: LoginPageHelper;

  private constructor() {
    super();
  }

  public static getInstance(): LoginPageHelper {
    return this.vInstance || (this.vInstance = new this());
  }

  static logout() {
    StepLogger.subStep('Logout of the application');
    this.clickAvatarImage();
    this.verifyMenuOpen();
    this.clickLogoutOption();
    this.verifyLoginPage();
  }

  static clickAvatarImage() {
    StepLogger.subStep('Click Avatar Image');
    LoginPage.login.avatarImage.verifyDisplayedStatus();
    LoginPage.login.avatarImage.click();
  }

  static verifyMenuOpen() {
    StepLogger.subVerification('Verify Menu is open');
    LoginPage.login.menu.verifyDisplayedStatus();
  }

  static clickLogoutOption() {
    StepLogger.subStep('Click Logout option');
    LoginPage.login.logoutButton.verifyDisplayedStatus();
    LoginPage.login.logoutButton.click();
  }

  static verifyLoginPage() {
    StepLogger.subVerification('Verify the login page');
    LoginPage.login.loginHeader.verifyDisplayedStatus();
    LoginPage.login.username.verifyDisplayedStatus();
    LoginPage.login.password.verifyDisplayedStatus();
  }

  static login(username: string, password: string) {
    StepLogger.subStep('Login into the Profile Pages');
    LoginPage.login.username.sendKeys(username);
    LoginPage.login.password.sendKeys(password);
    LoginPage.login.loginButton.click();
  }

  static oldUILogin(username: string, password: string) {
    LoginPage.login.username.sendKeys(username);
    LoginPage.login.password.sendKeys(password);
    LoginPage.login.oldUiLoginButton.click();
  }

  static enterUserName(username: string) {
    StepLogger.subStep(`Enter ${username} to the username field`);
    LoginPage.login.username.sendKeys(username);
  }

  static enterPassword(password: string) {
    StepLogger.subStep(`Enter ${password} to the password field`);
    LoginPage.login.password.sendKeys(password);
  }

  static clickLoginButton() {
    StepLogger.subStep('Click Login button');
    LoginPage.login.loginButton.click();
  }

  static verifyEmailRequiredErrorMessage() {
    StepLogger.subVerification('Verify Email Required Error message is displayed');
    ExpectationHelper.verifyDisplayedStatus(LoginPage.login.emailRequiredErrorMessage);
  }

  static verifyPasswordRequiredErrorMessage() {
    StepLogger.subVerification('Verify Password Required Error message is displayed');
    ExpectationHelper.verifyDisplayedStatus(LoginPage.login.passwordRequiredErrorMessage);
  }

  static focusBlurFromLoginPasswordField() {
    LoginPage.login.username.vItem.focus().blur();
    LoginPage.login.password.vItem.focus().blur();
  }

  static verifyInvalidEmailErrorMessage() {
    StepLogger.subVerification('Verify Invalid Email Error message is displayed');
    ExpectationHelper.verifyDisplayedStatus(LoginPage.login.invalidEmailErrorMessage);
  }

  static verifyLoginFailedNotification() {
    LoginPage.login.loginFailedNotification.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(
      LoginPage.login.loginFailedNotificationText,
      LoginPageConstant.elementNames.invalidUsernamePassword,
    );
  }

  static verifyFailedLoginCount(token: string | null, email: string) {
    StepLogger.subStep(`Verify for ${email} failed login count is increased by one`);
    cy.restoreLocalStorage();
    cy.wait(10000);
    cy.getLocalStorage('initFailedLogin').then(initialFailedCount => {
      CandidateEmailUtils.getCandidateDetails(email, token).then(candidate => {
        const updateInitCount = Number(initialFailedCount) + 1;
        const newCount = Number(candidate.body.records[0].Failed_Login_Count__c);
        expect(updateInitCount).to.be.equal(newCount);
      });
    });
  }

  static getSuccessLoginCount(email: string, token: string | null) {
    CandidateEmailUtils.getCandidateDetails(email, token).then(loginData => {
      const loginCount = loginData.body.records[0].Successful_Login_Count__c;
      StepLogger.step(`Success Login count: ${loginCount}`);
      cy.setLocalStorage('successLoginCount', loginCount);
      cy.saveLocalStorage();
    });
  }

  static verifySuccessLoginCount(token: string | null, email: string) {
    StepLogger.subStep(`Verify for ${email} success login count is increased by one`);
    cy.restoreLocalStorage();
    cy.wait(10000);
    cy.getLocalStorage('successLoginCount').then(successCount => {
      CandidateEmailUtils.getCandidateDetails(email, token).then(candidate => {
        const updateInitCount = Number(successCount) + 1;
        const newCount = Number(candidate.body.records[0].Successful_Login_Count__c);
        expect(updateInitCount).to.be.equal(newCount);
      });
    });
  }

  static verifyForgotPasswordSubCard() {
    ExpectationHelper.verifyDisplayedStatus(LoginPage.login.forgotPassWordHeader);
    ExpectationHelper.verifyDisplayedStatus(LoginPage.login.clickHereLink);
  }

  static clickClickHereLink() {
    StepLogger.subStep('Click on Click Here link');
    LoginPage.login.clickHereLink.click();
  }

  static verifyForgotPasswordCard() {
    StepLogger.step('Verify Forgot Password Card');
    ExpectationHelper.verifyDisplayedStatus(LoginPage.login.passRecoveryHeder);
    LoginPage.login.username.verifyDisplayedStatus();
    LoginPage.login.resetPasswordButton.verifyDisplayedStatus();
  }

  static enterUsername(user: string) {
    StepLogger.subStep(`Enter the ${user}`);
    LoginPage.login.username.sendKeys(user);
  }

  static clickForgotPasswordButton() {
    LoginPage.login.resetPasswordButton.click();
  }

  static verifyNoAccountAssociatedError() {
    StepLogger.subVerification('Verify there is No account associated error');
    ExpectationHelper.verifyTextContains(
      LoginPage.login.noAccountNotificationText,
      LoginPageConstant.elementNames.noAssociatedAccount,
    );
  }

  static verifyPasswordSentNotification() {
    ExpectationHelper.verifyTextContains(
      LoginPage.login.passwordMailSuccessNotification,
      LoginPageConstant.elementNames.passwordSent,
    );
  }

  static clickLoginHereLink() {
    LoginPage.login.loginHereLink.click();
  }

  static verifyPasswordRecoveryCount(email: string) {
    LoginUtils.getLogin();
    cy.getLocalStorage('loginToken').then(token => {
      CandidateEmailUtils.getCandidateDetails(email, token).then(candidateDetails => {
        expect(candidateDetails.body.records[0].Password_Recovery_Count__c).to.be.equal(1);
        expect(candidateDetails.body.records[0].Last_Password_Recovery__c).not.to.be.equal(null);
      });
    });
  }

  url(): string {
    return EndpointHelper.loginPage;
  }
}
