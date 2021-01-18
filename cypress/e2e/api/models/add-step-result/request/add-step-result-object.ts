import { CommonUtils } from '../../../common-utils';

import { AddStepResultsData } from './add-step-result-data';

export class AddStepResultObject {
  stepResultModel: AddStepResultsData;

  constructor() {
    this.stepResultModel = new AddStepResultsData();
  }

  createStepResultData(rawScore: number) {
    this.stepResultModel.Score__c = rawScore;

    return CommonUtils.getCleanObject(this.stepResultModel);
  }
}
