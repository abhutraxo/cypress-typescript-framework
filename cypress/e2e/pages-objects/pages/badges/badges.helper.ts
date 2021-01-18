import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { StepLogger } from '../../../core/step-logger';

import { Badges } from './badges.po';

export class BadgesHelper {
  static verifyActiveSkillBadge(positionName: string, activeBadge: string) {
    StepLogger.subVerification(`Verify Active Badge ${activeBadge}`);
    Badges.badges.activeSkillBadge(positionName).vItem.trigger('mouseenter');
    ExpectationHelper.verifyTextContains(Badges.badges.badgesToolTip, activeBadge);
    Badges.badges.activeSkillBadge(positionName).vItem.trigger('mouseleave');
  }

  static verifyCompletedSkillBadge(positionName: string, activeBadge: string, stepOrder: string) {
    StepLogger.subVerification('Verify Complete Badge');
    StepLogger.subVerification(`Verify Success Badge ${activeBadge}`);
    Badges.badges
      .successSkillBadge(positionName, stepOrder)
      .last()
      .trigger('mouseenter');
    ExpectationHelper.verifyTextContains(Badges.badges.badgesToolTip, activeBadge);
    Badges.badges
      .successSkillBadge(positionName, stepOrder)
      .last()
      .trigger('mouseleave');
  }

  static closeNotification() {
    StepLogger.subStep('Click close notification button');
    Badges.badges.notificationCloseButton.click();
  }

  static verifySuccessNotification(positionName: string, successMessage: string) {
    StepLogger.subVerification(`Verify the Success Notification for ${positionName}`);
    Badges.badges.successNotification.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(Badges.badges.successNotificationText, successMessage);
  }

  static verifyActiveRealBadge(positionName: string, activeBadge: string) {
    StepLogger.subVerification(`Verify Active Real work Badge ${activeBadge}`);
    Badges.badges.activeRealBadge(positionName).vItem.trigger('mouseenter');
    ExpectationHelper.verifyTextContains(Badges.badges.badgesToolTip, activeBadge);
    Badges.badges.activeRealBadge(positionName).vItem.trigger('mouseleave');
  }

  static verifyCompletedRealBadge(positionName: string, activeBadge: string) {
    StepLogger.subVerification('Verify Complete Real work Badge');
    StepLogger.subVerification(`Verify Success Badge ${activeBadge}`);
    Badges.badges
      .successRealBadge(positionName)
      .last()
      .trigger('mouseenter');
    ExpectationHelper.verifyTextContains(Badges.badges.badgesToolTip, activeBadge);
    Badges.badges
      .successRealBadge(positionName)
      .last()
      .trigger('mouseleave');
  }

  static verifyRetryBadge(positionName: string) {
    StepLogger.subVerification('Verify the retry badge');
    Badges.badges.retryRealBadge(positionName).verifyDisplayedStatus();
  }
}
