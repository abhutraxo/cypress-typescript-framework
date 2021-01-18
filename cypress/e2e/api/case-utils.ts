import { ApiUtils } from './api-utils';

export class CaseUtils {
  static getCaseData(orderId: string, token: string | null) {
    const requestUrl = `${ApiUtils.salesforceUrlSelect()}${ApiUtils.stepResult}
    SELECT Description, Id FROM Case where AccountId ='${orderId}'`;
    return cy.request({
      url: requestUrl,
      auth: {
        bearer: `${token}`,
      },
    });
  }
}
