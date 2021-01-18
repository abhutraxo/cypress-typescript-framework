import { ApiUtils } from './api-utils';
import { CandidateEmailUtils } from './candidate-email-utils';
import { InterviewStepResultSubflowObject } from './models/schedule-interview-subflow/request/schedule-interview-subflow-object';
import { OpportunityUtils } from './opportunity-utils';

export class CreateInterviewStepResultsSubFlowUtils {
  /**
   * Create Step Result for interview stage
   */

  static createStepResult(email: string, grader = '0052j000000tJNeAAM') {
    cy.getLocalStorage('loginToken').then(token => {
      CandidateEmailUtils.getCandidateDetails(email, token).then(account => {
        OpportunityUtils.getOpportunity(account.body.records[0].Id, token).then(opportunity => {
          const requestUrl = `${ApiUtils.salesforceUrlSelect()}${ApiUtils.createInterviewStepResultSubFlow}`;
          const stepObj = new InterviewStepResultSubflowObject();
          const obj = stepObj.createInterviewStepResultObject(opportunity.body.records[0].Id, grader);
          cy.request({
            url: requestUrl,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: obj,
            auth: {
              bearer: token,
            },
          });
        });
      });
    });
  }
}
