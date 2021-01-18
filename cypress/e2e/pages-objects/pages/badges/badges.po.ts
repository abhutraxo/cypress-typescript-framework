import { $, $$ } from '../../../components/misc-utils/df-elements-helper';

import { BadgesConstants } from './badges.constants';

const {
  attribute: { classes },
  elementNames: eNames,
} = BadgesConstants;
export class Badges {
  static readonly badges = Object.freeze({
    appBadges(positionName: string) {
      return $$(
        `//*[contains(text(), '${eNames.jobApp}')]/parent::div/following-sibling::table/
      tbody/tr/td[contains(@class, '${classes.roleCol}') and contains(., '${positionName}')]/following-sibling::td[contains(@class, '${classes.progressCol}')]
      /div/div[contains(@class, '${classes.desktopView}')]/app-badge`,
        eNames.appBadges,
      );
    },

    get badgesToolTip() {
      return $(`div[class*='cdk-overlay'] ${classes.tooltipComponent} div[class*='${classes.tooltip}']`, 'Tool tip');
    },

    activeSkillBadge(positionName: string) {
      return $$(
        `//*[contains(text(), '${eNames.jobApp}')]/parent::div/following-sibling::table/
      tbody/tr/td[contains(@class, '${classes.roleCol}') and contains(., '${positionName}')]/following-sibling::td[contains(@class, '${classes.progressCol}')]
      /div/div[contains(@class, '${classes.desktopView}')]/app-badge/div[contains(@class, '${classes.badgeActive}')]`,
        `${eNames.appBadges} Active`,
      );
    },

    notActiveSkillBadge(positionName: string) {
      return $$(
        `//*[contains(text(), '${eNames.jobApp}')]/parent::div/following-sibling::table/
      tbody/tr/td[contains(@class, '${classes.roleCol}') and contains(., '${positionName}')]/following-sibling::td[contains(@class, '${classes.progressCol}')]
      /div/div[contains(@class, '${classes.desktopView}')]/app-badge/div[contains(@class, '${classes.badgeNonActive}')]`,
        `${eNames.appBadges} Not Active`,
      );
    },

    successSkillBadge(positionName: string, stepOrder: string) {
      return cy.xpath(`//*[contains(text(), '${eNames.jobApp}')]/parent::div/following-sibling::table/
      tbody/tr/td[contains(@class, '${classes.roleCol}') and contains(., '${positionName}')]/following-sibling::td[contains(@class, '${classes.progressCol}')]
      /div/div[contains(@class, '${classes.desktopView}')]/app-badge[${stepOrder}]/div[contains(@class, '${classes.badgeSuccess}')]`);
    },

    get notificationCloseButton() {
      return $(`button[class*='${classes.notificationCloseButton}']`, eNames.notificationCloseButton);
    },

    get successNotification() {
      return $(`[class*='${classes.successNotification}']`, 'Success notification');
    },

    get successNotificationText() {
      return $(`[class*='${classes.successNotification}'] app-snackbar`, eNames.successMessage);
    },

    activeRealBadge(positionName: string) {
      return $$(
        `//*[contains(text(), '${eNames.jobApp}')]/parent::div/following-sibling::table/
      tbody/tr/td[contains(@class, '${classes.roleCol}') and contains(., '${positionName}')]/following-sibling::td[contains(@class, '${classes.realWorkCol}')]
      /div[contains(@class, '${classes.desktopView}')]/app-badge/div[contains(@class, '${classes.badgeActive}')]`,
        `${eNames.appBadges} Active`,
      );
    },

    notActiveRealBadge(positionName: string) {
      return $$(
        `//*[contains(text(), '${eNames.jobApp}')]/parent::div/following-sibling::table/
      tbody/tr/td[contains(@class, '${classes.roleCol}') and contains(., '${positionName}')]/following-sibling::td[contains(@class, '${classes.realWorkCol}')]
      /div[contains(@class, '${classes.desktopView}')]/app-badge/div[contains(@class, '${classes.badgeNonActive}')]`,
        `${eNames.appBadges} Not Active`,
      );
    },

    successRealBadge(positionName: string) {
      return cy.xpath(`//*[contains(text(), '${eNames.jobApp}')]/parent::div/following-sibling::table/
      tbody/tr/td[contains(@class, '${classes.roleCol}') and contains(., '${positionName}')]/following-sibling::td[contains(@class, '${classes.realWorkCol}')]
      /div[contains(@class, '${classes.desktopView}')]/app-badge/div[contains(@class, '${classes.badgeSuccess}')]`);
    },

    retryRealBadge(positionName: string) {
      return $$(
        `//*[contains(text(), '${eNames.jobApp}')]/parent::div/following-sibling::table/
      tbody/tr/td[contains(@class, '${classes.roleCol}') and contains(., '${positionName}')]/following-sibling::td[contains(@class, '${classes.realWorkCol}')]
      /div[contains(@class, '${classes.desktopView}')]/app-badge/div[contains(@class, '${classes.badgeRetry}')]`,
        `${eNames.appBadges} Active`,
      );
    },
  });
}
