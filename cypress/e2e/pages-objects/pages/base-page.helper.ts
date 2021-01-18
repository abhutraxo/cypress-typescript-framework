import { PageContract } from '../contracts/page.contract';

export abstract class BasePageHelper implements PageContract {
  abstract url(): string;

  goTo() {
    return this.get(this.url());
  }

  get(url: string) {
    return cy.visit(url);
  }

  verifyExistence() {
    const currentUrl = cy.url();
    return currentUrl.toString().indexOf(this.url()) > -1;
  }
}
