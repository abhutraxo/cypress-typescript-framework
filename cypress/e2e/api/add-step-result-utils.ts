import { StepLogger } from '../core/step-logger';

import { ApiUtils } from './api-utils';
import { CandidateEmailUtils } from './candidate-email-utils';
import { LoginUtils } from './login-utils';
import { CcatObject } from './models/ccat/request/ccat-object';
import { OpportunityUtils } from './opportunity-utils';
import { StepResultsByStateUtils } from './step-result-by-state-utils';

export class AddStepResults {
  static createStepResults(email: string, rawScore: number, stage: string, state: string, actualScore = 1) {
    LoginUtils.getLogin();
    cy.restoreLocalStorage();
    cy.getLocalStorage('loginToken').then(token => {
      CandidateEmailUtils.getCandidateDetails(email, token).then(account => {
        OpportunityUtils.getOpportunity(account.body.records[0].Id, token).then(opportunity => {
          StepResultsByStateUtils.getStepResult(opportunity.body.records[0].Id, token, stage, state).then(stepResult => {
            const submissionDate = CcatObject.getFormattedDate();
            const resultDate = CcatObject.getFormattedDateTime();
            StepLogger.subStep(`Result Time: ${resultDate}`);
            StepLogger.subStep(`Submission Time: ${submissionDate}`);
            const requestUrl = `${ApiUtils.salesforceUrlSelect()}${ApiUtils.addStepResult}${stepResult.body.records[0].Id}`;
            cy.request({
              method: 'PATCH',
              url: requestUrl,
              headers: {
                'content-type': 'application/json',
              },
              body: {
                Raw_Score__c: actualScore,
                Score__c: rawScore,
                Result_Time__c: resultDate,
                Submission_Time__c: resultDate,
              },
              auth: {
                bearer: `${token}`,
              },
            }).then(response => {
              StepLogger.subStep(`Step Result added for : ${response.status}`);
            });
          });
        });
      });
    });
  }
}
