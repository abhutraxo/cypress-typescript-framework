import { ApiUtils } from './api-utils';

export class ApplicationStepResultsUtils {
  static getASRForOpportunity(opportunity: string, token: string | null) {
    const requestUrl = `${ApiUtils.salesforceUrlSelect()}${ApiUtils.stepResult}
    SELECT Id FROM Application_Step_Result__c WHERE ApplicationId__c ='${opportunity}' ORDER BY CreatedDate DESC`;

    return cy.request({
      url: requestUrl,
      auth: {
        bearer: token,
      },
    });
  }
}
