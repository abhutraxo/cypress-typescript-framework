import { AddMultipleStepResults } from '../../../api/add-multiple-step-results';
import { DeleteCandidate } from '../../../api/delete-candidate';
import { ReviewApprovalUtils } from '../../../api/review-approval-utils';
import { CreateInterviewStepResultsSubFlowUtils } from '../../../api/shedule-interview-subflow';
import { PageHelper } from '../../../components/html/page-helper';
import { StepLogger } from '../../../core/step-logger';
import { EnvironmentHelper } from '../../../helpers/enviornment.helper';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { ApplicationStatusHelper } from '../../../pages-objects/pages/application-status/application-status.helper';
import { BadgesConstants } from '../../../pages-objects/pages/badges/badges.constants';
import { BadgesHelper } from '../../../pages-objects/pages/badges/badges.helper';
import { BasicFitHelper } from '../../../pages-objects/pages/basic-fit/basic-fit.helpers';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { ScheduleInterviewHelper } from '../../../pages-objects/pages/schedule-interview/schedule-interview.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.interview, () => {
  let applicationHelper: ApplicationFormHelper;
  let user: User;
  const base = Cypress.env('server_instance');
  const prodPosition = 'Test Position Production Profile';
  const stagePosition = 'Test Position Staging Profile';

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C36486243 Schedule an interview (Integration with Calendly)', () => {
    StepLogger.caseId = 36486243;
    const eNames = BadgesConstants.elementNames;

    StepLogger.preCondition('Create a new candidate and application');
    applicationHelper.goTo();
    user = ApplicationFormHelper.createNewCandidate();
    ProfilePageHelper.completeTutorial();
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);
    ProfilePageHelper.clickMyApplicationTab();

    AddMultipleStepResults.createStepResults(user.email, 100, 'BFQ');
    EnvironmentHelper.checkAgainstEnv(BasicFitHelper.verifyBasicFitSuccessResultStatus);
    BadgesHelper.closeNotification();

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

    StepLogger.subStep('Add Real work Results');
    AddMultipleStepResults.createStepResults(user.email, 100, 'FRQ');
    if (base.includes('stage')) {
      EnvironmentHelper.checkCompletedBadges(
        BadgesHelper.verifyCompletedRealBadge,
        eNames.realWorkTest,
        eNames.realWorkTest,
      );
    } else {
      EnvironmentHelper.checkCompletedBadges(
        BadgesHelper.verifyCompletedRealBadge,
        eNames.implementingDesign,
        eNames.implementingDesign,
      );
    }
    BadgesHelper.verifySuccessNotification('Test Position', 'Congratulations');
    BadgesHelper.closeNotification();

    StepLogger.step('Approve the candidate');
    ReviewApprovalUtils.approveCandidate(user.email);
    cy.wait(20000);
    EnvironmentHelper.checkAgainstEnv(ApplicationStatusHelper.verifyInterviewTerminalStatus);

    StepLogger.step('Create Interview Step Result');
    CreateInterviewStepResultsSubFlowUtils.createStepResult(user.email);

    StepLogger.stepId(1);
    StepLogger.step('Verify the Job application state');
    StepLogger.verification(`BFQ has pass status
    CCAT, English, SMQ, and Real work badges are successful with a green tick mark
    Status shows the SCHEDULE INTERVIEW button`);
    ApplicationStatusHelper.verifyScheduleInterviewButton();

    StepLogger.stepId(2);
    StepLogger.step('Click the schedule interview button');
    ApplicationStatusHelper.clickScheduleInterviewButton();
    StepLogger.verification('Calendly calender open with available dates');
    ScheduleInterviewHelper.verifyCalendlyBookingCalender();

    StepLogger.stepId(3);
    StepLogger.step(`Select a date, then select an available time slot.
    Ex: Date 12, Time: 12:30pm - 1:00pm`);
    StepLogger.verification('The confirm button is displayed');
    ScheduleInterviewHelper.selectDateTimeFromCalender();

    StepLogger.stepId(4);
    StepLogger.step('Click Confirm button');
    ScheduleInterviewHelper.clickConfirmButton();
    StepLogger.verification('User is navigated to user details');

    StepLogger.stepId(5);
    StepLogger.step('Verify all mandatory fields and fills details if required');
    StepLogger.verification('Check the first name, last name email, and phone number are filled');
    ScheduleInterviewHelper.verifyPersonalInfoPage(user);

    StepLogger.stepId(6);
    StepLogger.step('Click the schedule interview button');
    ScheduleInterviewHelper.clickScheduleEventButton();
    StepLogger.verification(`The page is displayed with Interview details
    Ex: "Crossover 30m Interview"
    "12:30 - 1:00pm, Monday, November 11, 2020
    A calender invitation has been sent to your email address`);
    ScheduleInterviewHelper.verifyInterviewConfirmed();

    if (base.includes('prod')) {
      StepLogger.stepId(7);
      StepLogger.step('Wait for some time or refresh the page');
      StepLogger.verification('Status of pipeline is updated to Interview');
      EnvironmentHelper.checkAgainstEnv(ApplicationStatusHelper.verifyInterviewTerminalStatus);
    }
  });

  after(() => {
    DeleteCandidate.deleteCandidate(user.email);
  });
});
