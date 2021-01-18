import { DeleteCandidate } from '../../../api/delete-candidate';
import { PageHelper } from '../../../components/html/page-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { StepLogger } from '../../../core/step-logger';
import { EnvironmentHelper } from '../../../helpers/enviornment.helper';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { BasicFitConstants } from '../../../pages-objects/pages/basic-fit/basic-fit.constant';
import { BasicFitHelper } from '../../../pages-objects/pages/basic-fit/basic-fit.helpers';
import { CognitiveAptitudePage } from '../../../pages-objects/pages/cognitive-aptitude/cognitive-aptitude.po';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.basicFit, () => {
  let applicationHelper: ApplicationFormHelper;
  let user: User;

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C26493070 Answer the Basic fit questioner below the reject threshold', () => {
    StepLogger.caseId = 26493070;
    StepLogger.preCondition('Create a candidate and application');
    applicationHelper.goTo();
    user = ApplicationFormHelper.createNewCandidate();
    ProfilePageHelper.completeTutorial();
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

    StepLogger.stepId(1);
    StepLogger.step('Verify Recommended for you section');
    StepLogger.verification('"Recommended for you" card is displayed with Basic Fit heading and Check Basic fit button');
    BasicFitHelper.verifyRecommendedForYou();

    StepLogger.stepId(2);
    StepLogger.step('Click Check Basic fit button');
    BasicFitHelper.clickCheckBasicFitButton();
    StepLogger.verification('Basic fit details open with Start button');
    BasicFitHelper.verifyStartButton();

    StepLogger.stepId(3);
    StepLogger.step('Click Start Button');
    BasicFitHelper.clickStartButton();
    StepLogger.verification('Survey Monkey form open the Basic Fit Questioner and Submit button');
    BasicFitHelper.verifyBasicFitPage();

    StepLogger.stepId(4);
    StepLogger.step(`Select the answer from options
    ex: Fewer than 3 years`);
    BasicFitHelper.selectTheBfqAnswer(BasicFitConstants.elementNames.fewerThan3);
    StepLogger.verification('The answer is selected');
    BasicFitHelper.verifyOptionIsSelected(BasicFitConstants.elementNames.fewerThan3);

    StepLogger.stepId(5);
    StepLogger.step('Click the submit button');
    BasicFitHelper.clickSubmitButton();
    StepLogger.verification(`Waiting page is displayed with the message
    "We're evaluating your submission"`);
    cy.wait(15000);

    StepLogger.stepId(6);
    StepLogger.step('Wait for some time');
    StepLogger.verification(`Basic fit status is updated with a failed image(X sign)
    Status/Next Step is updated with "process stopped" status
    Message toast "We're sorry you  didn't pass the minium bar for Basic Fit for the Test Position`);
    BasicFitHelper.verifyBFQFailedNotification();
    ProfilePageHelper.clickMyApplicationTab();
    EnvironmentHelper.checkAgainstEnv(BasicFitHelper.verifyBFQFailedStatus);
    ExpectationHelper.verifyTextContains(CognitiveAptitudePage.ccat.applicationStatus, 'Process Stopped');

    StepLogger.stepId(7);
    StepLogger.step('Hover over the Basic fit status bubble');
    StepLogger.verification(`Tooltip with the message "We're Sorry you didn't pass minimum bar for Basic
    Fit" is displayed`);
    EnvironmentHelper.checkAgainstEnv(BasicFitHelper.hoverOverBasicFitFailedStatus);
  });

  after(() => {
    DeleteCandidate.deleteCandidate(user.email);
  });
});
