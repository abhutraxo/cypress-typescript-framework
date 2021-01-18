import { PageHelper } from '../../../components/html/page-helper';
import { CredentialsHelper } from '../../../components/misc-utils/credentials-helper';
import { StepLogger } from '../../../core/step-logger';
import { EndpointHelper } from '../../../helpers/end-point.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { CognitiveAptitudeHelper } from '../../../pages-objects/pages/cognitive-aptitude/cognitive-aptitude.helper';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.cognitiveAptitude, () => {
  let loginHelper: LoginPageHelper;

  before(() => {
    loginHelper = LoginPageHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C26496845 Reject Apply to an same pipeline after failing CCAT with score below retryable threshold', () => {
    StepLogger.caseId = 26496845;
    const user = CredentialsHelper.loginDetails.ccatFail;

    StepLogger.stepId(1);
    StepLogger.step(`Navigate to the login page.
    ${Cypress.config().baseUrl}/auth/login`);
    loginHelper.goTo();
    StepLogger.verification('The login page open');
    LoginPageHelper.verifyLoginPage();

    StepLogger.stepId(2);
    StepLogger.step(`Login in the candidate from the precondition
    ex: rejectapplyccatfail@qa.data`);
    LoginPageHelper.login(user.username, user.password);
    StepLogger.verification('Candidate navigates to Profile Home');
    ApplicationFormHelper.verifyProfileHome(user.firstName, user.lastName);

    StepLogger.stepId(3);
    StepLogger.step('Click on my application tab');
    ProfilePageHelper.clickMyApplicationTab();
    StepLogger.verification('Candidate application status is process stopped');
    CognitiveAptitudeHelper.verifyCCATFailedStatus();

    StepLogger.stepId(4);
    StepLogger.step(`Go to the application page for other pipelines(ex: Test Position  Staging Profile (6665))
    ${Cypress.config().baseUrl}/jobs/6665/test-position-staging-profile/apply`);
    const base = Cypress.env('server_instance');
    if (base?.includes('stage')) {
      PageHelper.goToUrl(`${Cypress.config().baseUrl}${EndpointHelper.testPositionProductionProfile}`);
    } else {
      PageHelper.goToUrl(`${Cypress.config().baseUrl}${EndpointHelper.testPositionStagingProfile}`);
    }

    StepLogger.verification('Application form open with all candidate details filled in');
    ApplicationFormHelper.verifyApplicationFromforLoggedInCandidate(user);

    StepLogger.stepId(5);
    StepLogger.step('Select one account confirmation checkbox and click Submit application button');
    ApplicationFormHelper.selectApplicationCheckBox();
    ApplicationFormHelper.clickSubmitApplicationButton();
    StepLogger.verification('Cannot apply to this position dialog is displayed with Cancel and Ok button');
    ApplicationFormHelper.verifyCannotApplyAlert();

    StepLogger.stepId(6);
    StepLogger.step('Click Ok button');
    ApplicationFormHelper.clickOkButton();
    StepLogger.verification('Navigates to pipeline page');
    ApplicationFormHelper.verifyPipelinePage();
  });

  after(() => {
    LoginPageHelper.logout();
  });
});
