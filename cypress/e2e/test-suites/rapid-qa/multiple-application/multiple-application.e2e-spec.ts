import { DeleteCandidate } from '../../../api/delete-candidate';
import { PageHelper } from '../../../components/html/page-helper';
import { StepLogger } from '../../../core/step-logger';
import { EndpointHelper } from '../../../helpers/end-point.helper';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.multipleApplication, () => {
  let applicationHelper: ApplicationFormHelper;
  let user: User;

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C26490495 Apply to multiple different jobs at the same time', () => {
    StepLogger.caseId = 26500710;
    StepLogger.stepId(1);
    StepLogger.step(`Navigate to the application page Ex: Test Position Production Profile
    ${Cypress.config().baseUrl}${applicationHelper.url()}`);
    applicationHelper.goTo();
    StepLogger.verification('Application form opens');
    ApplicationFormHelper.verifyApplicationForm();

    StepLogger.stepId(2);
    StepLogger.step('Fill all the required details and click Submit application button');
    user = ApplicationFormHelper.createNewCandidate();
    ProfilePageHelper.completeTutorial();
    StepLogger.verification('Navigate to Profile home');
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

    StepLogger.stepId(3);
    StepLogger.step(`Navigate to application page Ex: Test Position Staging profile
    ${Cypress.config().baseUrl}/jobs/9999/test-position/apply`);
    const base = Cypress.env('server_instance');
    if (base.includes('stage')) {
      PageHelper.goToUrl(`${Cypress.config().baseUrl}/${EndpointHelper.testPositionProductionProfile}`);
    } else {
      PageHelper.goToUrl(`${Cypress.config().baseUrl}/${EndpointHelper.testPositionStagingProfile}`);
    }

    StepLogger.stepId(4);
    StepLogger.step('Select the one account confirmation checkbox and click Submit application button');
    ApplicationFormHelper.selectApplicationCheckBox();
    ApplicationFormHelper.clickSubmitApplicationButton();
    StepLogger.verification('Navigate to My Profile page');
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

    StepLogger.stepId(5);
    StepLogger.step('Click on the My application tab');
    ProfilePageHelper.clickMyApplicationTab();
    StepLogger.verification(`Under Job application
    Test Position Production and Test Position Staging job application is listed`);
    ProfilePageHelper.verifyJobApplicationSection('Test Position Staging Profile');
    if (base.includes('sand')) {
      ProfilePageHelper.verifyJobApplicationSection('Test Position Sandbox Profile');
    } else {
      ProfilePageHelper.verifyJobApplicationSection('Test Position Production Profile');
    }

    StepLogger.stepId(6);
    StepLogger.step(`Navigate to the Test Position Staging application page.
    Click Submit application button`);
    applicationHelper.goTo();
    ApplicationFormHelper.selectApplicationCheckBox();
    ApplicationFormHelper.clickSubmitApplicationButton();
    StepLogger.verification('"You already have an application" alert is displayed with Go to My active application button');
    ApplicationFormHelper.verifyYouHaveActiveAppAlert();
    cy.wait(3000);

    StepLogger.stepId(7);
    StepLogger.step('Click to Go to My active application');
    ApplicationFormHelper.clickGoToMyApplicationButtonOnAlert();
    StepLogger.verification('Navigates to My Profile Page');
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);
  });
  after(() => {
    LoginPageHelper.logout();
    DeleteCandidate.deleteCandidate(user.email);
  });
});
