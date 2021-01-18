export class BadgesConstants {
  static readonly attribute = Object.freeze({
    classes: {
      roleCol: 'role-column',
      progressCol: 'progress-column',
      desktopView: 'mobile-none',
      badgeActive: 'white',
      badgeNonActive: 'gray',
      tooltipComponent: 'mat-tooltip-component',
      tooltip: 'mat-tooltip',
      notificationCloseButton: 'close-button',
      badgeSuccess: 'green',
      successNotification: 'snackbar-profile-success',
      realWorkCol: 'real-work-column',
      badgeRetry: 'yellow',
    },
  });

  static readonly elementNames = Object.freeze({
    jobApp: 'Job Application',
    appBadges: 'App Badges',
    cognitiveAptitude: 'Cognitive Aptitude',
    englishProficiency: 'Spoken English Proficiency',
    readingTest: 'Reading & Understanding',
    realWorkTest: 'Developing Angular Material',
    notificationCloseButton: 'Notification close button',
    successMessage: 'Congratulation!',
    _4starEnglishSuccess: "Congratulations! You've earned the ★★★★ Spoken English Proficiency badge",
    _3StarSMQ: "Congratulations! You've earned the ★★ Reading & Understanding Code badge",
    cognitiveAptitudeOrder: '1',
    englishProficiencyOrder: '2',
    readingTestOrder: '3',
    implementingDesign: 'Implementing Design',
    platformIntegrationTest: 'Platform Integration',
  });
}
