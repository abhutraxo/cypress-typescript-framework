export class StepLogger {
  static stepIdVar = '';
  static id: number;
  static testCaseId: number;
  static logMessages = '';

  static set caseId(theCaseId: number) {
    this.testCaseId = theCaseId;
    this.id = 1;
    this.logMessages = '';
  }

  static step(stepName: string) {
    let operation = 'Pre-Condition';
    if (this.testCaseId) {
      operation = 'Step';
    }
    this.commonLogger(operation, stepName);
  }

  static stepId(optionalId = 0) {
    this.id = optionalId > 0 ? optionalId : this.id + 1;
    this.commonLogger('Step Id', this.id.toString());
  }

  static commonLogger(operation: string, step: string) {
    if (operation.includes('Step Id')) {
      cy.task('log', '--------------------------------------------------------------');
    }
    const message = `${this.stepIdVar}- ${operation} - ${step}`;
    cy.task('log', `${this.testCaseId || ''}${message}`);
  }

  static verification(verificationDescription: string) {
    this.commonLogger('Verification', verificationDescription);
  }

  /**
   * Called for any precondition related step-log shown towards Spec file, never used anywhere else such as validation/helper
   * @param {string} preConditionDescription
   */
  static preCondition(preConditionDescription: string) {
    this.commonLogger('Pre-Condition', preConditionDescription);
  }

  /**
   * Called for any postCondition related step-log shown towards Spec file
   * @param postConditionDescription
   */
  static postCondition(postConditionDescription: string) {
    this.commonLogger('Post-Condition', postConditionDescription);
  }

  /**
   * Called wherever a helper/validation method need to have a step/action step significant enough to log
   * @param {string} stepName
   */
  static subStep(stepName: string) {
    this.commonLogger('Sub-Step', stepName);
  }

  /**
   * Called wherever a helper/validation method need to have a verification step significant enough to log
   * @param {string} verificationDescription
   */
  static subVerification(verificationDescription: string) {
    this.commonLogger('Sub-Verification', verificationDescription);
  }
}
