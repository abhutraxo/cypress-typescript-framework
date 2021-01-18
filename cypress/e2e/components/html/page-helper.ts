export class PageHelper {
  /**
   * Maximize browser
   */
  public static maximizeBrowser() {
    try {
      cy.viewport(1280, 1024);
    } catch (e) {
      // catch error if window cannot be maximized
    }
  }

  static goToUrl(url: string) {
    cy.visit(url);
  }

  static getIframeDocument(iframeLocator: string) {
    return cy
      .get(iframeLocator)
      .its('0.contentDocument')
      .should('exist');
  }

  static getIframeBody(iframeLocator: string) {
    return this.getIframeDocument(iframeLocator)
      .its('body')
      .should('not.be.undefined')
      .then(cy.wrap);
  }

  public static setIPhoneX() {
    cy.viewport(375, 812);
  }
}
