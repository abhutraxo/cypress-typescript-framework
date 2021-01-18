import { AddMultipleStepResults } from '../../../api/add-multiple-step-results';
import { DeleteOpportunityUtils } from '../../../api/delete-opportunity-utils';
import { LoginUtils } from '../../../api/login-utils';
import { PageHelper } from '../../../components/html/page-helper';
import { CredentialsHelper } from '../../../components/misc-utils/credentials-helper';
import { StepLogger } from '../../../core/step-logger';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { BadgesConstants } from '../../../pages-objects/pages/badges/badges.constants';
import { BadgesHelper } from '../../../pages-objects/pages/badges/badges.helper';
import { BasicFitHelper } from '../../../pages-objects/pages/basic-fit/basic-fit.helpers';
import { CodeSignalHelper } from '../../../pages-objects/pages/code-signal/code-signal.helper';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.codeSignal, () => {
  let loginHelper: LoginPageHelper;

  before(() => {
    loginHelper = LoginPageHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C36950411 Take the Code Signal test (Integration with CodeSignal)', () => {
    StepLogger.caseId = 36950411;
    const eNames = BadgesConstants.elementNames;
    const cred = CredentialsHelper.loginDetails.codeSignal;

    StepLogger.preCondition('Create a candidate and application');
    loginHelper.goTo();
    LoginPageHelper.login(cred.username, cred.pass);
    ApplicationFormHelper.verifyProfileHome(cred.firstName, cred.lastName);

    PageHelper.goToUrl(`${Cypress.config().baseUrl}/jobs/6663/test-position-staging-profile-one/apply`);
    ApplicationFormHelper.verifyApplicationForm();
    cy.wait(5000);
    ApplicationFormHelper.selectApplicationCheckBox();
    ApplicationFormHelper.clickSubmitApplicationButton();
    ApplicationFormHelper.verifyProfileHome(cred.firstName, cred.lastName);
    ProfilePageHelper.clickMyApplicationTab();

    AddMultipleStepResults.createStepResults(cred.username, 100, 'BFQ');
    BasicFitHelper.verifyBasicFitSuccessResultStatus('Test Position Staging Profile One');
    BadgesHelper.closeNotification();

    AddMultipleStepResults.createStepResults(cred.username, 35, 'CCAT');
    cy.wait(3000);
    ProfilePageHelper.verifyCCATSuccessNotification();
    BadgesHelper.closeNotification();

    AddMultipleStepResults.createStepResults(cred.username, 100, 'English');
    cy.wait(3000);
    BadgesHelper.verifySuccessNotification('Test Position Staging Profile One', eNames._4starEnglishSuccess);
    BadgesHelper.closeNotification();
    BadgesHelper.verifyActiveSkillBadge('Test Position Staging Profile One', eNames.platformIntegrationTest);
    ProfilePageHelper.clickMyProfileTab();

    StepLogger.stepId(1);
    StepLogger.step('Click on the Earn this Badge button');
    ProfilePageHelper.clickEarnThisBadgeButton();
    StepLogger.verification('CodeSignal test description open with a start button');
    ProfilePageHelper.verifyStartButtonDisplayed();

    StepLogger.stepId(2);
    StepLogger.step('Click on Start button');
    ProfilePageHelper.clickStartButton();
    StepLogger.verification('CodeSignal test starts with Test header "Crossover Test" and nex button');
    CodeSignalHelper.signInToCodeSignal();
    CodeSignalHelper.verifyIntroPage();

    StepLogger.stepId(3);
    StepLogger.step('Click the Next button');
    CodeSignalHelper.clickNextButton();
    StepLogger.verification('Term and Condition page opens with back and start button');
    CodeSignalHelper.verifyNextIntroPage();

    StepLogger.stepId(4);
    StepLogger.step('Select all the terms and click the start button');
    CodeSignalHelper.selectTermsAndClickNext();
    StepLogger.verification('Test details page open with view task button and finish the test button');
    CodeSignalHelper.verifyViewTaskPage();

    StepLogger.stepId(5);
    StepLogger.step('Click on view task Button');
    CodeSignalHelper.clickViewTaskButton();
    StepLogger.verification('Quiz starts with submit button');
    CodeSignalHelper.verifyTestPage();

    StepLogger.stepId(6);
    StepLogger.step('Select an answer and click submit');
    CodeSignalHelper.selectCorrectOption();
    CodeSignalHelper.clickSubmitButton();
    StepLogger.verification('Confirmation dialog open with cancel and confirm button');

    StepLogger.stepId(7);
    StepLogger.step('Click the Back to task button');
    CodeSignalHelper.clickBackToTaskButton();
    StepLogger.verification('Task details page open with submitted status and finish the test button');
    CodeSignalHelper.verifyViewTaskPage();

    StepLogger.stepId(8);
    StepLogger.step('Click the Finish button');
    CodeSignalHelper.clickFinishTheTestButton();
    StepLogger.verification('Confirmation dialog opens wit Cancel and Finish button.');
    CodeSignalHelper.verifyAlertFinishButton();

    StepLogger.stepId(9);
    StepLogger.step('Click the Finish button');
    CodeSignalHelper.clickAlertFinishButton();
    StepLogger.verification('The feedback page opens');
    CodeSignalHelper.verifyFeedBackPage();

    StepLogger.stepId(10);
    StepLogger.step('Add feedback and click submit');
    CodeSignalHelper.submitFeedBack();
    StepLogger.verification('Thankyou message is displayed');
    CodeSignalHelper.verifyThankYouMessage();

    StepLogger.stepId(11);
    StepLogger.step('Application navigates back to the application with pass status.');
    const base = Cypress.env('server_instance');
    if (base.includes('stage')) {
      AddMultipleStepResults.createStepResults(cred.username, 100, 'SMQ');
    }
    StepLogger.verification('Success Notification is displayed on the Screen, Candidate progress to the next stage.');
    if (base.includes('prod')) {
      cy.wait(30000);
    }
    BadgesHelper.verifySuccessNotification('Test Position', 'Congratulation');
  });

  after(() => {
    LoginUtils.getLogin();
    DeleteOpportunityUtils.deleteOpportunity(CredentialsHelper.loginDetails.codeSignal.username);
  });
});
