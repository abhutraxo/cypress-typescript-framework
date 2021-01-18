import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { StepLogger } from '../../../core/step-logger';

import { ProfilePagesConstants } from './profile-page.constants';
import { ProfilePage } from './profile-page.po';

export class ProfilePageHelperExt {
  static clickIntroduceYourselfButton() {
    StepLogger.subStep('Click Introduction yourself button');
    ProfilePage.profile.addIntroButton.click();
  }

  static verifyAddIntroductionDialog() {
    StepLogger.subVerification('Verify the add introduction dialog');
    ExpectationHelper.verifyDisplayedStatus(
      ProfilePage.profile.dialogHeading(ProfilePagesConstants.elementNames.addIntroduction),
    );
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.saveButton);
    ProfilePage.profile.descriptionTextArea.verifyDisplayedStatus();
  }

  static enterDescription(description: string) {
    StepLogger.subStep('Enter description');
    ProfilePage.profile.descriptionTextArea.sendKeys(description);
  }

  static clickSaveButton() {
    StepLogger.subStep('Click Save button');
    ProfilePage.profile.saveButton.click();
  }

  static verifyIntroEditButton() {
    StepLogger.subVerification('Verify Introduction  Edit button is displayed');
    ProfilePage.profile.introEditButton.verifyDisplayedStatus();
  }

  static verifyIntroductionAdded(description: string) {
    StepLogger.subVerification('Verify the Introduction added');
    ExpectationHelper.verifyTextContains(ProfilePage.profile.introduction, description);
  }

  static clickAddWorkExpButton() {
    StepLogger.subStep('Click Add work experience button');
    ProfilePage.profile.addWorkExperience.click();
  }

  static verifyAddWorkExpDialog() {
    StepLogger.subVerification('Verify Add work experience dialog');
    ExpectationHelper.verifyDisplayedStatus(
      ProfilePage.profile.dialogHeading(ProfilePagesConstants.elementNames.addWorkExp),
    );
    ProfilePage.profile.title.verifyDisplayedStatus();
    ProfilePage.profile.company.verifyDisplayedStatus();
    ProfilePage.profile.startDate.verifyDisplayedStatus();
    ProfilePage.profile.ongoingJob.verifyDisplayedStatus();
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.saveButton);
  }

  static addWorkExperience() {
    StepLogger.subStep('Add work experience details');
    ExpectationHelper.verifyDisplayedStatus(
      ProfilePage.profile.dialogHeading(ProfilePagesConstants.elementNames.addWorkExp),
    );
    ProfilePage.profile.title.sendKeys('Software Engineer');
    ProfilePage.profile.company.sendKeys('Some Company');
    ProfilePage.profile.startDate.sendKeys('2018-05-05');
    ProfilePage.profile.workExDescription.sendKeys('Worked in the org as software engineer');
    ProfilePage.profile.companyUrl.sendKeys('https://google.com');
    ProfilePage.profile.saveButton.click();
  }

  static verifyWorkExperienceAdded() {
    StepLogger.subStep('Work experience added');
    ExpectationHelper.verifyTextContains(ProfilePage.profile.workExpTitle, 'Software Engineer');
    ExpectationHelper.verifyTextContains(ProfilePage.profile.addedWorkExperience, 'Worked in the org as software engineer');
    ProfilePage.profile.workExpEditButton.verifyDisplayedStatus();
    ProfilePage.profile.workExpDelButton.verifyDisplayedStatus();
  }

  static clickAddEducationButton() {
    StepLogger.subStep('Click Add Education button');
    ProfilePage.profile.addEduction.click();
  }

  static verifyAddEducationDialog() {
    StepLogger.subVerification('Verify add education dialog');
    ExpectationHelper.verifyDisplayedStatus(
      ProfilePage.profile.dialogHeading(ProfilePagesConstants.elementNames.addEduction),
    );
    ProfilePage.profile.company.verifyDisplayedStatus();
    ProfilePage.profile.title.verifyDisplayedStatus();
    ProfilePage.profile.degree.verifyDisplayedStatus();
    ProfilePage.profile.grade.verifyDisplayedStatus();
    ProfilePage.profile.startDate.verifyDisplayedStatus();
    ProfilePage.profile.workExDescription.verifyDisplayedStatus();
    ProfilePage.profile.companyUrl.verifyDisplayedStatus();
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.saveButton);
  }

  static addEducation() {
    StepLogger.subStep('Add Education details');
    ProfilePage.profile.company.sendKeys('University of Pune');
    ProfilePage.profile.title.sendKeys('Computer Science');
    ProfilePage.profile.degree.sendKeys('Bachelors of Engineering');
    ProfilePage.profile.grade.sendKeys('A Grade');
    ProfilePage.profile.workExDescription.sendKeys('Engineering degree');
    ProfilePage.profile.companyUrl.sendKeys('https://abcd.com');
    ProfilePage.profile.saveButton.click();
  }

  static verifyAddedEducation() {
    StepLogger.subVerification('Verify the added Education details');
    ExpectationHelper.verifyTextContains(ProfilePage.profile.educationTitle, 'Computer Science');
    ExpectationHelper.verifyTextContains(ProfilePage.profile.educationDescription, 'Engineering degree');
    ProfilePage.profile.educationEditButton.verifyDisplayedStatus();
    ProfilePage.profile.educationDelButton.verifyDisplayedStatus();
  }

  static verifyAddSectionMenu() {
    StepLogger.subVerification('Verify Add section menu');
    ProfilePage.profile.addSectionMenuItems(ProfilePagesConstants.elementNames.award).verifyDisplayedStatus();
    ProfilePage.profile.addSectionMenuItems(ProfilePagesConstants.elementNames.certification).verifyDisplayedStatus();
    ProfilePage.profile.addSectionMenuItems(ProfilePagesConstants.elementNames.patent).verifyDisplayedStatus();
    ProfilePage.profile.addSectionMenuItems(ProfilePagesConstants.elementNames.publication).verifyDisplayedStatus();
  }

  static clickAddSectionMenuItem(option: string) {
    StepLogger.subStep('Click add section menu item');
    ProfilePage.profile.addSectionMenuItems(option).click();
  }

  static verifyProfileSection(sectionName: string, buttonName: string) {
    StepLogger.subStep(`Verify ${sectionName} with button ${buttonName} is added`);
    ProfilePage.profile.sectionHeader(sectionName).verifyDisplayedStatus();
    ProfilePage.profile.sectionActionButton(sectionName, buttonName).verifyDisplayedStatus();
  }

  static clickAddSectionDetailsButton(sectionName: string, buttonName: string) {
    ProfilePage.profile.sectionActionButton(sectionName, buttonName).click();
  }

  static verifyAddAwardDialog() {
    StepLogger.subStep('Verify the add award dialog');
    ProfilePage.profile.title.verifyDisplayedStatus();
    ProfilePage.profile.associatedWith.verifyDisplayedStatus();
    ProfilePage.profile.company.verifyDisplayedStatus();
    ProfilePage.profile.startDate.verifyDisplayedStatus();
    ProfilePage.profile.workExDescription.verifyDisplayedStatus();
  }

  static addAwardDetails() {
    StepLogger.subStep('Click Add award details');
    ProfilePage.profile.title.sendKeys('Developer of the year');
    ProfilePage.profile.company.sendKeys('ABCD Company');
    ProfilePage.profile.workExDescription.sendKeys('The developer of the year 2018');
    ProfilePage.profile.saveButton.click();
  }

  static verifyAwardDetails() {
    StepLogger.subVerification('Verify award details');
    ExpectationHelper.verifyTextContains(ProfilePage.profile.awardTitle, 'Developer of the year');
    ExpectationHelper.verifyTextContains(ProfilePage.profile.awardDescription, 'The developer of the year 2018');
  }

  static verifyCertificationDialog() {
    StepLogger.subVerification('Verify the Certification Dialog');
    ProfilePage.profile.title.verifyDisplayedStatus();
    ProfilePage.profile.company.verifyDisplayedStatus();
    ProfilePage.profile.startDate.verifyDisplayedStatus();
    ProfilePage.profile.credentialsId.verifyDisplayedStatus();
    ProfilePage.profile.companyUrl.verifyDisplayedStatus();
    ProfilePage.profile.workExDescription.verifyDisplayedStatus();
    ProfilePage.profile.saveButton.click();
  }

  static addCertificationDetails() {
    StepLogger.subStep('Add certification details');
    ProfilePage.profile.title.sendKeys('Oracle Certified Java Programmer');
    ProfilePage.profile.company.sendKeys('Oracle');
    ProfilePage.profile.startDate.sendKeys('2019-10-10');
    ProfilePage.profile.credentialsId.sendKeys('111111');
    ProfilePage.profile.workExDescription.sendKeys('Java Programming certifications');
    ProfilePage.profile.saveButton.click();
  }

  static verifyCertificationDetailsAdded() {
    StepLogger.subVerification('Verify added Certification details');
    const eNames = ProfilePagesConstants.elementNames;
    ExpectationHelper.verifyTextContains(
      ProfilePage.profile.sectionTitle(eNames.certification),
      'Oracle Certified Java Programmer',
    );
    ExpectationHelper.verifyTextContains(
      ProfilePage.profile.sectionDescription(eNames.certification),
      'Java Programming certifications',
    );
  }

  static verifyAddPatentDialog() {
    StepLogger.subVerification('Verify add patent dialog');
    ProfilePage.profile.title.verifyDisplayedStatus();
    ProfilePage.profile.company.verifyDisplayedStatus();
    ProfilePage.profile.companyUrl.verifyDisplayedStatus();
    ProfilePage.profile.credentialsId.verifyDisplayedStatus();
    ProfilePage.profile.startDate.verifyDisplayedStatus();
    ProfilePage.profile.workExDescription.verifyDisplayedStatus();
  }

  static addPatentDetails() {
    StepLogger.subStep('Add Patent information');
    ProfilePage.profile.title.sendKeys('Patent One');
    ProfilePage.profile.company.sendKeys('Patent Office One');
    ProfilePage.profile.companyUrl.sendKeys('https://google.com');
    ProfilePage.profile.credentialsId.sendKeys('111111');
    ProfilePage.profile.startDate.sendKeys('2019-10-11');
    ProfilePage.profile.workExDescription.sendKeys('This is a sample patent');
    ProfilePage.profile.saveButton.click();
  }

  static verifyAddedPatentDetails() {
    StepLogger.subVerification('Verify added patent details');
    const eNames = ProfilePagesConstants.elementNames;
    ExpectationHelper.verifyTextContains(ProfilePage.profile.sectionTitle(eNames.patent), 'Patent One');
    ExpectationHelper.verifyTextContains(ProfilePage.profile.sectionDescription(eNames.patent), 'This is a sample patent');
  }

  static verifyPublicationDialog() {
    StepLogger.subVerification('Verify Publication Dialog');
    ProfilePage.profile.title.verifyDisplayedStatus();
    ProfilePage.profile.company.verifyDisplayedStatus();
    ProfilePage.profile.companyUrl.verifyDisplayedStatus();
    ProfilePage.profile.startDate.verifyDisplayedStatus();
    ProfilePage.profile.workExDescription.verifyDisplayedStatus();
  }

  static addPublicationDetails() {
    StepLogger.subStep('Add publication details');
    ProfilePage.profile.title.sendKeys('Testing Strategies White Paper');
    ProfilePage.profile.company.sendKeys('Testing Society');
    ProfilePage.profile.companyUrl.sendKeys('https://testing.com');
    ProfilePage.profile.workExDescription.sendKeys('White paper on testing strategies');
    ProfilePage.profile.saveButton.click();
  }

  static verifyAddedPublication() {
    StepLogger.subVerification('Verify added publication details');
    const eNames = ProfilePagesConstants.elementNames;
    ExpectationHelper.verifyTextContains(
      ProfilePage.profile.sectionTitle(eNames.publication),
      'Testing Strategies White Paper',
    );
    ExpectationHelper.verifyTextContains(
      ProfilePage.profile.sectionDescription(eNames.publication),
      'White paper on testing strategies',
    );
  }
}
