import { AddMultipleStepResults } from '../../../api/add-multiple-step-results';
import { DeleteCandidate } from '../../../api/delete-candidate';
import { PageHelper } from '../../../components/html/page-helper';
import { StepLogger } from '../../../core/step-logger';
import { EndpointHelper } from '../../../helpers/end-point.helper';
import { EnvironmentHelper } from '../../../helpers/enviornment.helper';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { BadgesConstants } from '../../../pages-objects/pages/badges/badges.constants';
import { BadgesHelper } from '../../../pages-objects/pages/badges/badges.helper';
import { BasicFitHelper } from '../../../pages-objects/pages/basic-fit/basic-fit.helpers';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.skipBadges, () => {
  let applicationHelper: ApplicationFormHelper;
  let user: User;
  const base = Cypress.env('server_instance');
  const prodPosition = 'Test Position Production Profile';
  const stagePosition = 'Test Position Staging Profile';

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C26508239 Skip the Badges for the common test', () => {
    StepLogger.caseId = 26508239;
    const eNames = BadgesConstants.elementNames;

    StepLogger.stepId(1);
    StepLogger.step(`Go to the application page for the test position production profile
    ${Cypress.config().baseUrl}/${applicationHelper.url()}`);
    applicationHelper.goTo();
    StepLogger.verification('The application page open');
    ApplicationFormHelper.verifyApplicationForm();

    StepLogger.stepId(2);
    StepLogger.step('Enter the candidate details and click the Submit Application button');
    user = ApplicationFormHelper.createNewCandidate();
    StepLogger.verification('Application Tour (Tutorial) starts');

    StepLogger.stepId(3);
    StepLogger.step('Complete the tutorial');
    ProfilePageHelper.completeTutorial();
    StepLogger.verification('Candidate navigates to the Profile home.');
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

    StepLogger.stepId(4);
    StepLogger.step('Click on the My application tab.');
    ProfilePageHelper.clickMyApplicationTab();
    StepLogger.verification('Under the Jobs application section Test Position Production profile displayed');
    EnvironmentHelper.checkAgainstEnv(ProfilePageHelper.verifyJobApplicationSection);

    StepLogger.stepId(5);
    StepLogger.step('Pass the Basic fit, CCAT, English, and Reading Code Badges');
    StepLogger.subStep('Add BFQ Result');
    AddMultipleStepResults.createStepResults(user.email, 100, 'BFQ');
    EnvironmentHelper.checkAgainstEnv(BasicFitHelper.verifyBasicFitSuccessResultStatus);
    EnvironmentHelper.checkActiveBadges(BadgesHelper.verifyActiveSkillBadge, eNames.cognitiveAptitude);
    BadgesHelper.closeNotification();

    StepLogger.subStep('Add CCAT results');
    AddMultipleStepResults.createStepResults(user.email, 35, 'CCAT');
    ProfilePageHelper.verifyCCATSuccessNotification();
    EnvironmentHelper.checkCompletedBadges(
      BadgesHelper.verifyCompletedSkillBadge,
      eNames.cognitiveAptitude,
      eNames.cognitiveAptitudeOrder,
    );
    cy.wait(3000);
    EnvironmentHelper.checkActiveBadges(BadgesHelper.verifyActiveSkillBadge, eNames.englishProficiency);
    BadgesHelper.closeNotification();

    StepLogger.subStep('Add English Result');
    AddMultipleStepResults.createStepResults(user.email, 100, 'English');
    EnvironmentHelper.checkSuccessNotification(BadgesHelper.verifySuccessNotification, eNames._4starEnglishSuccess);
    cy.wait(3000);
    EnvironmentHelper.checkActiveBadges(BadgesHelper.verifyActiveSkillBadge, eNames.readingTest);
    EnvironmentHelper.checkCompletedBadges(
      BadgesHelper.verifyCompletedSkillBadge,
      eNames.englishProficiency,
      eNames.englishProficiencyOrder,
    );
    BadgesHelper.closeNotification();

    StepLogger.subStep('Add SMQ Results');
    AddMultipleStepResults.createStepResults(user.email, 100, 'SMQ');
    StepLogger.verification(`Basic fit status is updated with Green Tick
    CCAT, English, and Reading Code Badge are update with green tick`);
    EnvironmentHelper.checkSuccessNotification(BadgesHelper.verifySuccessNotification, eNames._3StarSMQ);
    cy.wait(3000);
    if (base.includes('stage')) {
      BadgesHelper.verifyActiveRealBadge(stagePosition, eNames.realWorkTest);
    } else {
      BadgesHelper.verifyActiveRealBadge(prodPosition, eNames.implementingDesign);
    }
    EnvironmentHelper.checkCompletedBadges(
      BadgesHelper.verifyCompletedSkillBadge,
      eNames.readingTest,
      eNames.readingTestOrder,
    );
    BadgesHelper.closeNotification();

    StepLogger.stepId(6);
    StepLogger.step(`Go to the application page for Test position staging profile
    ex: ${Cypress.config().baseUrl}/jobs/9998/test-position-production-profile/apply`);
    if (base.includes('stage')) {
      PageHelper.goToUrl(`${Cypress.config().baseUrl}${EndpointHelper.testPositionProductionProfile}`);
    } else {
      PageHelper.goToUrl(`${Cypress.config().baseUrl}${EndpointHelper.testPositionStagingProfile}`);
    }
    StepLogger.verification('The application page opens');
    ApplicationFormHelper.verifyApplicationForm();

    StepLogger.stepId(7);
    StepLogger.step('Click the account confirmation checkbox and click the Submit application button');
    ApplicationFormHelper.selectApplicationCheckBox();
    ApplicationFormHelper.clickSubmitApplicationButton();
    StepLogger.verification('Candidate navigate to the Profile home');
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

    StepLogger.stepId(8);
    StepLogger.step('Click on the My application tab and verify the test position staging profile');
    ProfilePageHelper.clickMyApplicationTab();
    cy.wait(3000);
    StepLogger.verification(`The basic fit test is not complete
    CCAT, English, and Reading Code Badge are updated with a green tick mark`);
    if (base.includes('stage')) {
      BasicFitHelper.verifyBasicFitNotCompleteStatus(prodPosition);
      BadgesHelper.verifyCompletedSkillBadge(prodPosition, eNames.cognitiveAptitude, eNames.cognitiveAptitudeOrder);
      BadgesHelper.verifyCompletedSkillBadge(prodPosition, eNames.englishProficiency, eNames.englishProficiencyOrder);
      BadgesHelper.verifyCompletedSkillBadge(prodPosition, eNames.readingTest, eNames.readingTestOrder);
      ProfilePageHelper.verifyJobApplicationSection(prodPosition);
    } else {
      BasicFitHelper.verifyBasicFitNotCompleteStatus(stagePosition);
      BadgesHelper.verifyCompletedSkillBadge(stagePosition, eNames.cognitiveAptitude, eNames.cognitiveAptitudeOrder);
      BadgesHelper.verifyCompletedSkillBadge(stagePosition, eNames.englishProficiency, eNames.englishProficiencyOrder);
      BadgesHelper.verifyCompletedSkillBadge(stagePosition, eNames.readingTest, eNames.readingTestOrder);
      ProfilePageHelper.verifyJobApplicationSection(stagePosition);
    }

    StepLogger.stepId(9);
    StepLogger.step('Pass the basic fit test for the test position staging profile');
    BadgesHelper.closeNotification();
    cy.wait(3000);
    AddMultipleStepResults.createStepResults(user.email, 100, 'BFQ');
    StepLogger.verification(`The Basic fit status is update with Green tick
    The next again badge is the Real work badge`);
    if (base.includes('stage')) {
      BasicFitHelper.verifyBasicFitSuccessResultStatus(prodPosition);
      BadgesHelper.verifyActiveRealBadge(prodPosition, eNames.implementingDesign);
    } else {
      BasicFitHelper.verifyBasicFitSuccessResultStatus(stagePosition);
      BadgesHelper.verifyActiveRealBadge(stagePosition, eNames.realWorkTest);
    }
  });
  after(() => {
    DeleteCandidate.deleteCandidate(user.email);
    LoginPageHelper.logout();
  });
});
