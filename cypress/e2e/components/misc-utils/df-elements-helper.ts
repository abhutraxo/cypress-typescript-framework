import 'cypress-xpath';

export class DfElement {
  readonly vItem: any;

  constructor(locator: string, public name: string, xpathValue = false) {
    if (xpathValue === true) {
      this.vItem = cy.xpath(locator);
    } else {
      this.vItem = cy.get(locator);
    }
  }

  click() {
    this.vItem.click();
  }

  verifyDisplayedStatus() {
    this.vItem.should('be.visible');
  }

  sendKeys(text: string) {
    this.vItem.clear();
    this.vItem.type(text);
  }

  typeSlowly(text: string, delays = 100) {
    this.vItem.clear();
    this.vItem.type(text, { delay: delays });
  }

  verifyDisabledStatus() {
    this.vItem.should('be.disabled');
  }

  verifyEnabledStatus() {
    this.vItem.should('be.enabled');
  }

  verifyCheckedStatus() {
    this.vItem.should('be.checked');
  }

  verifyUncheckedStatus() {
    this.vItem.should('not.be.checked');
  }

  selectCheckBox() {
    this.vItem.check();
  }

  getText() {
    return this.vItem.then((ele: any) => {
      ele.text();
    });
  }

  verifyHiddenStatus() {
    this.vItem.should('be.not.visible');
  }

  verifyElementPresent() {
    this.vItem.should('exist');
  }
}

export function $(locator: string, name: string, xpath = false) {
  return new DfElement(locator, name, xpath);
}

export function $$(locator: string, name: string, xpath = true) {
  return new DfElement(`${locator}`, name, xpath);
}
