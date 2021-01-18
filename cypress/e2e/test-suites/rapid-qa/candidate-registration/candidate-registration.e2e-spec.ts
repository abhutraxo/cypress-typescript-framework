import { DeleteCandidate } from '../../../api/delete-candidate';
import { PageHelper } from '../../../components/html/page-helper';
import { RandomHelper } from '../../../components/misc-utils/random-helper';
import { StepLogger } from '../../../core/step-logger';
import { EnvironmentHelper } from '../../../helpers/enviornment.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { ApplicationForm } from '../../../pages-objects/pages/application-form/application-form.po';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { ProfilePageHelperExt } from '../../../pages-objects/pages/profile-page/profile-page-ext.helper';
import { ProfilePagesConstants } from '../../../pages-objects/pages/profile-page/profile-page.constants';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.candidateRegistration, () => {
  let applicationHelper: ApplicationFormHelper;
  let firstName: string;
  let lastName: string;
  let email: string;

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    firstName = `R${RandomHelper.getRandomStringWithoutNumber(6).toLowerCase()}`;
    lastName = 'Test';
    email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}_${RandomHelper.getRandomNumber(4)}@qa.test`;
    PageHelper.maximizeBrowser();
  });

  it('C26409808 Create a new candidate and application', () => {
    StepLogger.caseId = 26409808;
    const invalidEmail = RandomHelper.getRandomString(6);
    const linkedIn = `LinkedIn${RandomHelper.getRandomString(6)}`;

    StepLogger.stepId(1);
    StepLogger.step(`Navigate to the application page
    ex: ${Cypress.config().baseUrl}/jobs/9998/test-position/apply`);
    applicationHelper.goTo();
    StepLogger.verification('Application form open');
    ApplicationFormHelper.verifyApplicationForm();

    StepLogger.stepId(2);
    StepLogger.step('Verify the application form');
    StepLogger.verification(`The job position name is displayed in the form header.
    First Name, Last Name, Email, LinkedIn Profile, and Phone fields are displayed.
    The country is selected as per Geolocation.
    one Account Confirmation and Email opt-in checkbox displayed.`);
    ApplicationFormHelper.verifyFormDetails();

    StepLogger.stepId(3);
    StepLogger.step('Enter the First Name and Last Name');
    ApplicationFormHelper.enterFirstName(firstName);
    ApplicationFormHelper.enterLastName(lastName);
    StepLogger.verification(`Valid First Name and Last Name is entered
    Verify the Submit application is disabled`);
    ApplicationForm.form.firstName.vItem.should('have.value', firstName);
    ApplicationForm.form.lastName.vItem.should('have.value', lastName);
    ApplicationFormHelper.verifySubmitButtonDisable();

    StepLogger.stepId(4);
    StepLogger.step(`Enter an invalid Email
    ex: 1234`);
    ApplicationFormHelper.enterEmail(invalidEmail);
    ApplicationFormHelper.enterLinkedInAddress(' ');
    StepLogger.verification('Error message "Invalid Email" is displayed.');
    ApplicationFormHelper.verifyInvalidEmailErrorMessage();

    StepLogger.stepId(5);
    StepLogger.step('Enter Valid Email Address');
    ApplicationFormHelper.enterEmail(email);
    StepLogger.verification(`Valid Email is entered
    Verify Submit application is disabled`);
    ApplicationForm.form.email.vItem.should('have.value', email);
    ApplicationFormHelper.verifySubmitButtonDisable();

    StepLogger.stepId(6);
    StepLogger.step('Verify the Country is automatically selected.');
    ApplicationFormHelper.verifyCountryIsSelected();
    StepLogger.verification(`The country should be selected as per device location.
    Verify the Submit application is disabled.`);
    ApplicationFormHelper.verifySubmitButtonDisable();

    StepLogger.stepId(7);
    StepLogger.step(`Enter the LinkedIn and phone number.
    Ex: linkedInUserAb123, 9644777722`);
    ApplicationFormHelper.enterLinkedInAddress(linkedIn);
    ApplicationFormHelper.enterPhoneNumberWithCountryCode('United States', '2024777722');
    StepLogger.verification(`A valid phone number with country code and linkedIn details are entered
    Submit button is enabled`);
    ApplicationForm.form.linkedIn.vItem.should('have.value', linkedIn);
    ApplicationFormHelper.verifySubmitApplicationButtonEnabled();

    StepLogger.stepId(8);
    StepLogger.step('Verify One account Confirmation and Email opt-in checkbox.');
    StepLogger.verification('Both the checkbox are not selected by default.');
    ApplicationFormHelper.verifyApplicationCheckBoxUnchecked();

    StepLogger.stepId(9);
    StepLogger.step('Click the Submit Application button.');
    ApplicationFormHelper.clickSubmitApplicationButton();
    StepLogger.verification(`Error message "You must certify
    that the data you have provided is accurate in order to Apply" displayed below one account confirmation checkbox.`);
    ApplicationFormHelper.verifyCertifyError();

    StepLogger.stepId(10);
    StepLogger.step(`Select both one account confirmation and Email opt-in checkbox
    Click Submit Application button`);
    ApplicationFormHelper.selectApplicationCheckBox();
    ApplicationFormHelper.clickSubmitApplicationButton();
    StepLogger.verification('The user is navigated to the profile home');
  });

  it('C26196952 Verify the profile page home for newly registered candidate', () => {
    StepLogger.caseId = 26196952;

    StepLogger.stepId(1);
    StepLogger.step(`Candidate is navigated to Profile Home.
    Application tour guide is displayed for newly registered candidate`);
    StepLogger.verification('Tour guide welcome alert with "Take Tour" button opens.');
    ProfilePageHelper.verifyTourWelcomeDialog();

    StepLogger.stepId(2);
    StepLogger.step('Click Take tour button');
    ProfilePageHelper.clickTakeTourButton();
    StepLogger.verification('Navigate to Follow recommendation slide with Next button');
    ProfilePageHelper.verifyFollowRecommendationDialog();

    StepLogger.stepId(3);
    StepLogger.step('Click Next button');
    ProfilePageHelper.clickNextButton();
    StepLogger.verification('Follow progress slide appear with finish button');
    ProfilePageHelper.verifyFollowProgressDialog();

    StepLogger.stepId(4);
    StepLogger.step('Click Finish button');
    ProfilePageHelper.clickFinishButton();
    StepLogger.verification('Tour ends and profile home page is displayed');
    ApplicationFormHelper.verifyProfileHome(firstName, lastName);

    StepLogger.stepId(5);
    StepLogger.step('Verify the Personal Information of the Candidate.');
    StepLogger.verification(`Following Elements:
    1) Location (City, Country)
    2) Time Zone
    3) Phone Number
    4) Email
    5) LinkedIn Url
    6) Resume are displayed
    Edit button is displayed near candidate information heading
    Verify the information is same which was used for application creation`);
    ProfilePageHelper.verifyCandidatePersonalInfo();
    ProfilePageHelper.verifyCandidatePersonalInfoDetails(email);

    StepLogger.stepId(6);
    StepLogger.step('Verify the Candidate time line');
    StepLogger.verification(`Creation date and application position is mentioned in the time line.
    Ex: Applied for Test Position Staging, Jun 18th 2020
    Created Account on Crossover, Jun 18th 2020`);
    ProfilePageHelper.verifyCandidateTimeline();

    StepLogger.stepId(7);
    StepLogger.step('Verify the skill and Real work Badges Section');
    StepLogger.verification(`No Badge are displayed.
    Skill Badge and Real work Badge plus button is displayed.`);
    ProfilePageHelper.verifySkillAndRealWorkBadges();

    StepLogger.stepId(8);
    StepLogger.step('Verify candidate the Introduction, Work Experience and Education section');
    StepLogger.verification(`Candidate information, Work Experience and Education section are empty
    Add section drop down is displayed with option `);
    ProfilePageHelper.verifyCandidateIntroductionSection();

    StepLogger.stepId(9);
    StepLogger.step('Click on My application tab');
    ProfilePageHelper.clickMyApplicationTab();
    StepLogger.verification(`List of Job application is displayed.
    Ex: Role- Test Position Sandbox`);
    EnvironmentHelper.checkAgainstEnv(ProfilePageHelper.verifyJobApplicationSection);

    StepLogger.stepId(10);
    StepLogger.step('Verify the Recommended job section is displayed for applied position');
    StepLogger.verification(`Recommended jobs is displayed
    Ex: For Test Position Sandbox
    Under Status/ Next Step, Check Basic fit button is displayed`);
    ProfilePageHelper.verifyRecommendedJobSection('Software Engineer');

    StepLogger.stepId(11);
    StepLogger.step('Logout of application ');
    StepLogger.verification('Login page is displayed');
    LoginPageHelper.logout();

    StepLogger.stepId(12);
    StepLogger.step('Again Login with the same candidate');
    LoginPageHelper.login(email, 'pass1234');
    StepLogger.verification(`Candidate navigates to Profile Home
    Tour Guide(Tutorial) should not be displayed`);
    ApplicationFormHelper.verifyProfileHome(firstName, lastName);
  });

  // Jira References LAMBDA-4581, LAMBDA-6066
  it('C26501840 Add candidate Introduction, Work Experience, Education to update the my profile', () => {
    StepLogger.caseId = 26501840;
    const descriptionText = 'This is summary of the candidate. I have worked on many technologies.. etc.';
    const eNames = ProfilePagesConstants.elementNames;

    StepLogger.stepId(1);
    StepLogger.step('Click on Introduce yourself button beside the Introduction section heading');
    ProfilePageHelperExt.clickIntroduceYourselfButton();
    StepLogger.verification('Add Introduction dialog opens with Summary Input field');
    ProfilePageHelperExt.verifyAddIntroductionDialog();

    StepLogger.stepId(2);
    StepLogger.step(`Add the summary into the input field and click save
    Ex: This is summary of the candidate. I have worked on many technologies etc`);
    ProfilePageHelperExt.enterDescription(descriptionText);
    ProfilePageHelperExt.clickSaveButton();
    StepLogger.verification(`Under Candidate introduction info is updated under introduction section
    Edit button is displayed instead of Introduce yourself`);
    ProfilePageHelperExt.verifyIntroEditButton();
    ProfilePageHelperExt.verifyIntroductionAdded(descriptionText);

    StepLogger.stepId(3);
    StepLogger.step('Click on Add work Experience button besides the work experience heading');
    ProfilePageHelperExt.clickAddWorkExpButton();
    StepLogger.verification(`Add Work Experience dialog opens
    Title, Company, Start Date, End Date Input fields are displayed
    I am currently working on this role checkbox is displayed
    Description, Company URL an employment type dropdown is displayed
    Save button is displayed`);
    ProfilePageHelperExt.verifyAddWorkExpDialog();

    StepLogger.stepId(4);
    StepLogger.step(`Add the Work Experience details
    Ex: Title: Software Engineer, Company : Some Company, Start Date: 20/3/2018
    Select I am currently working on this role and click save`);
    ProfilePageHelperExt.addWorkExperience();
    StepLogger.verification('Work Experience of the candidate is added with Edit and Delete Button');
    ProfilePageHelperExt.verifyWorkExperienceAdded();

    StepLogger.stepId(5);
    StepLogger.step('Click Add Education button near Add Eduction section');
    ProfilePageHelperExt.clickAddEducationButton();
    StepLogger.verification(`Add Educational dialog opens with school name, Filed of Study, Degree, grade, Start Date, End date,
    description and school website URL input field are displayed`);
    ProfilePageHelperExt.verifyAddEducationDialog();

    StepLogger.stepId(6);
    StepLogger.step('Enter the School name, Field of Study and Description and click save button');
    ProfilePageHelperExt.addEducation();
    StepLogger.verification('Education details are added with Edit and Delete Button');
    ProfilePageHelperExt.verifyAddedEducation();

    StepLogger.stepId(7);
    StepLogger.step('Click Add Section drop down');
    ProfilePageHelper.clickAddSectionMenu();
    StepLogger.verification(`Drop down opens with options
    1) Award 2) Certification 3) Patents 4)Publication`);
    ProfilePageHelperExt.verifyAddSectionMenu();

    StepLogger.stepId(8);
    StepLogger.step('Click Award option');
    ProfilePageHelperExt.clickAddSectionMenuItem(eNames.award);
    StepLogger.verification('Awards section is added with Add Award button');
    ProfilePageHelperExt.verifyProfileSection(eNames.award, `Add ${eNames.award}`);

    StepLogger.stepId(9);
    StepLogger.step('Click Add Award button');
    ProfilePageHelperExt.clickAddSectionDetailsButton(eNames.award, `Add ${eNames.award}`);
    StepLogger.verification('Award Dialog opens with Title, Associated with, Issuer, Issue Date, description');
    ProfilePageHelperExt.verifyAddAwardDialog();

    StepLogger.stepId(10);
    StepLogger.step(`Enter all the award details
    Ex: Developer of the year and select the associated with value from education or work experience list
    Add Description and click save`);
    ProfilePageHelperExt.addAwardDetails();
    StepLogger.verification('Award details are displayed with Edit and Delete button');
    ProfilePageHelperExt.verifyAwardDetails();

    StepLogger.stepId(11);
    StepLogger.step('Click Add Section drop down add Certification section');
    ProfilePageHelper.clickAddSectionMenu();
    ProfilePageHelperExt.clickAddSectionMenuItem(eNames.certification);
    StepLogger.verification('Certification section is added with Add Certification button');
    ProfilePageHelperExt.verifyProfileSection(eNames.certification, `Add ${eNames.certification}`);

    StepLogger.stepId(12);
    StepLogger.step('Click Add Certification section');
    ProfilePageHelperExt.clickAddSectionDetailsButton(eNames.certification, `Add ${eNames.certification}`);
    StepLogger.verification(`Add Certification dialog opens with Name, Issuing org, Expiration Date
    Credentials Id, Credentials URL, Description fields`);
    ProfilePageHelperExt.verifyCertificationDialog();

    StepLogger.stepId(13);
    StepLogger.step(`Enter all the Details and click save.
    Ex: Java Certification, Oracle and other details`);
    ProfilePageHelperExt.addCertificationDetails();
    StepLogger.verification('Certification Details are added');
    ProfilePageHelperExt.verifyCertificationDetailsAdded();

    StepLogger.stepId(14);
    StepLogger.step('Click Add Section drop down add patent section');
    ProfilePageHelper.clickAddSectionMenu();
    ProfilePageHelperExt.clickAddSectionMenuItem(eNames.patent);
    StepLogger.verification('Patent section is added with add patent button');
    ProfilePageHelperExt.verifyProfileSection(eNames.patent, `Add ${eNames.patent}`);

    StepLogger.stepId(15);
    StepLogger.step('Click Add Patent button');
    ProfilePageHelperExt.clickAddSectionDetailsButton(eNames.patent, `Add ${eNames.patent}`);
    StepLogger.verification(`Add patent dialog opens with Patent Title, Patent Office
    Patent Url, Patent Number, Patent State, Issued Date, Description fields`);
    ProfilePageHelperExt.verifyAddPatentDialog();

    StepLogger.stepId(16);
    StepLogger.step('Add all mandatory information such as Patent title, Patent office and Number and click save.');
    ProfilePageHelperExt.addPatentDetails();
    StepLogger.verification('Patent details are add to profile page of the candidate');
    ProfilePageHelperExt.verifyAddedPatentDetails();

    StepLogger.stepId(17);
    StepLogger.step('Click Add Section drop down add publication section');
    ProfilePageHelper.clickAddSectionMenu();
    ProfilePageHelperExt.clickAddSectionMenuItem(eNames.publication);
    StepLogger.verification('Publication section is added with Add Publication button');
    ProfilePageHelperExt.verifyProfileSection(eNames.publication, `Add ${eNames.publication}`);

    StepLogger.stepId(18);
    StepLogger.step('Click Add Publication button');
    ProfilePageHelperExt.clickAddSectionDetailsButton(eNames.publication, `Add ${eNames.publication}`);
    StepLogger.verification(
      'Add Publication dialog opens with title, Publication/Publisher, Publication Url, Publication Date, Description field',
    );
    ProfilePageHelperExt.verifyPublicationDialog();

    StepLogger.stepId(19);
    StepLogger.step('Add Publication details such as Title, Publication, URL and click save');
    ProfilePageHelperExt.addPublicationDetails();
    StepLogger.verification('Publication details are add to the candidate profile page');
    ProfilePageHelperExt.verifyAddedPublication();
  });

  after(() => {
    DeleteCandidate.deleteCandidate(email);
    LoginPageHelper.logout();
    cy.clearLocalStorage();
  });
});
