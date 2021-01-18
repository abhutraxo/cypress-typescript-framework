import { CommonUtils } from '../../../common-utils';

import { InputData } from './input-data';
import { InterviewData } from './interview-data';

export class InterviewStepResultSubflowObject {
  inputData: InputData;
  oppData: InterviewData[];

  constructor() {
    this.inputData = new InputData();
    this.oppData = [];
    this.oppData.push(new InterviewData());
    this.oppData[0] = new InterviewData();
  }

  createInterviewStepResultObject(opportunity: string, grader = '0052j000000tJNeAAM') {
    this.oppData[0].iVarT_InterviewerId = grader;
    this.oppData[0].iVarT_ApplicationId = opportunity;
    this.inputData.inputs = this.oppData;

    return CommonUtils.getCleanObject(this.inputData);
  }
}
