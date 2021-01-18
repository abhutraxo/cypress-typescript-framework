import { AddMultipleStepResults } from '../../../api/add-multiple-step-results';
import { DeleteCandidate } from '../../../api/delete-candidate';
import { PageHelper } from '../../../components/html/page-helper';
import { StepLogger } from '../../../core/step-logger';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { BadgesHelper } from '../../../pages-objects/pages/badges/badges.helper';
import { CognitiveAptitudeHelper } from '../../../pages-objects/pages/cognitive-aptitude/cognitive-aptitude.helper';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.cognitiveAptitude, () => {
  let applicationHelper: ApplicationFormHelper;
  let user: User;

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C26498156 Candidate application process should stop on scoring failed retryable score twice', () => {
    StepLogger.caseId = 26498156;
    StepLogger.preCondition('Create a new candidate and application');
    applicationHelper.goTo();
    user = ApplicationFormHelper.createNewCandidate();
    ProfilePageHelper.completeTutorial();
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

    StepLogger.stepId(1);
    StepLogger.step('On My application tab click take the test button');
    ProfilePageHelper.clickMyApplicationTab();
    AddMultipleStepResults.createStepResults(user.email, 100, 'BFQ');
    StepLogger.verification('CCAT description is displayed with Start button');
    CognitiveAptitudeHelper.verifyTakeTestButtonDisplayed();

    StepLogger.stepId(2);
    StepLogger.step('Score CCAT between pass threshold and reject threshold Ex: 60 percent');
    AddMultipleStepResults.createStepResults(user.email, 30, 'CCAT');
    StepLogger.verification(`CCAT badge is updated with retry sign and take test button
    A warning notification is displayed`);
    ProfilePageHelper.verifyCCATWarningNotification();
    BadgesHelper.closeNotification();

    StepLogger.stepId(3);
    StepLogger.step('Score the CCAT test between Pass and Reject threshold Ex: 62 percent');
    cy.wait(10000);
    AddMultipleStepResults.createStepResults(user.email, 31, 'CCAT');
    StepLogger.verification('Application is rejected. Status is updated to Process Stopped');
    CognitiveAptitudeHelper.verifyCCATFailedStatusWithStars();
  });
  after(() => {
    DeleteCandidate.deleteCandidate(user.email);
  });
});
