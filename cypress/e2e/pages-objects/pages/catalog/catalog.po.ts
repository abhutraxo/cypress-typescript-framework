import { $, $$ } from '../../../components/misc-utils/df-elements-helper';

import { CatalogConstants } from './catalog.constant';

const {
  attributes: { classes },
  elementNames: eNames,
} = CatalogConstants;
export class CatalogPage {
  static readonly catalog = Object.freeze({
    get skillCatalogHeader() {
      return cy.cssContainingText(`[class*='${classes.catalogHeader}']`, eNames.skillCatalog);
    },

    domainName(domain: string) {
      return cy.cssContainingText(`[class='${classes.domainName}']`, domain);
    },

    categoryName(category: string) {
      return cy.cssContainingText(`[class='${classes.categoryName}']`, category);
    },

    get backToProfileLink() {
      return cy.cssContainingText(`[class*='${classes.profileLink}']`, eNames.backToMyProfile);
    },

    badge(badgeName: string) {
      return $$(
        `//*[contains(@class, '${classes.badgeCard}')]/div/
      div[contains(@class, '${classes.badgeName}') and contains(text(), '${badgeName}')]`,
        badgeName,
      );
    },

    earnThisBadgeButton(badgeName: string) {
      return $$(
        `//*[contains(@class, '${classes.badgeCard}')]/div/
      div[contains(@class, '${classes.badgeName}') and text()='${badgeName}']/following-sibling::button`,
        'Earn this badge',
      );
    },

    get badgeDetailHeader() {
      return $(`[class*='${classes.badgeDetailHeader}']`, 'Details Header');
    },

    get badgeDetailsCard() {
      return $(`[class*='${classes.badgeDetailCard}']`, 'Badge Card');
    },

    get startButton() {
      return $(`[class*='${classes.startButton}']`, eNames.start);
    },

    get realWorkCatalogHeader() {
      return cy.cssContainingText(`[class*='${classes.catalogHeader}']`, eNames.realWorkCatalog);
    },

    get noBadgeWarning() {
      return cy.cssContainingText(`[class*='${classes.noBadge}']`, eNames.noBadge);
    },

    get category() {
      return $(`a[class*='${classes.categoryName}']`, 'Categories');
    },

    earnedStars(badgeName: string) {
      return $$(
        `//*[contains(@class, '${classes.badgeName}') and contains(text(), '${badgeName}')]
        /following-sibling::app-stars/div/i[contains(@class, '${classes.earnedStar}')]`,
        'Earned Stars',
      );
    },

    get appBadgeCards() {
      return $(`${classes.appBadgeCard}`, classes.appBadgeCard);
    },

    lockedButton(badgeName: string) {
      return $$(
        `//*[contains(@class, '${classes.badgeCard}')]/div/
      div[contains(@class, '${classes.badgeName}') and text()='${badgeName}']/following-sibling::button[contains(., 'LOCKED')]`,
        'Locked Button',
      );
    },

    get expandedDetails() {
      return $(`[class*='${classes.expandedDetails}']`, 'Expanded Badge Details');
    },

    get lockedReason() {
      return $(`[class*='${classes.lockedReason}']`, 'Locked Reason');
    },

    get clickHereSuggestionLink() {
      return cy.cssContainingText(`[class*='${classes.suggestionLink}']`, eNames.clickHere);
    },

    get lockedReasonAlert() {
      return $(`[class*='${classes.lockedReasonAlert}']`, 'Locked Reason Alert');
    },

    get clickToSeeBadgesButton() {
      return cy.cssContainingText(`[class*='${classes.suggestionLink}']`, eNames.clickToSee);
    },

    get lockedReasonDialogHeader() {
      return $(`[class*='${classes.lockedReasonHeader}']`, 'Locked Reason header');
    },

    dependentBadgeLink(badgeName: string) {
      return cy.cssContainingText(`[class*='${classes.button}']`, badgeName);
    },

    get badgeDetailClose() {
      return $(`button[class*='${classes.badgeDetailCloseButton}']`, 'Close Button');
    },
  });
}
