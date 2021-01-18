export class ApplicationStatusConstants {
  static readonly attributes = Object.freeze({
    classes: {
      applicationRow: 'expandable-row',
      statusColum: 'status-column',
      statusInfoIcon: 'status-info-icon',
      tooltipComponent: 'mat-tooltip-component',
      tooltip: 'mat-tooltip',
      terminalStatus: 'terminal-state-status',
      contactUsAppTab: 'headline-side',
      takingTestHeader: 'taking-test-message',
      contactUsLink: 'anchor-link',
      startButton: 'start-button',
      supportHeading: 'header__content',
      error: 'mat-error',
      successNotification: 'snackbar-profile-success',
      actionButton: 'action-button',
    },
    formControlName: {
      message: 'message',
    },
  });

  static readonly elementNames = Object.freeze({
    jobApplication: 'Job Applications',
    uxLead: 'UX Design Lead',
    testPositionProdProfile: 'Test Position Production Profile',
    testPositionProdProfileOne: 'Test Position Production Profile One',
    testPositionStageProfile: 'Test Position Staging Profile',
    testPositionStageProfileOne: 'Test Position Staging Profile One',
    notSelected: 'Not Selected',
    review: 'Review',
    canceled: 'Canceled',
    interview: 'Interview',
    expiredTesting: 'Expired (Testing)',
    reviewMessage: 'Your application is being reviewed.',
    expiredMessage: 'Your application has expired',
    canceledForPositionClosed:
      'Your application has been automatically canceled because this position is no longer accepting applications.',
    notSelectedMessage:
      'Unfortunately, following the interviews, the hiring manager has decided not to hire you for this position.',
    contactUsAppTab: 'Need help? Contact Us!',
    bfqHeader: 'You are taking the Basic Fit assessment, expected to take 20 minutes. Good Luck! Having trouble?',
    contactUs: 'Contact us!',
    supportHeading: "Hello! I'm here to help",
    submitYourQues: 'Submit your question',
    messageError: 'Your message is required',
    messageSent: 'Your message has been sent!',
    scheduleInterview: 'SCHEDULE INTERVIEW',
  });
}
