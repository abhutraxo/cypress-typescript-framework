import { $, $$ } from '../../../components/misc-utils/df-elements-helper';
import { HtmlHelper } from '../../../components/misc-utils/html-helper';

import { CognitiveAptitudeConstants } from './cognitive-aptitude.constants';

const {
  attributes: { classes },
  elementNames: eNames,
} = CognitiveAptitudeConstants;
export class CognitiveAptitudePage {
  static readonly ccat = Object.freeze({
    get takeTestButton() {
      return cy.cssContainingText(`[class*='${classes.takeTestButton}']`, eNames.takeTestButton);
    },

    get ccatDescriptionHeader() {
      return cy.cssContainingText(HtmlHelper.tags.h4, eNames.ccatTestHeader);
    },

    get startButton() {
      return cy.cssContainingText(`[class*='${classes.startButton}']`, eNames.startButton);
    },

    get welcomePageCardTitle() {
      return cy.cssContainingText(`[class*='${classes.cardTitle}']`, eNames.welcomePage);
    },

    get continueButton() {
      return cy.cssContainingText(`[class*='${classes.continueBtn}']`, eNames.continue);
    },

    get verifyInfoCardTitle() {
      return cy.cssContainingText(`[class*='${classes.cardTitle}']`, eNames.verifyInfo);
    },

    get countryDropDown() {
      return $(`[id='${classes.country}']`, 'country');
    },

    get termCheckBox() {
      return $(`[id='${classes.agreeToTerms}']`, 'Agree to terms');
    },

    get lead() {
      return cy.cssContainingText(`[id='${classes.lead}']`, eNames.eventID);
    },

    get overviewCardTitle() {
      return cy.cssContainingText(`[class*='${classes.cardTitle}']`, eNames.overView);
    },

    get beginTestButton() {
      return cy.cssContainingText(`[class*='${classes.continueBtn}']`, eNames.beginTest);
    },

    get aptitudeAssessment() {
      return cy.cssContainingText('div', eNames.aptitudeAssessment);
    },

    get ccatFailedIcon() {
      return $$(
        `//*[contains(@class, '${classes.skillBadges}')]/div/div/app-badge/
      div[contains(@class, '${classes.badge}') and contains(@class, '${classes.failedStatus}')]`,
        'CCAT Failed Icon',
      );
    },

    get applicationStatus() {
      return $(`[class*='${classes.terminalStatus}']`, 'Terminal Status');
    },
  });
}
