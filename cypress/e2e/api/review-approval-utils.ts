import { StepLogger } from '../core/step-logger';

import { ApiUtils } from './api-utils';
import { CandidateEmailUtils } from './candidate-email-utils';
import { LoginUtils } from './login-utils';
import { OpportunityUtils } from './opportunity-utils';

export class ReviewApprovalUtils {
  /**
   * Approve Candidate in review Stage
   */

  static approveCandidate(email: string) {
    LoginUtils.getLogin();
    cy.getLocalStorage('loginToken').then(token => {
      CandidateEmailUtils.getCandidateDetails(email, token).then(account => {
        OpportunityUtils.getOpportunity(account.body.records[0].Id, token).then(opportunity => {
          const stepObj = `{ \"inputs\": [ { \"opportunityIds\" : \"${opportunity.body.records[0].Id}\" } ] }`;
          const requestUrl = `${ApiUtils.salesforceUrlSelect()}${ApiUtils.approveCandidate}`;
          cy.request({
            method: 'POST',
            url: requestUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            body: stepObj,
            auth: {
              bearer: token,
            },
          }).then(resp => {
            StepLogger.subStep(`Candidate Approved: ${resp.status}`);
          });
        });
      });
    });
  }
}
