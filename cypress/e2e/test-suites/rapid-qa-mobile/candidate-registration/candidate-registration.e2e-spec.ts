import { DeleteCandidate } from '../../../api/delete-candidate';
import { PageHelper } from '../../../components/html/page-helper';
import { RandomHelper } from '../../../components/misc-utils/random-helper';
import { StepLogger } from '../../../core/step-logger';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { ApplicationForm } from '../../../pages-objects/pages/application-form/application-form.po';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.mobileRegistration, () => {
  let applicationHelper: ApplicationFormHelper;
  const firstName = `R${RandomHelper.getRandomStringWithoutNumber(5).toLowerCase()}`;
  const lastName = 'Test';
  const invalidEmail = RandomHelper.getRandomString(8);
  const candidateEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}_${RandomHelper.getRandomString(4)}@qa.test`;

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    PageHelper.setIPhoneX();
  });

  it('C35536414 Create a candidate and application on the Mobile ', () => {
    StepLogger.caseId = 35536414;
    const linkedInAddress = `LinkedIn${RandomHelper.getRandomString(6)}`;

    StepLogger.stepId(1);
    StepLogger.step(`Navigate to the application page
    Ex: ${Cypress.config().baseUrl}/${applicationHelper.url()}`);
    StepLogger.subStep(`${navigator.userAgent}`);
    applicationHelper.goTo();
    StepLogger.verification('The application form open');
    ApplicationFormHelper.verifyApplicationForm();

    StepLogger.stepId(2);
    StepLogger.step('Verify the application form');
    StepLogger.verification(`The job position name is displayed in the form header
    First Name, Last Name, Email, LinkedIn Profile, and Phone fields are displayed
    The country is selected as per Geolocation
    one account confirmation and Email opt-in checkbox displayed
    Submit application button is displayed and is disabled`);
    ApplicationFormHelper.verifyFormDetails();

    StepLogger.stepId(3);
    StepLogger.step('Enter the first name and last name Ex Rapid QA');
    ApplicationFormHelper.enterFirstName(firstName);
    ApplicationFormHelper.enterLastName(lastName);
    StepLogger.verification(`Valid First Name and Last Name is entered
    Verify the Submit application is disabled`);
    ApplicationForm.form.firstName.vItem.should('have.value', firstName);
    ApplicationForm.form.lastName.vItem.should('have.value', lastName);
    ApplicationFormHelper.verifySubmitButtonDisable();

    StepLogger.stepId(4);
    StepLogger.step('Enter an invalid email Ex:invalidEmail');
    ApplicationFormHelper.enterEmail(invalidEmail);
    ApplicationForm.form.email.vItem.focus().blur();
    StepLogger.verification('Error message "Invalid Email" is displayed');
    ApplicationFormHelper.verifyInvalidEmailErrorMessage();

    StepLogger.stepId(5);
    StepLogger.step('Enter a valid email address ex:rapidtest@qa.test');
    ApplicationFormHelper.enterEmail(candidateEmail);
    StepLogger.verification(`Valid Email is entered
    Verify the Submit application button is disabled`);
    ApplicationForm.form.email.vItem.should('have.value', candidateEmail);

    StepLogger.stepId(6);
    StepLogger.step('Verify the country is automatically selected');
    StepLogger.verification(`The Country should be selected as per device location
    The submitted application button is disabled`);
    ApplicationFormHelper.verifyCountryIsSelected();

    StepLogger.stepId(7);
    StepLogger.step(`Enter the LinkedIn and phone number
    Ex: linkedUser123, 2044777722`);
    ApplicationFormHelper.enterLinkedInAddress(linkedInAddress);
    ApplicationFormHelper.enterPhoneNumberWithCountryCode('United States', '2024777722');
    StepLogger.verification('A valid phone number with country code and linkedIn details are entered');
    ApplicationForm.form.linkedIn.vItem.should('have.value', linkedInAddress);

    StepLogger.stepId(8);
    StepLogger.step('Verify one account confirmation and email opt in checkbox');
    ApplicationFormHelper.verifyApplicationCheckBoxUnchecked();
    StepLogger.verification('Submit application button is enabled');
    ApplicationFormHelper.verifySubmitApplicationButtonEnabled();

    StepLogger.stepId(9);
    StepLogger.step('Click the Submit Application button');
    ApplicationFormHelper.clickSubmitApplicationButton();
    StepLogger.verification(`Error message "You must certify that the data you have provided
    is accurate in order to Apply" displayed below one account confirmation checkbox`);
    ApplicationFormHelper.verifyCertifyError();

    StepLogger.stepId(10);
    StepLogger.step(`Select both one account confirmation and Email opt-in checkbox
    Click the Submit application button`);
    ApplicationFormHelper.selectApplicationCheckBox();
    ApplicationFormHelper.clickSubmitApplicationButton();
    StepLogger.verification('The user is navigated to the profile home.');
    ProfilePageHelper.verifyTourWelcomeDialog();
  });
  after(() => {
    DeleteCandidate.deleteCandidate(candidateEmail);
  });
});
