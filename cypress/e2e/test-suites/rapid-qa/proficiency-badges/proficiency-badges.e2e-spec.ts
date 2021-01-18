import { AddMultipleStepResults } from '../../../api/add-multiple-step-results';
import { DeleteCandidate } from '../../../api/delete-candidate';
import { PageHelper } from '../../../components/html/page-helper';
import { StepLogger } from '../../../core/step-logger';
import { EnvironmentHelper } from '../../../helpers/enviornment.helper';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { BasicFitHelper } from '../../../pages-objects/pages/basic-fit/basic-fit.helpers';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.proficiencyBadges, () => {
  let applicationHelper: ApplicationFormHelper;
  let user: User;

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C26510158 Skill Badges should update after Retry Score on CCAT', () => {
    StepLogger.caseId = 26510158;

    StepLogger.preCondition('Create a new candidate and application');
    applicationHelper.goTo();
    user = ApplicationFormHelper.createNewCandidate();
    ProfilePageHelper.completeTutorial();
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);
    AddMultipleStepResults.createStepResults(user.email, 100, 'BFQ');

    StepLogger.stepId(1);
    StepLogger.step('Go to My application tab');
    ProfilePageHelper.clickMyApplicationTab();
    EnvironmentHelper.checkAgainstEnv(BasicFitHelper.verifyBasicFitSuccessResultStatus);
    StepLogger.verification('Verify CCAT Badge is active');
    ProfilePageHelper.verifyActiveBadge('Cognitive Aptitude');

    StepLogger.stepId(2);
    StepLogger.step(`Start the CCAT and score retryable score
    Ex: 62 percent`);
    AddMultipleStepResults.createStepResults(user.email, 31, 'CCAT');
    StepLogger.verification(`CCAT Badge is updated to Retry Status
    Retry Notification message is displayed in amber color`);
    ProfilePageHelper.verifyCCATWarningNotification();

    StepLogger.stepId(3);
    StepLogger.step('Go to My Profile Tab');
    ProfilePageHelper.clickMyProfileTab();
    StepLogger.verification('Cognitive aptitude badge is displayed with 1 star');
    ProfilePageHelper.verifyProficiencyBadge('Cognitive Aptitude', 2, 3);

    StepLogger.stepId(4);
    StepLogger.step(`Go to my application tab and Take the retry attempt
    score above pass threshold. Ex: 72 percent`);
    ProfilePageHelper.clickMyApplicationTab();
    cy.wait(5000);
    AddMultipleStepResults.createStepResults(user.email, 36, 'CCAT');
    StepLogger.verification(`CCAT Success Notification is displayed
    CCAT Badge is update with a green tick mark.`);
    ProfilePageHelper.verifyCCATSuccessNotification();

    StepLogger.stepId(5);
    StepLogger.step('Go to My Profile tab');
    ProfilePageHelper.clickMyProfileTab();
    StepLogger.verification('Cognitive aptitude badge is updated to 3 Star');
    ProfilePageHelper.verifyProficiencyBadge('Cognitive Aptitude', 3, 2);

    StepLogger.stepId(6);
    StepLogger.step('Click on the Badge icon');
    ProfilePageHelper.clickBadge('Cognitive Aptitude');
    StepLogger.verification('Badge Description open with same results');
    /*
     * Fix after ui changes at application side.
     * ProfilePageHelper.verifyAppStarsInDescription(3, 2);*/
  });

  after(() => {
    DeleteCandidate.deleteCandidate(user.email);
  });
});
