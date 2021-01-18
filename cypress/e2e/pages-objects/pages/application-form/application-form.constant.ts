export class ApplicationFormConstant {
  static readonly attribute = Object.freeze({
    classes: {
      applyForm: 'apply-form',
      submitButton: 'apply-button',
      dropDownArrow: 'iti-arrow',
      userProfileName: 'user-name',
      alertTitle: 'mat-dialog-title',
      button: 'mat-button',
      pipelineContent: 'pipelines-content',
      cancelButton: 'cancel-button',
    },
    formControlName: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      linkedIn: 'website',
      country: 'country',
      oneAccount: 'oneAccountConfirmation',
      emailOptIn: 'emailOptIn',
    },
    ids: {
      phone: 'phone',
      countrySearchBox: 'country-search-box',
    },
  });

  static readonly elementsNames = Object.freeze({
    applyForm: 'Application Form',
    submitButton: 'Submit Button',
    invalidEmail: 'Invalid email',
    linkedInError: 'LinkedIn is required',
    pleaseSelect: '— Please Select —',
    dropDownArrow: 'Country drop down arrow',
    countrySearchBox: 'Country Search Box',
    certify: 'You must certify that the data you have provided is accurate in order to Apply',
    welcomeMsg: 'Welcome to your new Crossover Profile!',
    activeApplication: 'You already have an application',
    gotoMyApp: 'Go to my active application',
    cannotApply: 'Cannot apply to this position',
    cancel: 'Cancel',
    ok: 'OK',
    pipelineContent: 'Pipeline Content',
  });
}
