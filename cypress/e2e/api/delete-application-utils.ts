import { StepLogger } from '../core/step-logger';

import { ApiUtils } from './api-utils';
import { ApplicationStepResultsUtils } from './applicationstepresult-utils';
import { CandidateEmailUtils } from './candidate-email-utils';
import { OpportunityUtils } from './opportunity-utils';
import { SurveyMonkeyResultsUtils } from './surverymonkey-utils';

export class DeleteApplicationUtils {
  static deleteApplicationResults(email: string) {
    StepLogger.step(`Delete all the ASR for ${email}`);
    cy.getLocalStorage('loginToken').then(token => {
      CandidateEmailUtils.getCandidateDetails(email, token).then(account => {
        OpportunityUtils.getOpportunity(account.body.records[0].Id, token).then(opportunity => {
          for (let i = 0; i < opportunity.body.totalSize; i++) {
            ApplicationStepResultsUtils.getASRForOpportunity(opportunity.body.records[i].Id, token).then(asr => {
              for (let j = 0; j < asr.body.totalSize; j++) {
                SurveyMonkeyResultsUtils.getSurveyMonkeyData(asr.body.records[j].Id, token).then(smResults => {
                  for (let k = 0; k < smResults.body.totalSize; k++) {
                    const smRequestUrl = `${ApiUtils.salesforceUrlSelect()}${ApiUtils.getSurveyMonkey}${
                      smResults.body.records[k].Id
                    }`;
                    cy.request({
                      method: 'DELETE',
                      url: smRequestUrl,
                      auth: {
                        bearer: token,
                      },
                    });
                  }
                });

                const requestUrl = `${ApiUtils.salesforceUrlSelect()}${ApiUtils.applicationStepResults}${
                  asr.body.records[j].Id
                }`;
                cy.request({
                  method: 'DELETE',
                  url: requestUrl,
                  auth: {
                    bearer: token,
                  },
                });
              }
            });
          }
        });
      });
    });
  }
}
