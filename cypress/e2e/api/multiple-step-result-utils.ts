import { ApiUtils } from './api-utils';

export class MultipleStepResultsUtils {
  static getStepResult(orderId: string, token: string | null, stage: string) {
    const requestUrl =
      `${ApiUtils.salesforceUrlSelect()}${ApiUtils.stepResult}SELECT Id, State__c FROM Application_Step_Result__c ` +
      `WHERE ApplicationId__c = '${orderId}' AND Application_Stage__c = '${stage}'`;
    return cy.request({
      url: requestUrl,
      auth: {
        bearer: `${token}`,
      },
    });
  }
}
