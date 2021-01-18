import { DeleteCandidate } from '../../../api/delete-candidate';
import { DomainUtils } from '../../../api/domain-utils';
import { TempEmailUtils } from '../../../api/temp-mail-utils';
import { PageHelper } from '../../../components/html/page-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { RandomHelper } from '../../../components/misc-utils/random-helper';
import { StepLogger } from '../../../core/step-logger';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { LoginPage } from '../../../pages-objects/pages/login-page/login-page.po';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.forgotPass, () => {
  let applicationHelper: ApplicationFormHelper;
  let user: User;

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C26330756 User reset the password and login with new password', () => {
    StepLogger.caseId = 26330756;
    const randomEmail = RandomHelper.getRandomEmail();

    StepLogger.preCondition('Create a new candidate and application');
    applicationHelper.goTo();
    DomainUtils.getDomains().then(domains => {
      user = ApplicationFormHelper.createNewCandidateWithTempEmail(domains.body[0]);
      ProfilePageHelper.completeTutorial();
      LoginPageHelper.logout();
      LoginPageHelper.verifyForgotPasswordSubCard();

      StepLogger.stepId(1);
      StepLogger.step('Click on "Click Here" on the forgot password card');
      LoginPageHelper.clickClickHereLink();
      StepLogger.verification(`Forgot password card opens
      Heading Password Recovery, Email field and Forgot Password button is displayed`);
      LoginPageHelper.verifyForgotPasswordCard();

      StepLogger.stepId(2);
      StepLogger.step('Enter a random email that is not registered');
      LoginPageHelper.enterUsername(randomEmail);
      StepLogger.verification('A valid email is entered');
      ExpectationHelper.verifyAttributeValue(LoginPage.login.username, randomEmail);

      StepLogger.stepId(3);
      StepLogger.step('Click Forgot password button');
      LoginPageHelper.clickForgotPasswordButton();
      StepLogger.verification(`Message toast is displayed with the following error message
      "We're sorry, we could not find any account associated with the email addressed you specified`);
      LoginPageHelper.verifyNoAccountAssociatedError();

      StepLogger.stepId(4);
      StepLogger.step(`Enter a user email id having a profile
      ex: user1@qa.test`);
      LoginPageHelper.enterUsername(user.email);
      StepLogger.verification('A valid email is entered');
      ExpectationHelper.verifyAttributeValue(LoginPage.login.username, user.email);

      StepLogger.stepId(5);
      StepLogger.step('Click Forgot Password button');
      LoginPageHelper.clickForgotPasswordButton();
      StepLogger.verification(`Message bar with a message
      "You new password has been sent to you over email"`);
      LoginPageHelper.verifyPasswordSentNotification();

      StepLogger.stepId(6);
      StepLogger.step('Go to the email');
      cy.wait(20000);
      TempEmailUtils.getEmails(user.email).then(emails => {
        const recoveryEmail = emails.body[1].mail_text_only;
        StepLogger.verification('Get the new password from the reset password email');
        const newPass = ApplicationFormHelper.getResetPassword(recoveryEmail);
        StepLogger.stepId(7);
        StepLogger.step('Got to the login page and enter email and new password');
        LoginPageHelper.clickLoginHereLink();
        LoginPageHelper.verifyLoginPage();
        LoginPageHelper.login(user.email, newPass);
      });

      StepLogger.verification('User navigates to the login page');
      ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

      StepLogger.stepId(8);
      StepLogger.step('Get the user last password recovery time and password recovery time');
      StepLogger.verification(
        'Last password recovery should with X minutes and password recovery counter should be increased by 1',
      );
      LoginPageHelper.verifyPasswordRecoveryCount(user.email);
    });
  });

  after(() => {
    DeleteCandidate.deleteCandidate(user.email);
    LoginPageHelper.logout();
  });
});
