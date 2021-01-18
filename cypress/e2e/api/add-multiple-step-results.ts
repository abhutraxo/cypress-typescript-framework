import { StepLogger } from '../core/step-logger';

import { ApiUtils } from './api-utils';
import { CandidateEmailUtils } from './candidate-email-utils';
import { LoginUtils } from './login-utils';
import { CcatObject } from './models/ccat/request/ccat-object';
import { MultipleStepResultsUtils } from './multiple-step-result-utils';
import { OpportunityUtils } from './opportunity-utils';

export class AddMultipleStepResults {
  static createStepResults(email: string, rawScore: number, stage: string) {
    LoginUtils.getLogin();
    cy.restoreLocalStorage();
    cy.getLocalStorage('loginToken').then(token => {
      CandidateEmailUtils.getCandidateDetails(email, token).then(account => {
        OpportunityUtils.getOpportunity(account.body.records[0].Id, token).then(opportunity => {
          MultipleStepResultsUtils.getStepResult(opportunity.body.records[0].Id, token, stage).then(stepResult => {
            const submissionDate = CcatObject.getFormattedDate();
            const resultDate = CcatObject.getFormattedDateTime();
            StepLogger.subStep(`Result Time: ${resultDate}`);
            StepLogger.subStep(`Submission Time: ${submissionDate}`);

            for (let i = 0; i < stepResult.body.totalSize; i++) {
              if (stage !== 'CCAT') {
                const requestUrl = `${ApiUtils.salesforceUrlSelect()}${ApiUtils.addStepResult}${
                  stepResult.body.records[i].Id
                }`;
                cy.request({
                  method: 'PATCH',
                  url: requestUrl,
                  headers: {
                    'content-type': 'application/json',
                  },
                  body: {
                    Raw_Score__c: '1',
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
              } else {
                const eventId = 'CRO9945YGDE';
                const ccatRequestUrl = `${ApiUtils.salesforceUrlSelect()}apexrest/${ApiUtils.ccatUrl}${
                  stepResult.body.records[i].Id
                }`;
                cy.request({
                  method: 'PATCH',
                  headers: {
                    'content-type': 'application/json',
                  },
                  url: ccatRequestUrl,
                  body: {
                    assessmentResult: {
                      rawScore: rawScore,
                      submissionDate: submissionDate,
                      eventId: eventId,
                      orderId: account.body.records[0].Id,
                      testId: 'CCAT',
                    },
                  },
                  auth: {
                    bearer: `${token}`,
                  },
                }).then(response => {
                  StepLogger.subStep(`Step Result added for : ${response.status}`);
                });
              }
            }
          });
        });
      });
    });
  }
}
