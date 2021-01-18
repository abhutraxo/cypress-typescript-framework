import { PageHelper } from '../../../components/html/page-helper';
import { CredentialsHelper } from '../../../components/misc-utils/credentials-helper';
import { DateHelper } from '../../../components/misc-utils/date-helper';
import { StepLogger } from '../../../core/step-logger';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { CandidateProfileHelper } from '../../../pages-objects/pages/candidate-profile/candidate-profile.helper';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.candidateProfile, () => {
  let loginHelper: LoginPageHelper;
  let fileName: string;
  before(() => {
    loginHelper = LoginPageHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C26457304 Update the Candidate personal information', () => {
    StepLogger.caseId = 26457304;
    const candidate = CredentialsHelper.loginDetails.candidateProfile;
    StepLogger.subStep(`Height: ${window.screen.availHeight} Width: ${window.screen.availWidth}`);
    StepLogger.preCondition('Login into the candidate profile');
    loginHelper.goTo();
    LoginPageHelper.login(candidate.username, candidate.pass);
    ApplicationFormHelper.verifyProfileHome(candidate.firstName, candidate.lastName);

    StepLogger.stepId(1);
    StepLogger.step('Click on the Edit button in candidate information section');
    CandidateProfileHelper.clickEditProfileLink();
    StepLogger.verification('Edit Profile form opens');
    CandidateProfileHelper.verifyEditProfileDialogOpen();

    StepLogger.stepId(2);
    StepLogger.step('Verify edit profile form');
    StepLogger.verification(`First name Last name, Email, LinkedIn Profile, Country, Phone Number
    City, Resume, Time Zone, Availability, input are displayed
    Cancel and Save button are displayed
    First name, Last Name, Email and LinkedIn Profile are not editable`);
    CandidateProfileHelper.verifyEditProfileDialogDetails();

    StepLogger.stepId(3);
    StepLogger.step(`Verify candidate First Name, Last Name, Email, LinkedIn
    value of candidate used during registration`);
    StepLogger.verification('First Name, Last Name,Email, LinkedIn values should be same used during registration');
    CandidateProfileHelper.verifyCandidateBasicInformation(candidate);

    StepLogger.stepId(4);
    StepLogger.step(`Update Phone number to an invalid phone number
    Ex: 0000000000000`);
    CandidateProfileHelper.getPhoneNumber();
    CandidateProfileHelper.enterPhoneNumber('0000000000');
    StepLogger.verification('Error message "Invalid Phone number" is displayed and Save button is disabled');
    CandidateProfileHelper.verifyInvalidPhoneNoErrorMsg();

    StepLogger.stepId(5);
    StepLogger.step(`Edit the City
    Ex: New Delhi`);
    CandidateProfileHelper.enterCity('New Delhi');
    StepLogger.verification('Valid City is added');
    CandidateProfileHelper.verifyCityEntered('New Delhi');

    StepLogger.stepId(6);
    StepLogger.step(`Get the current phone number of the user and update it to new phone number
    Ex: 999999999 to 99999999998`);
    StepLogger.verification('Valid phone number is added to the field');
    CandidateProfileHelper.updateThePhoneNumber();

    StepLogger.stepId(7);
    StepLogger.step(`Click on Resume button on resume field and add new resume file
    Ex: resume_candidate_time.txt
    "This resume is created on Aug 20 18.30`);
    const updatedResumeTxt = CandidateProfileHelper.updateResumeFile();
    CandidateProfileHelper.uploadResume();
    StepLogger.verification('File is added to field');
    CandidateProfileHelper.verifyResumeFileIsAttached();

    StepLogger.stepId(8);
    StepLogger.step('Click on Change picture button and select a different from current uploaded photo');
    StepLogger.verification('Profile image should be updated');
    CandidateProfileHelper.updateAvatarImage();

    StepLogger.stepId(9);
    StepLogger.step('Click on Save button');
    CandidateProfileHelper.clickSaveButton();
    StepLogger.verification(`Edit Profile from closes
    Update profile image is displayed
    Verify updated phone number is displayed on the candidate information`);
    CandidateProfileHelper.verifyEditProfileCloses();
    CandidateProfileHelper.verifyAvatarImage();
    CandidateProfileHelper.verifyCandidatePhoneNumber();

    StepLogger.stepId(10);
    StepLogger.step('Click on the resume button');
    CandidateProfileHelper.clickResumeButton();
    StepLogger.verification('Resume download. Verify it is same as upload file');
    fileName = `${candidate.firstName} ${candidate.lastName}-CV-${DateHelper.getFormattedDate(
      0,
      0,
      0,
      '-',
      'YYYYMMDD',
    )}.txt`;
    CandidateProfileHelper.readResumeFile(fileName, updatedResumeTxt);
  });
  after(() => {
    cy.task('deleteFile', fileName);
    LoginPageHelper.logout();
  });
});
