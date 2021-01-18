import { ApiUtils } from './api-utils';

export class StepResultsByStateUtils {
  static getStepResult(orderId: string, token: string | null, stage: string, state: string) {
    const requestUrl =
      `${ApiUtils.salesforceUrlSelect()}${ApiUtils.stepResult}SELECT Id FROM Application_Step_Result__c ` +
      `WHERE ApplicationId__c = '${orderId}' AND Application_Stage__c = '${stage}' AND State__c = '${state}'`;
    return cy.request({
      url: requestUrl,
      auth: {
        bearer: `${token}`,
      },
    });
  }
}
