import { PageHelper } from '../../../components/html/page-helper';
import { CredentialsHelper } from '../../../components/misc-utils/credentials-helper';
import { StepLogger } from '../../../core/step-logger';
import { ApplicationStatusConstants } from '../../../pages-objects/pages/application-status/application-status.constant';
import { ApplicationStatusHelper } from '../../../pages-objects/pages/application-status/application-status.helper';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.applicationStatus, () => {
  let loginHelper: LoginPageHelper;

  before(() => {
    loginHelper = LoginPageHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C34706889 Verify the Status of different application', () => {
    StepLogger.caseId = 34706889;
    const candidate = CredentialsHelper.loginDetails.applicationStatus;
    const eNames = ApplicationStatusConstants.elementNames;

    StepLogger.stepId(1);
    StepLogger.step(`Navigate to the Login page and Login into the candidate profile
    ${Cypress.config().baseUrl}/auth/login`);
    loginHelper.goTo();
    LoginPageHelper.login(candidate.username, candidate.pass);
    StepLogger.verification('Candidate navigates to the application page.');
    LoginPageHelper.verifyLoginPage();

    StepLogger.stepId(2);
    StepLogger.step('Click on the my application tab.');
    ProfilePageHelper.clickMyApplicationTab();
    StepLogger.verification('Job application list is displayed');

    StepLogger.stepId(3);
    StepLogger.step('Verify the application status if Test Position Production Profile (User Review)');
    StepLogger.verification('Status of application should be Review');
    ApplicationStatusHelper.verifyApplicationStatus(eNames.testPositionProdProfile, eNames.review);

    StepLogger.stepId(4);
    StepLogger.step('Hover over info icon next to review state');
    ApplicationStatusHelper.hoverOverStatus(eNames.testPositionProdProfile);
    StepLogger.verification('Tool tip is displayed with message "Your application is being reviewed"');
    ApplicationStatusHelper.verifyTheToolTipText(eNames.reviewMessage);
    ApplicationStatusHelper.mouseLeaveStatus(eNames.testPositionProdProfile);

    StepLogger.stepId(5);
    StepLogger.step('Verify the application status of Test Position Staging Profile One');
    StepLogger.verification('Status of the application should be Interview');
    ApplicationStatusHelper.verifyApplicationStatus(eNames.testPositionStageProfileOne, eNames.interview);

    StepLogger.stepId(6);
    StepLogger.step('Hover over info icon next to review state');
    ApplicationStatusHelper.hoverOverStatus(eNames.testPositionStageProfileOne);
    StepLogger.verification('Tool tip is displayed with message "Your application is being reviewed"');
    ApplicationStatusHelper.verifyTheToolTipText(eNames.reviewMessage);
    ApplicationStatusHelper.mouseLeaveStatus(eNames.testPositionStageProfileOne);

    StepLogger.stepId(7);
    StepLogger.step('Verify the application status of Test Position Staging Profile(Expired (Testing))');
    StepLogger.verification('Status of application should be Expired (Testing)');
    ApplicationStatusHelper.verifyApplicationStatus(eNames.testPositionStageProfile, eNames.expiredTesting);

    StepLogger.stepId(8);
    StepLogger.step('Hover over info icon next to Expired Testing');
    ApplicationStatusHelper.hoverOverStatus(eNames.testPositionStageProfile);
    StepLogger.verification('Tool tip is displayed with message "You application has expired"');
    ApplicationStatusHelper.verifyTheToolTipText(eNames.expiredMessage);
    ApplicationStatusHelper.mouseLeaveStatus(eNames.testPositionStageProfile);

    StepLogger.stepId(9);
    StepLogger.step('Verify the application status for Test Position Production Profile One');
    StepLogger.verification('Application status is Canceled');
    ApplicationStatusHelper.verifyApplicationStatus(eNames.testPositionProdProfileOne, eNames.canceled);

    StepLogger.stepId(10);
    StepLogger.step('Hover over info icon of the Canceled State');
    ApplicationStatusHelper.hoverOverStatus(eNames.testPositionProdProfileOne);
    StepLogger.verification(`Tool tip is displayed with message
    "Your application has been automatically canceled because this position is no longer accepting application`);
    ApplicationStatusHelper.verifyTheToolTipText(eNames.canceledForPositionClosed);
    ApplicationStatusHelper.mouseLeaveStatus(eNames.testPositionProdProfileOne);

    StepLogger.stepId(11);
    StepLogger.step('Verify the application status of UX Design lead');
    StepLogger.verification('Status of the application should be Not Selected');
    ApplicationStatusHelper.verifyApplicationStatus(eNames.uxLead, eNames.notSelected);

    StepLogger.stepId(12);
    StepLogger.step('Hover over info icon next to Not Selected Status');
    ApplicationStatusHelper.hoverOverStatus(eNames.uxLead);
    StepLogger.verification(`Tool tip is displayed with message Unfortunately, following the interviews,
    the hiring manager has decided not to hire you for this position"`);
    ApplicationStatusHelper.verifyTheToolTipText(eNames.notSelectedMessage);
    ApplicationStatusHelper.mouseLeaveStatus(eNames.uxLead);
  });

  after(() => {
    LoginPageHelper.logout();
  });
});
