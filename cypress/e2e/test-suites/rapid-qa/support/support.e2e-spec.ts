import { DeleteCandidate } from '../../../api/delete-candidate';
import { PageHelper } from '../../../components/html/page-helper';
import { StepLogger } from '../../../core/step-logger';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { ApplicationStatusHelper } from '../../../pages-objects/pages/application-status/application-status.helper';
import { BasicFitHelper } from '../../../pages-objects/pages/basic-fit/basic-fit.helpers';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.support, () => {
  let applicationHelper: ApplicationFormHelper;
  let user: User;

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C36029807 Send a query to support', () => {
    StepLogger.caseId = 36029807;
    const message = 'This is sample question. Please do not reply!';

    StepLogger.preCondition('Create new candidate and application');
    applicationHelper.goTo();
    user = ApplicationFormHelper.createNewCandidate();
    ProfilePageHelper.completeTutorial();
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

    StepLogger.stepId(1);
    StepLogger.step('Click on my application tab');
    ProfilePageHelper.clickMyApplicationTab();
    StepLogger.verification(`My application tab open
    Need help? Contact Us button be displayed`);
    ApplicationStatusHelper.verifyContactUsOnAppTab();

    StepLogger.stepId(2);
    StepLogger.step('Click on the Start Assessment button for BFQ test');
    BasicFitHelper.clickStartAssessmentButton();
    StepLogger.verification(`Basic fit test start. Verify the header on the basic fit test
    Contact Us button should be displayed`);
    ApplicationStatusHelper.verifyTheContactUsBasicFitHeader();

    StepLogger.stepId(3);
    StepLogger.step('Click on Contact Us link');
    ApplicationStatusHelper.clickContactUs();
    StepLogger.verification(`Support dialog open
    Heading "Hello! I'm here to help" is displayed
    Text area, with Submit your question button is displayed`);
    ApplicationStatusHelper.verifySupportDialog();

    StepLogger.stepId(4);
    StepLogger.step('Move focus to move out from the text area.');
    ApplicationStatusHelper.focusBlurMessageTextArea();
    StepLogger.verification('Error message "You message is required!" is displayed');
    ApplicationStatusHelper.verifyErrorMessage();
    ApplicationStatusHelper.verifySubmitYourQuestionDisabled();

    StepLogger.stepId(5);
    StepLogger.step(`Enter the query
    Ex: This is a test question. Do not reply!`);
    ApplicationStatusHelper.enterQuestion(message);
    StepLogger.verification('The valid message is entered and the submit your question button is enabled');
    ApplicationStatusHelper.verifySubmitButtonEnabled();

    StepLogger.stepId(6);
    StepLogger.step('Click the Submit your question button');
    ApplicationStatusHelper.clickSubmitYourQuestionEnabled();
    StepLogger.verification('Success Notification is displayed with the message "Your message has been sent"');
    ApplicationStatusHelper.verifyMessageSentNotification();

    StepLogger.stepId(7);
    StepLogger.step('Get the case data from the backend');
    StepLogger.verification('Verify the case with the same description for the query');
    ApplicationStatusHelper.verifyCaseCreatedAtBackend(user.email, message);
  });

  after(() => {
    DeleteCandidate.deleteCandidate(user.email);
  });
});
