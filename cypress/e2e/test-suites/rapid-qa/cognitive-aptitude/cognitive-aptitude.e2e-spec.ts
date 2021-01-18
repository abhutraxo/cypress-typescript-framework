import { AddMultipleStepResults } from '../../../api/add-multiple-step-results';
import { GetUrlUtils } from '../../../api/geturl-utils';
import { PageHelper } from '../../../components/html/page-helper';
import { StepLogger } from '../../../core/step-logger';
import { EnvironmentHelper } from '../../../helpers/enviornment.helper';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { BasicFitHelper } from '../../../pages-objects/pages/basic-fit/basic-fit.helpers';
import { CognitiveAptitudeHelper } from '../../../pages-objects/pages/cognitive-aptitude/cognitive-aptitude.helper';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

/**
 * Reference - LAMBDA-3552
 * We have divided the test into two different test as CCAT opens in new tabs
 * Also the Test URL is from cross origin
 * Both the things are not supported by Cypress
 */
describe(SuiteNames.cognitiveAptitude, () => {
  let applicationHelper: ApplicationFormHelper;
  let user: User;

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C26498143 Take CCAT test, Application status is updated', () => {
    StepLogger.caseId = 26498143;

    StepLogger.preCondition('Create the a new candidate and application');
    applicationHelper.goTo();
    user = ApplicationFormHelper.createNewCandidate();
    ProfilePageHelper.completeTutorial();
    cy.writeFile('cypress/e2e/resources/user.txt', user.email);
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);
    ProfilePageHelper.clickMyApplicationTab();

    StepLogger.preCondition('Candidate has passed the Basic fit.');
    AddMultipleStepResults.createStepResults(user.email, 100, 'BFQ');
    const base = Cypress.env('server_instance');
    EnvironmentHelper.checkAgainstEnv(BasicFitHelper.verifyBasicFitSuccessResultStatus);

    StepLogger.stepId(1);
    StepLogger.step('Click on Take the Test button.');
    if (base.includes('prod')) {
      CognitiveAptitudeHelper.clickTakeTheTestButton();
      StepLogger.verification('Cognitive aptitude badge description is displayed with Start button.');
      CognitiveAptitudeHelper.verifyCCATBadgeStartPAge();
    }
  });

  it('Visit the CCAT Url', () => {
    const base = Cypress.env('server_instance');
    if (base.includes('prod')) {
      StepLogger.caseId = 26498143;
      cy.visit('https://www.ondemandassessment.com/verify');

      StepLogger.stepId(2);
      StepLogger.step('Click Start button/ Get the Url');
      cy.readFile('cypress/e2e/resources/user.txt').then(userEmail => {
        GetUrlUtils.getUrl(String(userEmail));
      });
      cy.getLocalStorage('cognitiveUrl').then(ccat => {
        StepLogger.step(`${ccat}`);
        PageHelper.goToUrl(String(ccat));
      });
      StepLogger.verification(`New tabs open and CCAT(Criteria) welcome page displayed.
      Continue Button is displayed.`);
      CognitiveAptitudeHelper.verifyWelcomePage();

      StepLogger.stepId(3);
      StepLogger.step('Click Continue Button');
      CognitiveAptitudeHelper.clickContinueButton();
      StepLogger.verification('Verify Information page is displayed with Continue button.');
      CognitiveAptitudeHelper.verifyInformationPage();

      StepLogger.stepId(4);
      StepLogger.step(`Select the Country from Drop down and Select Term of use checkbox.
      Then Click Continue button`);
      CognitiveAptitudeHelper.fillCandidateInformationAndContinue();
      StepLogger.verification('Event Id page is displayed with Event Id AND Continue is displayed.');
      CognitiveAptitudeHelper.verifyEventIdPage();

      StepLogger.stepId(5);
      StepLogger.step('Click Continue.');
      CognitiveAptitudeHelper.clickContinueButton();
      StepLogger.verification('Overview Page is displayed with Continue button.');
      CognitiveAptitudeHelper.verifyOverviewPage();

      StepLogger.stepId(6);
      StepLogger.step('Click Continue');
      CognitiveAptitudeHelper.clickContinueButton();
      StepLogger.verification('Aptitude Assessment with instruction page and Continue button is displayed.');
      CognitiveAptitudeHelper.verifyAptitudeAssessmentPage();

      StepLogger.stepId(7);
      StepLogger.step('Click Continue.');
      CognitiveAptitudeHelper.clickContinueButton();
      StepLogger.verification('Begin test page with Begin Test button is Displayed.');
      // Covered in next step

      StepLogger.stepId(8);
      StepLogger.step('Click Begin Test');
      CognitiveAptitudeHelper.clickBeginTest();
      StepLogger.verification('Question with multiple choice is displayed with Timer on top right section of the page.');

      StepLogger.stepId(9);
      StepLogger.step('Select the option and click Submit Answer.');
      StepLogger.stepId(10);
      StepLogger.step('Follow step 2 for more 49 question and submit all the answer.');
      for (let i = 1; i <= 50; i++) {
        cy.get("p[class*='questionCounter']").contains(`${i} / 50`);
        cy.get('input')
          .first()
          .click();
        cy.get("button[class*='button-block']")
          .contains('Submit Answer')
          .click();
      }
      StepLogger.verification('Thank you message will be displayed after answering all the question.');

      StepLogger.stepId(11);
      StepLogger.step('Wait for some time');
      cy.readFile('cypress/e2e/resources/user.txt').then(userEmail => {
        cy.wait(10000);
        LoginPageHelper.oldUILogin(String(userEmail), 'pass1234');
      });
    } else {
      cy.readFile('cypress/e2e/resources/user.txt').then(userEmail => {
        AddMultipleStepResults.createStepResults(userEmail, 10, 'CCAT');
      });
    }
    StepLogger.verification(`Application navigate back to My application tab and
    CCAT Badge Status is updated with cross Sign and Application status is updated to Process Stopped.`);
    CognitiveAptitudeHelper.verifyCCATFailedStatus();
  });

  after(() => {
    cy.writeFile('cypress/e2e/resources/user.txt', '');
    LoginPageHelper.logout();
  });
});
