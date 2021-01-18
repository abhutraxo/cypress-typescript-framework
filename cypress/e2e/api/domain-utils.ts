import { ApiUtils } from './api-utils';

export class DomainUtils {
  static getDomains() {
    const requestUrl = `${ApiUtils.tempMail}${ApiUtils.domains}`;
    return cy.request({
      url: requestUrl,
      headers: {
        'User-Agent': 'PostmanRuntime/7.26.3',
        'x-rapidapi-host': 'privatix-temp-mail-v1.p.rapidapi.com',
        'x-rapidapi-key': '42cf95c28fmshb7cf1d2d87aecc3p195da0jsn03e7174e9967',
        useQueryString: true,
      },
    });
  }
}
