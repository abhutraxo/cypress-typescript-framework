import { PageHelper } from '../../../components/html/page-helper';
import { CredentialsHelper } from '../../../components/misc-utils/credentials-helper';
import { StepLogger } from '../../../core/step-logger';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.switchUI, () => {
  before(() => {
    PageHelper.maximizeBrowser();
  });

  it('C26490755 Navigate between profile-centric and non-profile centric application', () => {
    StepLogger.caseId = 26490755;
    const candidate = CredentialsHelper.loginDetails.switchUIQaData;
    StepLogger.stepId(1);
    StepLogger.step(`Go to the profile login page
    ${Cypress.config().baseUrl}/auth/login`);
    const env = Cypress.env('server_instance');
    if (env.includes('stage')) {
      PageHelper.goToUrl('https://staging-profile.crossover.com/auth/login');
    } else if (env.includes('sand')) {
      PageHelper.goToUrl('https://sandbox-profile.crossover.com/auth/login');
    } else {
      PageHelper.goToUrl('https://crossover.com/auth/login');
    }
    StepLogger.verification('Login page opens');
    LoginPageHelper.verifyLoginPage();

    StepLogger.stepId(2);
    StepLogger.step(`Enter username and password and click login.
    Ex: switchapplicationui@qa.data and pass1234`);
    LoginPageHelper.login(candidate.username, candidate.pass);
    StepLogger.verification('User navigates to My Profile page');
    ApplicationFormHelper.verifyProfileHome(candidate.firstName, candidate.lastName);

    StepLogger.stepId(3);
    StepLogger.step('Click on My application tab');
    ProfilePageHelper.clickMyApplicationTab();
    StepLogger.verification(`Job Application is displayed
    Test Position Staging Profile with Check Basic fit button
    Test Position Production is displayed with message "This application must be viewed in our old app
    Click here to switch`);
    ProfilePageHelper.verifyJobApplicationSection('Test Position Staging Profile');
    ProfilePageHelper.verifyOldAppMessage();

    StepLogger.stepId(4);
    StepLogger.step('Click on "here" link for Test Position Production');
    ProfilePageHelper.clickHereLink();
    StepLogger.verification(`Candidate is navigate to job.crossover.com on the BFQ page
    Application Header shows name Test Position Production`);
    ProfilePageHelper.verifyApplicationHeader('Test Position Production');

    StepLogger.stepId(5);
    StepLogger.step('Click on Application Header');
    ProfilePageHelper.clickApplicationHeader();
    StepLogger.verification('Application menu open with Test Position Staging Profile button');

    StepLogger.stepId(6);
    StepLogger.step('Click on Test Position Staging Profile menu item');
    ProfilePageHelper.clickOtherApplication();
    StepLogger.verification('Candidate is navigate back to Profile page, application tab.');
    ProfilePageHelper.verifyMyApplicationTabActive();
    ProfilePageHelper.verifyJobApplicationSection('Test Position Staging Profile');
  });

  after(() => {
    LoginPageHelper.logout();
  });
});
