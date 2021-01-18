import { ApiUtils } from './api-utils';

export class CandidateDetailsUtils {
  static getCandidateDetails(orderId: string, token: string | null) {
    const requestUrl = `${ApiUtils.coreUrl}${ApiUtils.coreApiSelect()}${ApiUtils.candidate}?Id=${orderId}`;
    return cy.request({
      url: requestUrl,
      auth: {
        bearer: `${token}`,
      },
    });
  }
}
