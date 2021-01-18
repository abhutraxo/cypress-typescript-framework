import { ApiUtils } from './api-utils';

export class CandidateEmailUtils {
  static getCandidateDetails(email: string, token: string | null) {
    const requestUrl = `${ApiUtils.coreUrl}${ApiUtils.coreApiSelect()}${ApiUtils.candidateExist}?email=${email}`;
    return cy.request({
      url: requestUrl,
      auth: {
        bearer: `${token}`,
      },
    });
  }
}
