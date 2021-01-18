import { DeleteCandidate } from '../../../api/delete-candidate';
import { LoginUtils } from '../../../api/login-utils';
import { PageHelper } from '../../../components/html/page-helper';
import { StepLogger } from '../../../core/step-logger';
import { EnvironmentHelper } from '../../../helpers/enviornment.helper';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { BasicFitConstants } from '../../../pages-objects/pages/basic-fit/basic-fit.constant';
import { BasicFitHelper } from '../../../pages-objects/pages/basic-fit/basic-fit.helpers';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.basicFit, () => {
  let applicationHelper: ApplicationFormHelper;
  let user: User;

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    LoginUtils.getLogin();
    cy.restoreLocalStorage();
    PageHelper.maximizeBrowser();
  });

  it('C26491532 Answer the Basic fit questioner correctly to update the basic fit status', () => {
    StepLogger.caseId = 26491532;

    StepLogger.preCondition('Create new candidate and application');
    applicationHelper.goTo();
    user = ApplicationFormHelper.createNewCandidate();
    ProfilePageHelper.completeTutorial();
    StepLogger.step(`${user.fName}`);

    StepLogger.stepId(1);
    StepLogger.step('Click my application tab');
    ProfilePageHelper.clickMyApplicationTab();
    StepLogger.verification('My Application tab opens with a job application and check Basic fit button');
    EnvironmentHelper.checkAgainstEnv(ProfilePageHelper.verifyJobApplicationSection);

    StepLogger.stepId(2);
    StepLogger.step('Click the "Check Basic fit" button');
    BasicFitHelper.clickStartAssessmentButton();
    StepLogger.verification('Survey Monkey form open with Basic Fit Questioner and Submit button');
    BasicFitHelper.verifyBasicFitPage();

    StepLogger.stepId(3);
    StepLogger.step(`Select the correct option for the question
    Example: Over 8 years`);
    BasicFitHelper.selectTheBfqAnswer(BasicFitConstants.elementNames.over8years);
    StepLogger.verification('Option is selected');
    BasicFitHelper.verifyOptionIsSelected(BasicFitConstants.elementNames.over8years);

    StepLogger.stepId(4);
    StepLogger.step('Click Submit Button');
    BasicFitHelper.clickSubmitButton();
    StepLogger.verification('Waiting page with "Were evaluating your submission" displayed');

    StepLogger.stepId(5);
    StepLogger.step('Wait for Some time');
    cy.wait(15000);
    StepLogger.verification(`Application navigates to My Application Tab.
    Verify the Basic Fit is updated with a Green tick mark.
    Status / Next step is updated with Earn Next Badge Button.
    Success message toast "Congratulations! You've passed the Basic Fit for your application for Test Position Production!"`);
    ProfilePageHelper.verifyMyApplicationTabActive();
    EnvironmentHelper.checkAgainstEnv(ProfilePageHelper.verifyJobApplicationSection);

    StepLogger.stepId(6);
    StepLogger.step('Hover over the Green Tick mark');
    EnvironmentHelper.checkAgainstEnv(ProfilePageHelper.verifyJobApplicationSection);
    StepLogger.verification(`Tool tip is displayed with message "Congratulations!
    You've passed the Basic Fit for your application for Test Position Production!"`);
  });

  afterEach(() => {
    DeleteCandidate.deleteCandidate(user.email);
    LoginPageHelper.logout();
    cy.clearLocalStorage();
  });
});
