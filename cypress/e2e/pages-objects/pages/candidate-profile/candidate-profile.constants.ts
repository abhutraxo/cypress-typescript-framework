export class CandidateProfileConstant {
  static readonly attributes = Object.freeze({
    classes: {
      candidateInfo: 'candidate-info-header',
      button: 'mat-button',
      editProfile: 'edit-profile',
      saveButton: 'save-btn',
      error: 'mat-error',
      uploadButton: 'upload-button',
      avatarImg: 'avatar-image',
      candidatePhone: 'candidate-phone',
      candidateResume: 'candidate-resume',
    },
    formControlName: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      linkedIn: 'website',
      country: 'country',
      city: 'city',
      resume: 'resume',
      timezone: 'timeZone',
      availability: 'availability',
    },
    ids: {
      phone: 'phone',
    },
  });

  static readonly elementNames = Object.freeze({
    editButton: 'Edit',
    editProfile: 'Edit Profile',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    linkedIn: 'LinkedIn',
    country: 'Country',
    city: 'City',
    resume: 'Resume',
    timezone: 'TimeZone',
    availability: 'Availability',
    saveButton: 'Save',
    phone: 'Phone number',
    invalidPhoneNo: 'Invalid Phone Number',
    uploadButton: 'Upload Button',
    avatarImage: 'Avatar Image',
  });
}
