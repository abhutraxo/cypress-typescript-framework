import { StepLogger } from '../core/step-logger';

import { ApiUtils } from './api-utils';
import { CandidateEmailUtils } from './candidate-email-utils';
import { CaseUtils } from './case-utils';
import { DeleteApplicationUtils } from './delete-application-utils';
import { LoginUtils } from './login-utils';
import { OpportunityUtils } from './opportunity-utils';

export class DeleteOpportunityUtils {
  static deleteOpportunity(email: string) {
    StepLogger.step(`Delete the Opportunity: ${email}`);
    LoginUtils.getLogin();
    cy.saveLocalStorage();
    cy.restoreLocalStorage();
    cy.getLocalStorage('loginToken').then(token => {
      CandidateEmailUtils.getCandidateDetails(email, token).then(account => {
        OpportunityUtils.getOpportunity(account.body.records[0].Id, token).then(opportunity => {
          CaseUtils.getCaseData(`${account.body.records[0].Id}`, token).then(cases => {
            for (let i = 0; i < cases.body.totalSize; i++) {
              const caseReqUrl = `${ApiUtils.salesforceUrlSelect()}${ApiUtils.getCase}${cases.body.records[i].Id}`;
              cy.request({
                method: 'DELETE',
                url: caseReqUrl,
                auth: {
                  bearer: token,
                },
              });
            }
          });

          DeleteApplicationUtils.deleteApplicationResults(email);

          for (let j = 0; j < opportunity.body.totalSize; j++) {
            const requestUrl = `${ApiUtils.salesforceUrlSelect()}${ApiUtils.getOpportunity}${
              opportunity.body.records[j].Id
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
      });
    });
  }
}
