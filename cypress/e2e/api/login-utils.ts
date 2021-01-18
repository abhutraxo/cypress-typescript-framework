/// <reference types="cypress-localstorage-commands" />

export class LoginUtils {
  static getLogin() {
    const base = Cypress.env('server_instance');
    let uRL = 'https://test.salesforce.com/services/oauth2/token';
    if (base?.includes('prod')) {
      uRL = 'https://login.salesforce.com/services/oauth2/token';
    }
    cy.request({
      method: 'POST',
      url: uRL,
      form: true,
      body: {
        grant_type: 'password',
        client_id: Cypress.env('SALESFORCE_CLIENT_ID'),
        client_secret: Cypress.env('SALESFORCE_CLIENT_SECRET'),
        username: Cypress.env('SALESFORCE_USERNAME'),
        password: Cypress.env('SALESFORCE_PASSWORD') + Cypress.env('SALESFORCE_SECURITY_KEY'),
      },
    }).then(response => {
      cy.setLocalStorage('loginToken', response.body.access_token);
      cy.saveLocalStorage();
    });
  }
}
