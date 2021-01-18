import { AssessmentResult } from './assessment-data';

export class CcatData {
  assessmentResult: AssessmentResult;

  constructor() {
    this.assessmentResult = new AssessmentResult();
  }
}
