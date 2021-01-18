import { ApiUtils } from './api-utils';
import { ApplicationStepResultsUtils } from './applicationstepresult-utils';
import { CandidateEmailUtils } from './candidate-email-utils';
import { LoginUtils } from './login-utils';
import { OpportunityUtils } from './opportunity-utils';

export class GetUrlUtils {
  static getUrl(email: string) {
    LoginUtils.getLogin();
    cy.getLocalStorage('loginToken').then(token => {
      CandidateEmailUtils.getCandidateDetails(email, token).then(order => {
        OpportunityUtils.getOpportunity(order.body.records[0].Id, token).then(opportunity => {
          ApplicationStepResultsUtils.getASRForOpportunity(opportunity.body.records[0].Id, token).then(asr => {
            const requestUrl = `${ApiUtils.coreUrl}${ApiUtils.coreApiSelect()}/assessment-results/${
              asr.body.records[0].Id
            }/get-url`;
            cy.request({
              method: 'POST',
              url: requestUrl,
              body: {
                Fingerprint_Start_Hash: 'jVHjPqXwMLod1EKl2eNp',
                GA_Client_Start_ID: '1947696151.1600940454',
                Step_Start_IP: '49.36.35.12',
              },
              headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              auth: {
                bearer: token,
              },
            }).then(ccatUrl => {
              const urlToVisit = ccatUrl.body.assessmentSessionUrl;
              cy.setLocalStorage('cognitiveUrl', urlToVisit);
              cy.saveLocalStorage();
            });
          });
        });
      });
    });
  }
}
