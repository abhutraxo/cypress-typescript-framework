import { ApiUtils } from './api-utils';

export class OpportunityUtils {
  static getOpportunity(orderId: string, token: string | null) {
    const requestUrl = `${ApiUtils.salesforceUrlSelect()}${ApiUtils.stepResult}
    SELECT Id FROM Opportunity where AccountId = '${orderId}' ORDER BY CreatedDate DESC`;
    return cy.request({
      method: 'GET',
      url: requestUrl,
      auth: {
        bearer: `${token}`,
      },
    });
  }
}
