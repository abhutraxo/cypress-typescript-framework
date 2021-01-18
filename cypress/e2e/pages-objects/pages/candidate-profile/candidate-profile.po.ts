import { $ } from '../../../components/misc-utils/df-elements-helper';

import { CandidateProfileConstant } from './candidate-profile.constants';

const {
  attributes: { classes, formControlName: fNames, ids },
  elementNames: eNames,
} = CandidateProfileConstant;
export class CandidateProfilePage {
  static readonly profile = Object.freeze({
    get editButton() {
      return $(`[class*='${classes.candidateInfo}'] button`, eNames.editButton);
    },

    get editProfileDialog() {
      return $(`div[class*='${classes.editProfile}']`, eNames.editProfile);
    },

    get firstName() {
      return $(`[formcontrolname='${fNames.firstName}']`, eNames.firstName);
    },

    get lastName() {
      return $(`[formcontrolname='${fNames.lastName}']`, eNames.lastName);
    },

    get email() {
      return $(`[formcontrolname='${fNames.email}']`, eNames.email);
    },

    get linkedIn() {
      return $(`[formcontrolname='${fNames.linkedIn}']`, eNames.linkedIn);
    },

    get country() {
      return $(`[formcontrolname='${fNames.country}']`, eNames.country);
    },

    get city() {
      return $(`[formcontrolname='${fNames.city}']`, eNames.city);
    },

    get timezone() {
      return $(`[formcontrolname='${fNames.timezone}']`, eNames.timezone);
    },

    get availability() {
      return $(`[formcontrolname='${fNames.availability}']`, eNames.availability);
    },

    get saveButton() {
      return $(`[class*='${classes.saveButton}']`, eNames.saveButton);
    },

    get phoneNo() {
      return $(`[id='${ids.phone}']`, eNames.phone);
    },

    get invalidPhoneError() {
      return cy.cssContainingText(`[class*='${classes.error}']`, eNames.invalidPhoneNo);
    },

    get uploadButton() {
      return $(`[class*='${classes.uploadButton}'] input`, eNames.uploadButton);
    },

    get resume() {
      return $(`[formcontrolname='${fNames.resume}']`, eNames.resume);
    },

    get avatarInput() {
      return cy.get(`div[class*='${classes.avatarImg}']`).next('input');
    },

    get avatarImage() {
      return $(`div[class*='${classes.avatarImg}'] img`, eNames.avatarImage);
    },

    get candidatePhone() {
      return $(`[class*='${classes.candidatePhone}'] a`, 'phone number');
    },

    get resumeButton() {
      return $(`[class*='${classes.candidateResume}'] button`, 'Resume Button');
    },
  });
}
