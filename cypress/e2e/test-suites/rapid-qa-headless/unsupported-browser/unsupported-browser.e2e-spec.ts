import { PageHelper } from '../../../components/html/page-helper';
import { CredentialsHelper } from '../../../components/misc-utils/credentials-helper';
import { StepLogger } from '../../../core/step-logger';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.unsupportedBrowser, () => {
  let loginHelper: LoginPageHelper;

  before(() => {
    loginHelper = LoginPageHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C26498155 CCAT test button is disable on unsupported browser', () => {
    if (Cypress.browser.isHeadless) {
      StepLogger.caseId = 26498155;
      const candidate = CredentialsHelper.loginDetails.unsupportedBrowser;

      StepLogger.stepId(1);
      StepLogger.step(`Navigate to Login page on CCAT unsupported browser
      ${Cypress.config().baseUrl}/auth/login`);
      loginHelper.goTo();
      StepLogger.verification('Login page open');
      LoginPageHelper.verifyLoginPage();

      StepLogger.stepId(2);
      StepLogger.step('Enter the User name and password');
      StepLogger.verification('Valid Username and Password is entered');

      StepLogger.stepId(3);
      StepLogger.step('Click Login Button.');
      LoginPageHelper.login(candidate.username, candidate.pass);
      StepLogger.verification('My profile page opens');
      ApplicationFormHelper.verifyProfileHome(candidate.firstName, candidate.lastName);

      StepLogger.stepId(4);
      StepLogger.step('Click Earn this Badge');
      ProfilePageHelper.clickEarnThisBadgeButton();
      StepLogger.verification(`Badge Description open with Start button
      Start button is disabled`);

      StepLogger.stepId(5);
      StepLogger.step('Hover over the start button');
      StepLogger.verification(`Tool tip is displayed with message "Your browser is not supported
      Please use any of the following: chrome, webkit, safari`);
      ProfilePageHelper.hoverOverStartButtonAndVerifyTooltip();

      StepLogger.stepId(6);
      StepLogger.step('Click on my application tab');
      ProfilePageHelper.clickMyApplicationTab();
      StepLogger.verification('For Job application, Take the test button is displayed but it is disabled');

      StepLogger.stepId(7);
      StepLogger.step('Hover over the take the test button');
      StepLogger.verification(`Tool tip displayed with message "Your browser is not supported
      Please use any of the the following: Chrome, Webkit, Safari`);
      ProfilePageHelper.hoverOverTakeTestButtonAndVerifyTooltip();
    }
  });
  after(() => {
    if (Cypress.browser.isHeadless) {
      LoginPageHelper.logout();
    }
  });
});
