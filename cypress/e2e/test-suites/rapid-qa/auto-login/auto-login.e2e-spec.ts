import { PageHelper } from '../../../components/html/page-helper';
import { CredentialsHelper } from '../../../components/misc-utils/credentials-helper';
import { StepLogger } from '../../../core/step-logger';
import { EnvironmentHelper } from '../../../helpers/enviornment.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { BasicFitHelper } from '../../../pages-objects/pages/basic-fit/basic-fit.helpers';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.autoLogin, () => {
  before(() => {
    PageHelper.maximizeBrowser();
  });

  it('C26508241 Candidate should be able to login using auto login URL', () => {
    StepLogger.caseId = 26508241;
    const candidate1 = CredentialsHelper.loginDetails.autoLoginOne;
    const candidate2 = CredentialsHelper.loginDetails.autoLoginTwo;

    StepLogger.stepId(1);
    StepLogger.step(`Navigate to Auto login URL(username and wrong pass)
    ${Cypress.config().baseUrl}/application?username=autologin_1@qa.data&password=wrongpass`);
    PageHelper.goToUrl(ApplicationFormHelper.createAutoLoginUrl(candidate1.username, 'wrongPass'));
    StepLogger.verification(`Candidate don't login into profile and navigates to login page
    Invalid Login Error message is displayed`);
    LoginPageHelper.verifyLoginFailedNotification();

    StepLogger.stepId(2);
    StepLogger.step(`Navigate to Auto login URL (Correct user name and password)
    Ex: ${Cypress.config().baseUrl}/application?username=autologin_1@qa.test&pass1234`);
    PageHelper.goToUrl(ApplicationFormHelper.createAutoLoginUrl(candidate1.username, candidate1.password));
    StepLogger.verification('Candidate is logged in and navigate to my profile tab');
    ApplicationFormHelper.verifyProfileHome(candidate1.firstName, candidate1.lastName);

    StepLogger.stepId(3);
    StepLogger.step('Click on My application tab');
    ProfilePageHelper.clickMyApplicationTab();
    StepLogger.verification('Basic fit status is passed and Cognitive aptitude badge is active');
    EnvironmentHelper.checkAgainstEnv(BasicFitHelper.verifyBasicFitSuccessResultStatus);

    StepLogger.stepId(4);
    StepLogger.step(`Again Navigate using Auto Login URL (User name and Wrong Password)
    Ex: ${Cypress.config().baseUrl}/application?username=autologin_1@qa.data&password=wrongPass`);
    PageHelper.goToUrl(ApplicationFormHelper.createAutoLoginUrl(candidate1.username, 'wrongPass'));
    StepLogger.verification('Candidate should not log out and navigates to my profile page');
    ProfilePageHelper.verifyCandidatePersonalInfoDetails(candidate1.username);
    ProfilePageHelper.clickMyApplicationTab();
    EnvironmentHelper.checkAgainstEnv(BasicFitHelper.verifyBasicFitSuccessResultStatus);

    StepLogger.stepId(5);
    StepLogger.step(`Navigate using Auto login URL for candidate two
    ex: ${Cypress.config().baseUrl}/application?username=autologin_2@qa.data&password=pass1234`);
    PageHelper.goToUrl(ApplicationFormHelper.createAutoLoginUrl(candidate2.username, candidate2.password));
    StepLogger.verification(
      'Candidate one should be logged out of the application and candidate two should be logged into the application',
    );
    ProfilePageHelper.verifyCandidatePersonalInfoDetails(candidate2.username);

    StepLogger.stepId(6);
    StepLogger.step('Click on My application tab');
    ProfilePageHelper.clickMyApplicationTab();
    StepLogger.verification('Basic fit and Cognitive aptitude status is passed with success mark');
    ProfilePageHelper.verifyCCATSuccessNotification();
  });

  after(() => {
    LoginPageHelper.logout();
  });
});
