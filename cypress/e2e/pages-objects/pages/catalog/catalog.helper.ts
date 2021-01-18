import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { StepLogger } from '../../../core/step-logger';
import { EndpointHelper } from '../../../helpers/end-point.helper';
import { BasePageHelper } from '../base-page.helper';

import { CatalogConstants } from './catalog.constant';
import { CatalogPage } from './catalog.po';

export class CatalogHelper extends BasePageHelper {
  private constructor() {
    super();
  }
  private static vInstance: CatalogHelper;

  public static getInstance(): CatalogHelper {
    return this.vInstance || (this.vInstance = new this());
  }

  static verifySkillBadgeCatalogPage() {
    StepLogger.subVerification('Verify Skills Badges Catalog Page');
    const eNames = CatalogConstants.elementNames;
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.skillCatalogHeader);
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.domainName(eNames.psychoCognitive));
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.domainName(eNames.language));
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.domainName(eNames.technical));
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.domainName(eNames.finance));
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.domainName(eNames.sales));
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.backToProfileLink);
  }

  static clickBackToProfileLink() {
    StepLogger.subStep('Click Back to profile link');
    CatalogPage.catalog.backToProfileLink.click();
  }

  static clickDomain(domainName: string) {
    StepLogger.subStep('Click the Domain Name');
    CatalogPage.catalog.domainName(domainName).click();
  }

  static verifyCategories(categoryName: string) {
    StepLogger.subVerification('Verify Categories is displayed');
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.categoryName(categoryName));
  }

  static verifyBadgeDisplayed(badgeName: string) {
    StepLogger.subVerification(`Verify ${badgeName} is displayed`);
    CatalogPage.catalog.badge(badgeName).verifyDisplayedStatus();
    CatalogPage.catalog.earnThisBadgeButton(badgeName).verifyDisplayedStatus();
  }

  static clickEarnThisBadgeButton(badgeName: string) {
    StepLogger.subStep('Click Earn this badge button');
    CatalogPage.catalog.earnThisBadgeButton(badgeName).click();
  }

  static verifyBadgeDetails(badgeName: string) {
    StepLogger.subVerification('Verify Badge Details card');
    CatalogPage.catalog.badgeDetailsCard.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(CatalogPage.catalog.badgeDetailHeader, badgeName);
    CatalogPage.catalog.startButton.verifyDisplayedStatus();
  }

  static verifyRealWorkBadgeCatalogPage() {
    StepLogger.subVerification('Verify Skills Badges Catalog Page');
    const eNames = CatalogConstants.elementNames;
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.realWorkCatalogHeader);
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.domainName(eNames.psychoCognitive));
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.domainName(eNames.language));
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.domainName(eNames.technical));
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.domainName(eNames.finance));
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.domainName(eNames.sales));
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.backToProfileLink);
  }

  static verifyNoBadgesWarning() {
    StepLogger.subVerification('Verify the no badge warning');
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.noBadgeWarning);
  }

  static earnedBadgeStars(badgeName: string, earnedStar: number) {
    StepLogger.subStep('Verify Badge with the stars');
    CatalogPage.catalog.earnedStars(badgeName).vItem.then((ele: JQuery<HTMLElement>) => {
      expect(ele.length).to.equal(earnedStar);
    });
  }

  static verifyBadgesOnDomain() {
    StepLogger.subStep('Verify Badges on Domain Selection');
    CatalogPage.catalog.appBadgeCards.vItem.then((ele: JQuery<HTMLElement>) => {
      expect(ele.length).to.be.greaterThan(1);
    });
  }

  static verifyLockedBadge(badgeName: string) {
    StepLogger.subVerification(`Verify ${badgeName} is locked`);
    CatalogPage.catalog.badge(badgeName).verifyDisplayedStatus();
    CatalogPage.catalog.lockedButton(badgeName).verifyDisplayedStatus();
  }

  static clickLockedButton(badgeName: string) {
    StepLogger.subStep(`Click Locked button for ${badgeName}`);
    CatalogPage.catalog.lockedButton(badgeName).click();
  }

  static verifyBadgeExpandedDetails(badgeName: string, lockedReason: string) {
    StepLogger.subVerification('Verify the badge details are displayed');
    CatalogPage.catalog.expandedDetails.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(CatalogPage.catalog.badgeDetailHeader, badgeName);
    ExpectationHelper.verifyTextContains(CatalogPage.catalog.lockedReason, lockedReason);
  }

  static verifyClickHereLink() {
    StepLogger.subVerification('Verify Click here link');
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.clickHereSuggestionLink);
  }

  static clickClickHereLink() {
    StepLogger.subStep('Click on Click Here link');
    CatalogPage.catalog.clickHereSuggestionLink.click();
  }

  static verifyLockedReasonAlert() {
    StepLogger.subVerification('Verify locked reason alert');
    CatalogPage.catalog.lockedReasonAlert.verifyDisplayedStatus();
  }

  static verifyClickToSeeBadgeLink() {
    StepLogger.subVerification('Verify the click to see what badge are');
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.clickToSeeBadgesButton);
  }

  static clickClickToSeeBadgeLink() {
    StepLogger.subStep('Click the link "Click to see what badges are"');
    CatalogPage.catalog.clickToSeeBadgesButton.click();
  }

  static verifyLockedReasonDialogWithBadgeLinks(badgeName: string) {
    StepLogger.subVerification('Verify the locked reason dialog');
    CatalogPage.catalog.lockedReasonAlert.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(CatalogPage.catalog.lockedReasonDialogHeader, badgeName);
  }

  static verifyLockedBadgeReason(badgeName: string) {
    StepLogger.subVerification('Verify the locked badge displayed');
    ExpectationHelper.verifyDisplayedStatus(CatalogPage.catalog.dependentBadgeLink(badgeName));
  }

  static clickLockedBadgeReason(badgeName: string) {
    StepLogger.subVerification(`Click ${badgeName} locked badge in locked reason dialog`);
    CatalogPage.catalog.dependentBadgeLink(badgeName).click();
  }

  static clickBadgeDetailsCloseButton() {
    StepLogger.subStep('Click Badge details close button');
    CatalogPage.catalog.badgeDetailClose.click();
  }

  url(): string {
    return EndpointHelper.catalogPosition;
  }
}
