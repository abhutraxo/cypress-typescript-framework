export class AssessmentResult {
  rawScore: number;
  submissionDate: string;
  eventId: string;
  orderId: string;
  testId: string;

  constructor() {
    this.eventId = '';
    this.orderId = '';
    this.testId = '';
    this.rawScore = 0;
    this.submissionDate = '';
  }
}
