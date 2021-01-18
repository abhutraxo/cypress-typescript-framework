export class ApiUtils {
  static coreUrl = 'https://lr58e2fcx7.execute-api.us-east-1.amazonaws.com/';
  static tempMail = 'https://privatix-temp-mail-v1.p.rapidapi.com/request/';
  static apiVersion = 'v48.0';

  /** Login */
  static login = '/login';

  /** Candidate email */
  static candidateExist = '/candidate-email';

  /** Step Result */
  static stepResult = `data/${ApiUtils.apiVersion}/query?q=`;

  /** Get Case URL */
  static getCase = `data/${ApiUtils.apiVersion}/sobjects/Case/`;

  /** Survey Monkey */
  static getSurveyMonkey = `data/${ApiUtils.apiVersion}/sobjects/SurveyMonkeyApp__Response__c/`;

  /** Get application step results */
  static applicationStepResults = `data/${ApiUtils.apiVersion}/sobjects/Application_Step_Result__c/`;

  /** Get opportunity */
  static getOpportunity = `data/${ApiUtils.apiVersion}/sobjects/Opportunity/`;

  /** Get candidate*/
  static getCandidate = `data/${ApiUtils.apiVersion}/sobjects/Account/`;

  /** Candidate */
  static candidate = '/candidate';

  /**Add step results */
  static addStepResult = `data/${ApiUtils.apiVersion}/sobjects/application_step_result__c/`;

  /** Ccat URL */
  static ccatUrl = 'CCAT/a0/Application_Step_Result__c/';

  /** Get Domains */
  static domains = 'domains/';

  /** Get Emails */
  static emails = 'mail/id/';

  /** Review Approval */
  static approveCandidate = `data/${ApiUtils.apiVersion}/actions/custom/apex/ApproveOpportunitiesAction`;

  static createInterviewStepResultSubFlow = `data/${ApiUtils.apiVersion}/actions/custom/flow/CreateInterviewStepResult_subflow`;

  static coreApiSelect() {
    const base = Cypress.env('server_instance');
    if (base?.includes('stage')) {
      return 'Staging';
    } else if (base?.includes('sand')) {
      return 'Sandbox';
    } else {
      return 'Prod';
    }
  }

  static salesforceUrlSelect(): string {
    const base = Cypress.env('server_instance');
    if (base?.includes('stage')) {
      return 'https://crossover--staging.my.salesforce.com/services/';
    } else if (base?.includes('sand')) {
      return 'https://crossover--fullshared.my.salesforce.com/services/';
    }
    return 'https://crossover.my.salesforce.com/services/';
  }
}
