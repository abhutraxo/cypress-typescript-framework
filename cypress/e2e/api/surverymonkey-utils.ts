import { ApiUtils } from './api-utils';

export class SurveyMonkeyResultsUtils {
  static getSurveyMonkeyData(orderId: string, token: string | null) {
    const requestUrl = `${ApiUtils.salesforceUrlSelect()}${
      ApiUtils.stepResult
    }SELECT Id FROM SurveyMonkeyApp__Response__c WHERE Application_Step_Result__c ='${orderId}'`;

    return cy.request({
      url: requestUrl,
      auth: {
        bearer: token,
      },
    });
  }
}
