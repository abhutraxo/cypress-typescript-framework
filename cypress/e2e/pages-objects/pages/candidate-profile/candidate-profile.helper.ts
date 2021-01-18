import { DateHelper } from '../../../components/misc-utils/date-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { StepLogger } from '../../../core/step-logger';

import { CandidateProfilePage } from './candidate-profile.po';

export class CandidateProfileHelper {
  static clickEditProfileLink() {
    StepLogger.subStep('Click on Edit link for profile');
    CandidateProfilePage.profile.editButton.click();
  }

  static verifyEditProfileDialogOpen() {
    StepLogger.subVerification('Verify the Edit profile Dialog open');
    CandidateProfilePage.profile.editProfileDialog.verifyDisplayedStatus();
  }

  static verifyEditProfileDialogDetails() {
    StepLogger.subVerification('Verify Edit Profile Dialog');
    CandidateProfilePage.profile.firstName.verifyDisplayedStatus();
    CandidateProfilePage.profile.lastName.verifyDisplayedStatus();
    CandidateProfilePage.profile.email.verifyDisplayedStatus();
    CandidateProfilePage.profile.linkedIn.verifyDisplayedStatus();
    CandidateProfilePage.profile.timezone.verifyDisplayedStatus();
    CandidateProfilePage.profile.country.verifyDisplayedStatus();
    CandidateProfilePage.profile.city.verifyDisplayedStatus();
    CandidateProfilePage.profile.availability.verifyDisplayedStatus();
    CandidateProfilePage.profile.firstName.verifyDisabledStatus();
    CandidateProfilePage.profile.lastName.verifyDisabledStatus();
    CandidateProfilePage.profile.email.verifyDisabledStatus();
    CandidateProfilePage.profile.linkedIn.verifyDisabledStatus();
    CandidateProfilePage.profile.saveButton.verifyDisplayedStatus();
  }

  static verifyCandidateBasicInformation(user: any) {
    StepLogger.subStep('Verify Candidate Basic information');
    ExpectationHelper.verifyAttributeValue(CandidateProfilePage.profile.firstName, user.firstName);
    ExpectationHelper.verifyAttributeValue(CandidateProfilePage.profile.lastName, user.lastName);
    ExpectationHelper.verifyAttributeValue(CandidateProfilePage.profile.email, user.username);
    ExpectationHelper.verifyAttributeValue(CandidateProfilePage.profile.linkedIn, user.linkedIn);
  }

  static getPhoneNumber() {
    StepLogger.subStep('Get Current Phone number');
    CandidateProfilePage.profile.phoneNo.vItem.invoke('val').then((currentValue: any) => {
      cy.restoreLocalStorage();
      let currentPhoneNo = String(currentValue);
      currentPhoneNo = currentPhoneNo.replace(/[^0-9a-zA-Z]/g, '');
      cy.setLocalStorage('lastPhoneNo', currentPhoneNo);
      StepLogger.subStep(`Last phone number is: ${currentPhoneNo}`);
      cy.saveLocalStorage();
    });
  }

  static enterPhoneNumber(phoneNo: string) {
    StepLogger.subStep('Enter the phone number');
    CandidateProfilePage.profile.phoneNo.sendKeys(phoneNo);
  }

  static verifyInvalidPhoneNoErrorMsg() {
    StepLogger.subStep('Verify Invalid Phone Number Error');
    ExpectationHelper.verifyDisplayedStatus(CandidateProfilePage.profile.invalidPhoneError);
  }

  static enterCity(cityName: string) {
    StepLogger.subStep('Enter the City Name');
    CandidateProfilePage.profile.city.sendKeys(cityName);
  }

  static verifyCityEntered(cityName: string) {
    StepLogger.subVerification('Verify CityName entered');
    ExpectationHelper.verifyAttributeValue(CandidateProfilePage.profile.city, cityName);
  }

  static updateThePhoneNumber() {
    cy.getLocalStorage('lastPhoneNo').then(oldPhone => {
      if (oldPhone?.includes('2024777722')) {
        this.enterPhoneNumber('2024777733');
        cy.setLocalStorage('lastPhoneNo', '2024777733');
      } else {
        this.enterPhoneNumber('2024777722');
        cy.setLocalStorage('lastPhoneNo', '2024777722');
      }
    });
  }

  static updateResumeFile() {
    const resumeTxt = `This resume file is update on ${DateHelper.getTodayFormattedDateWithTime()}`;
    cy.writeFile('cypress/fixtures/resume.txt', resumeTxt);
    return resumeTxt;
  }

  static uploadResume() {
    StepLogger.subStep('Upload the resume file');
    CandidateProfilePage.profile.uploadButton.vItem.attachFile('resume.txt');
  }

  static verifyResumeFileIsAttached() {
    StepLogger.subStep('Verify Resume file is attached');
    ExpectationHelper.verifyAttributeValue(CandidateProfilePage.profile.resume, 'resume.txt');
  }

  static updateAvatarImage() {
    StepLogger.subStep('Update the Avatar Image');
    CandidateProfilePage.profile.avatarImage.vItem.then(($image: JQuery<HTMLElement>) => {
      if ($image.attr('src')?.includes('avatar-1.jpg')) {
        CandidateProfilePage.profile.avatarInput.attachFile('avatar-2.jpg');
        cy.setLocalStorage('latestAvatarImage', 'avatar-2.jpg');
      } else {
        CandidateProfilePage.profile.avatarInput.attachFile('avatar-1.jpg');
        cy.setLocalStorage('latestAvatarImage', 'avatar-1.jpg');
      }
      cy.saveLocalStorage();
    });
  }

  static clickSaveButton() {
    StepLogger.subStep('Click Save Button');
    CandidateProfilePage.profile.saveButton.click();
  }

  static verifyEditProfileCloses() {
    StepLogger.subVerification('Verify Edit Profile Dialog closes');
    CandidateProfilePage.profile.editProfileDialog.vItem.should('not.exist');
  }

  static verifyAvatarImage() {
    StepLogger.subVerification('Verify Update Avatar Image on profile home');

    CandidateProfilePage.profile.avatarImage.vItem.then(($image: JQuery<HTMLElement>) => {
      cy.getLocalStorage('latestAvatarImage').then(avatar => {
        expect($image.attr('src')).to.include(avatar);
      });
    });
  }

  static verifyCandidatePhoneNumber() {
    cy.getLocalStorage('lastPhoneNo').then(phone => {
      StepLogger.subVerification(`Verify the phone number updated to ${phone}`);
      CandidateProfilePage.profile.candidatePhone.vItem.then((updatedNo: JQuery<HTMLElement>) => {
        let num = updatedNo.text();
        num = num.replace(/[^0-9a-zA-Z]/g, '');
        expect(num).to.include(phone);
      });
    });
  }

  static clickResumeButton() {
    StepLogger.subStep('Click Resume button');
    CandidateProfilePage.profile.resumeButton.click();
  }

  static readResumeFile(fileName: string, updatedResumeTxt: string) {
    const downloadPath = 'cypress/e2e/resources/';
    cy.readFile(`${downloadPath}${fileName}`).then(resumeTxt => {
      expect(resumeTxt).to.equal(updatedResumeTxt);
    });
  }
}
