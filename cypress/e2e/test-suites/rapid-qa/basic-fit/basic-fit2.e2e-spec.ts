import { DeleteCandidate } from '../../../api/delete-candidate';
import { PageHelper } from '../../../components/html/page-helper';
import { StepLogger } from '../../../core/step-logger';
import { EnvironmentHelper } from '../../../helpers/enviornment.helper';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { BasicFitConstants } from '../../../pages-objects/pages/basic-fit/basic-fit.constant';
import { BasicFitHelper } from '../../../pages-objects/pages/basic-fit/basic-fit.helpers';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.basicFit, () => {
  let applicationHelper: ApplicationFormHelper;
  let user: User;

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C26491534 Answer the Basic fit questioner between pass and reject threshold', () => {
    StepLogger.caseId = 26491534;
    StepLogger.preCondition('Create a new candidate and application');
    applicationHelper.goTo();
    user = ApplicationFormHelper.createNewCandidate();
    ProfilePageHelper.completeTutorial();
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

    StepLogger.stepId(1);
    StepLogger.step('Click on My application tab');
    ProfilePageHelper.clickMyApplicationTab();
    StepLogger.verification('My application tab open with job application and Check Basic Fit button');
    EnvironmentHelper.checkAgainstEnv(ProfilePageHelper.verifyJobApplicationSection);

    StepLogger.stepId(2);
    StepLogger.step('Click Check Basic Fit button');
    BasicFitHelper.clickStartAssessmentButton();
    StepLogger.verification('Survey monkey form open with Basic Fit Questioner and Submit button');
    BasicFitHelper.verifyBasicFitPage();

    StepLogger.stepId(3);
    StepLogger.step(`Select the option for the question
    Example: Between 5 and 8 years`);
    BasicFitHelper.selectTheBfqAnswer(BasicFitConstants.elementNames.between5n8);
    StepLogger.verification('Option is selected');
    BasicFitHelper.verifyOptionIsSelected(BasicFitConstants.elementNames.between5n8);

    StepLogger.stepId(4);
    StepLogger.step('Click the Submit button');
    StepLogger.verification('Waiting page with "Were evaluating your submission" displayed');
    BasicFitHelper.clickSubmitButton();

    StepLogger.stepId(5);
    StepLogger.step('Wait for some time');
    cy.wait(15000);
    StepLogger.verification(`Navigates to My application tab
    Exclamation-circle is displayed for Basic fit
    Earn Next Badge is displayed
    Message toast displayed with the message "You've passed the minimum bar for basic fit for
    the Test Position"`);
    ProfilePageHelper.verifyMyApplicationTabActive();
    BasicFitHelper.verifyBasicFitWarningNotification();
    EnvironmentHelper.checkAgainstEnv(BasicFitHelper.verifyBFQWarningStatus);

    StepLogger.stepId(6);
    StepLogger.step('Hover over the Basic fit status');
    StepLogger.verification(`Tool tip with the message "You've passed the minimum bar for Basic Fit
    for the Test Position" is displayed`);
    EnvironmentHelper.checkAgainstEnv(BasicFitHelper.hoverOverBasicFitWarningStatus);
  });

  after(() => {
    DeleteCandidate.deleteCandidate(user.email);
  });
});
