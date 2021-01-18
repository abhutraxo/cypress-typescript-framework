import { CandidateEmailUtils } from '../../../api/candidate-email-utils';
import { LoginUtils } from '../../../api/login-utils';
import { PageHelper } from '../../../components/html/page-helper';
import { CredentialsHelper } from '../../../components/misc-utils/credentials-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { RandomHelper } from '../../../components/misc-utils/random-helper';
import { StepLogger } from '../../../core/step-logger';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { LoginPage } from '../../../pages-objects/pages/login-page/login-page.po';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.loginLogout, () => {
  let loginHelper: LoginPageHelper;

  before(() => {
    loginHelper = LoginPageHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C26330761 Login and Logout of profile page application', () => {
    StepLogger.caseId = 26330761;
    const unregisteredEmail = RandomHelper.getRandomEmail();
    const candidate = CredentialsHelper.loginDetails.loginQaData;

    StepLogger.stepId(1);
    StepLogger.step(`Navigate to the profile page login screen
    Ex: ${Cypress.config().baseUrl}/auth/login`);
    loginHelper.goTo();
    StepLogger.verification('Login page loads');
    loginHelper.verifyExistence();

    StepLogger.stepId(2);
    StepLogger.step('Verify the login page');
    StepLogger.verification(`Login heading is displayed
    1) Username, Password input is displayed
    2) Login Button is displayed`);
    LoginPageHelper.verifyLoginPage();

    StepLogger.stepId(3);
    StepLogger.step('Put the focus on the username and password respectively and remove it');
    LoginPageHelper.focusBlurFromLoginPasswordField();
    StepLogger.verification('"Email is required" and "Password is required" error message are displayed respectively');
    LoginPageHelper.verifyEmailRequiredErrorMessage();
    LoginPageHelper.verifyPasswordRequiredErrorMessage();

    StepLogger.stepId(4);
    StepLogger.step(`Enter an invalid Email
    Ex: 'invalidEmail'`);
    LoginPageHelper.enterUserName('invalidEmail');
    StepLogger.verification('"Please enter a valid email" error message is displayed on username input.');
    LoginPageHelper.verifyInvalidEmailErrorMessage();

    StepLogger.stepId(5);
    StepLogger.step(`Enter a valid unregistered email and password
    ex: invaliduser@email.com`);
    LoginPageHelper.enterUserName(unregisteredEmail);
    LoginPageHelper.enterPassword('pass1234');
    StepLogger.verification('Valid email and password are entered');
    ExpectationHelper.verifyAttributeValue(LoginPage.login.username, unregisteredEmail);

    StepLogger.stepId(6);
    StepLogger.step('Click the Login Button');
    LoginPageHelper.clickLoginButton();
    StepLogger.verification('"Invalid username and/or password!" message should be displayed');
    LoginPageHelper.verifyLoginFailedNotification();

    StepLogger.stepId(7);
    StepLogger.step(`Enter a valid registered email and wrong password
    ex: user@qa.test and passAbcd`);
    LoginPageHelper.enterUserName(candidate.username);
    LoginPageHelper.enterPassword('wrongPass');
    StepLogger.verification('Valid email and password are entered.');
    ExpectationHelper.verifyAttributeValue(LoginPage.login.username, candidate.username);

    StepLogger.stepId(8);
    StepLogger.step('Click the Login button');
    LoginUtils.getLogin();
    cy.getLocalStorage('loginToken').then(token => {
      CandidateEmailUtils.getCandidateDetails(candidate.username, token).then(loginData => {
        const oldFailedLoginCount = loginData.body.records[0].Failed_Login_Count__c;
        StepLogger.step(`Initial failed login count: ${oldFailedLoginCount}`);
        cy.setLocalStorage('initFailedLogin', oldFailedLoginCount);
        cy.saveLocalStorage();
      });
    });

    LoginPageHelper.clickLoginButton();
    StepLogger.verification(`"Invalid username and/or password!" message should be displayed
    Get failed login count, it should increase by 1.`);
    LoginPageHelper.verifyLoginFailedNotification();
    cy.getLocalStorage('loginToken').then(token => {
      LoginPageHelper.verifyFailedLoginCount(token, candidate.username);
    });

    StepLogger.stepId(9);
    StepLogger.step(`Enter a valid registered email and password
    ex: user@qa.test and pass1234`);
    LoginPageHelper.enterUserName(candidate.username);
    LoginPageHelper.enterPassword(candidate.pass);
    StepLogger.verification('Valid email and npm ru password Entered');
    ExpectationHelper.verifyAttributeValue(LoginPage.login.username, candidate.username);

    StepLogger.stepId(10);
    StepLogger.step('Click Login Button');
    cy.getLocalStorage('loginToken').then(token => {
      LoginPageHelper.getSuccessLoginCount(candidate.username, token);
    });
    LoginPageHelper.clickLoginButton();
    StepLogger.verification(`User is navigated to Profile home
    Get Success Login Counter , the counter should increase by 1`);
    ApplicationFormHelper.verifyProfileHome(candidate.firstName, candidate.lastName);
    cy.getLocalStorage('loginToken').then(token => {
      LoginPageHelper.verifySuccessLoginCount(token, candidate.username);
    });

    StepLogger.stepId(11);
    StepLogger.step('Click on the avatar on top right of profile page.');
    StepLogger.verification('User menu opens');
    // Step 12 covers step 11

    StepLogger.stepId(12);
    StepLogger.step('Click on logout option');
    LoginPageHelper.logout();
    StepLogger.verification('The user is logged out of the application and navigated to the login page');
    LoginPageHelper.verifyLoginPage();

    StepLogger.stepId(13);
    StepLogger.step('Again login into the application with same user');
    cy.getLocalStorage('loginToken').then(token => {
      LoginPageHelper.getSuccessLoginCount(candidate.username, token);
    });
    LoginPageHelper.login(candidate.username, candidate.pass);
    StepLogger.verification(`Navigate to profile home
    Get the successful login count, it should increase by 1 from last count`);
    ApplicationFormHelper.verifyProfileHome(candidate.firstName, candidate.lastName);
    cy.getLocalStorage('loginToken').then(token => {
      LoginPageHelper.verifySuccessLoginCount(token, candidate.username);
    });
  });

  after(() => {
    LoginPageHelper.logout();
  });
});
