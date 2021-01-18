export class CodeSignalConstant {
  static readonly attributes = Object.freeze({
    classes: {
      termsCheckBox: 'check-box',
      button: 'button',
      signInForm: 'signin-view',
      introScreen: 'screen-intro',
      introScreenButton: 'screen-intro--button',
      viewTaskButton: 'type-success',
      testView: 'task-view',
      testBody: 'page--body',
      finishTestButton: 'type-danger',
      questionOptions: 'quiz-task-options--option',
      alertButton: 'type-primary',
      star4: 'star-4',
      password: 'password',
    },
  });

  static readonly elementNames = Object.freeze({
    signUp: 'Sign up to take the test',
    quickSignUp: 'Quick sign up',
    nextButton: 'Next',
    submit: 'Submit',
    finishTheTest: 'Finish the Test',
    backToTasks: 'Back to tasks',
    viewTask: 'View task',
    submitFeedBack: 'Submit feedback',
    testComplete: "complete. You're all done!",
    signIn: 'Sign in',
  });
}
