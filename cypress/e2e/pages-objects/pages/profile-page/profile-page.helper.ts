import { CandidateDetailsUtils } from '../../../api/candidate-details-utils';
import { CandidateEmailUtils } from '../../../api/candidate-email-utils';
import { LoginUtils } from '../../../api/login-utils';
import { DateHelper } from '../../../components/misc-utils/date-helper';
import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { StepLogger } from '../../../core/step-logger';
import { EndpointHelper } from '../../../helpers/end-point.helper';
import { EnvironmentHelper } from '../../../helpers/enviornment.helper';
import { BasePageHelper } from '../base-page.helper';
import { BasicFitPage } from '../basic-fit/basic-fit.po';

import { ProfilePagesConstants } from './profile-page.constants';
import { ProfilePage } from './profile-page.po';

export class ProfilePageHelper extends BasePageHelper {
  private static vInstance: ProfilePageHelper;

  private constructor() {
    super();
  }

  public static getInstance(): ProfilePageHelper {
    return this.vInstance || (this.vInstance = new this());
  }

  public static verifyCandidatePersonalInfoSection() {
    StepLogger.subStep('Verify the personal info section');
    cy.wait(10000);
    ProfilePage.profile.userLocation.verifyDisplayedStatus();
    ProfilePage.profile.userTimeZone.verifyDisplayedStatus();
    ProfilePage.profile.phoneNumber.verifyDisplayedStatus();
    ProfilePage.profile.linkedIn.verifyDisplayedStatus();
    ProfilePage.profile.email.verifyDisplayedStatus();
    ProfilePage.profile.resume.verifyDisplayedStatus();
  }

  public static verifyCandidateInformationFromAPI() {
    StepLogger.subVerification('Verify Candidate information');
  }

  static verifyTourWelcomeDialog() {
    ProfilePage.profile.welcomeDialog.should('be.visible');
    ProfilePage.profile.takeTourButton.should('be.visible');
  }

  static clickTakeTourButton() {
    ProfilePage.profile.takeTourButton.click();
  }

  static verifyFollowRecommendationDialog() {
    ProfilePage.profile.followRecommendationDialog.should('be.visible');
    ProfilePage.profile.nextButton.should('be.visible');
  }

  static clickNextButton() {
    ProfilePage.profile.nextButton.click();
  }

  static verifyFollowProgressDialog() {
    ProfilePage.profile.followProgressDialog.should('be.visible');
    ProfilePage.profile.finishButton.should('be.visible');
  }

  static clickFinishButton() {
    ProfilePage.profile.finishButton.click();
  }

  static completeTutorial() {
    this.verifyTourWelcomeDialog();
    this.clickTakeTourButton();
    this.verifyFollowRecommendationDialog();
    this.clickNextButton();
    this.verifyFollowProgressDialog();
    this.clickFinishButton();
  }

  static clickMyApplicationTab() {
    StepLogger.subStep('Click My Application Tab');
    cy.contains("[role='tab']", 'My applications').click();
  }

  static clickMyProfileTab() {
    StepLogger.subStep('Click My profile tab');
    ProfilePage.profile.myProfileTab.click();
  }

  static verifyJobApplicationSection(positionName: string) {
    StepLogger.subVerification('Verify Job application page');
    ProfilePage.profile.jobApplicationHeader.should('be.visible');
    ProfilePage.profile.jobApplicationName(positionName).verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(ProfilePage.profile.jobApplicationName(positionName), positionName);
    ProfilePage.profile.jobApplicationStatus(positionName).vItem.find("[class*='action-button mobile-none']");
  }

  static clickNextStepButton(positionName: string) {
    ProfilePage.profile.jobApplicationStatus(positionName).click();
  }

  static verifyMyApplicationTabActive() {
    StepLogger.subStep('Verify My application tab is Active');
    cy.contains("[role='tab']", 'My applications')
      .invoke('attr', 'aria-selected')
      .should('equal', 'true');
  }

  static verifyCandidatePersonalInfo() {
    StepLogger.subStep('Verify Candidate Personal Information');
    ProfilePage.profile.userLocation.verifyDisplayedStatus();
    ProfilePage.profile.userTimeZone.verifyDisplayedStatus();
    ProfilePage.profile.phoneNumber.verifyDisplayedStatus();
    ProfilePage.profile.email.verifyDisplayedStatus();
    ProfilePage.profile.linkedIn.verifyDisplayedStatus();
    ProfilePage.profile.resume.verifyDisplayedStatus();
  }

  static verifyCandidatePersonalInfoDetails(email: string) {
    StepLogger.subVerification('Verify The Candidate the personal information details');
    LoginUtils.getLogin();
    cy.getLocalStorage('loginToken').then(token => {
      CandidateEmailUtils.getCandidateDetails(email, token).then(account => {
        CandidateDetailsUtils.getCandidateDetails(account.body.records[0].Id, token).then(response => {
          const record = response.body.records[0];
          ExpectationHelper.verifyTextContains(ProfilePage.profile.userTimeZone, record.Timezone__c);
          ExpectationHelper.verifyTextContains(ProfilePage.profile.phoneNumber, record.Phone);
          ExpectationHelper.verifyTextContains(ProfilePage.profile.email, record.PersonEmail);
          ProfilePage.profile.linkedIn.vItem.then((ele: any) => {
            const link = ele.text();
            ExpectationHelper.verifyStringValueContains(ProfilePage.profile.linkedIn, record.Website, link.trim());
          });
        });
      });
    });
  }

  static verifyCandidateTimeline() {
    StepLogger.subVerification('Verify the Candidate Time line');
    const todayDate = DateHelper.getTodayFormattedDate();
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.candidateTimeline);
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.appliedFor);
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.createAccount);
    ExpectationHelper.verifyTextContains(ProfilePage.profile.appliedForDate, todayDate);
    ExpectationHelper.verifyTextContains(ProfilePage.profile.createAccountDate, todayDate);
  }

  static verifySkillAndRealWorkBadges() {
    StepLogger.subVerification('Verify the Skill and Real Work Badges');
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.skillBadgeHeading);
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.skillBadgeAddButton);
    ProfilePage.profile.skillBadgeAddButton.then($skillBtn => {
      $skillBtn.attr('class')?.includes('new-badge');
    });
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.realBadgeHeading);
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.realWorkBadgeAddButton);
    ProfilePage.profile.realWorkBadgeAddButton.then($skillBtn => {
      $skillBtn.attr('class')?.includes('new-badge');
    });
  }

  static verifyCandidateIntroductionSection() {
    StepLogger.subVerification('Verify Candidate Introduction section');
    ProfilePage.profile.introductionHeader.verifyDisplayedStatus();
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.addIntroButton);
    ProfilePage.profile.workExperience.verifyDisplayedStatus();
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.addWorkExperience);
    ProfilePage.profile.education.verifyDisplayedStatus();
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.addEduction);
    ProfilePage.profile.addSectionButton.verifyDisplayedStatus();
  }

  static clickAddSectionMenu() {
    StepLogger.subStep('Click Add Section Menu');
    ProfilePage.profile.addSectionButton.click();
  }

  static verifyRecommendedJobSection(jobApplicationName: string) {
    StepLogger.subVerification('Verify the Recommended Job Section');
    const eNames = ProfilePagesConstants.elementNames;
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.recommendedJobHeader);
    ProfilePage.profile.recommendedColumnHeader(eNames.role).verifyElementPresent();
    ProfilePage.profile.recommendedColumnHeader(eNames.basicFit).verifyElementPresent();
    ProfilePage.profile.recommendedJobName(jobApplicationName).vItem.then((ele: any) => {
      StepLogger.subVerification(`Verify job application ${ele.text()}`);
    });
    ProfilePage.profile.recommendedJobNextStep(jobApplicationName).should('be.visible');
  }

  static verifyActiveBadge(badgeName: string) {
    StepLogger.subVerification(`Verify ${badgeName} is active`);
    ProfilePage.profile.activeBadge.vItem.trigger('mouseenter');
    BasicFitPage.bfq.tooltip.vItem.then(($ele: any) => {
      expect($ele.text()).to.contain(badgeName);
    });
    ProfilePage.profile.activeBadge.vItem.trigger('mouseleave');
  }

  static verifyCCATWarningNotification() {
    StepLogger.subVerification('Verify CCAT Warning notification');
    ProfilePage.profile.warningNotification.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(
      ProfilePage.profile.warningNotificationText,
      ProfilePagesConstants.elementNames.cognitiveWarningNotification,
    );
    EnvironmentHelper.checkAgainstEnv(this.verifyRetryBadge);
  }

  static verifyProficiencyBadge(proficiencyName: string, activeStars = 1, inactiveStars = 4) {
    StepLogger.subVerification(`Verify ${proficiencyName} has ${activeStars} badge displayed`);
    ProfilePage.profile.badgeActiveStars(proficiencyName).verifyDisplayedStatus();
    ProfilePage.profile.badgeActiveStars(proficiencyName).vItem.then(($activeBadge: JQuery<HTMLElement>) => {
      expect($activeBadge.find(`i[class*='${ProfilePagesConstants.attributes.classes.activeStar}']`).length).to.be.equal(
        activeStars,
      );
    });
    ProfilePage.profile.badgeActiveStars(proficiencyName).vItem.then(($activeBadge: JQuery<HTMLElement>) => {
      expect($activeBadge.find(`i[class*='${ProfilePagesConstants.attributes.classes.inactiveStar}']`).length).to.be.equal(
        inactiveStars,
      );
    });
  }

  static verifyRetryBadge(positionName: string) {
    StepLogger.subVerification(`Verify ${positionName} has ccat retry badge`);
    ProfilePage.profile.retryBadge(positionName).verifyDisplayedStatus();
  }

  static verifySuccessBadge(positionName: string) {
    StepLogger.subVerification(`Verify ${positionName} has ccat success badge`);
    ProfilePage.profile.successBadge(positionName).verifyDisplayedStatus();
  }

  static verifyCCATSuccessNotification() {
    StepLogger.subVerification('Verify CCAT Success notification');
    ProfilePage.profile.successNotification.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(
      ProfilePage.profile.successNotificationText,
      ProfilePagesConstants.elementNames.cognitiveSuccessNotification,
    );
  }

  static clickBadge(badgeName: string) {
    StepLogger.subVerification(`Click on the ${badgeName} badge`);
    ProfilePage.profile.badgeName(badgeName).vItem.click({ force: true });
  }

  static verifyAppStarsInDescription(activeStars = 3, inactiveStars = 2) {
    StepLogger.subVerification('Verify the app stars in the description');
    ProfilePage.profile.badgeDetails.verifyDisplayedStatus();
    ProfilePage.profile.badgeStarInDescription.then(($activeBadge: JQuery<HTMLElement>) => {
      expect($activeBadge.find(`i[class*='${ProfilePagesConstants.attributes.classes.activeStar}']`).length).to.be.equal(
        activeStars,
      );
    });
    ProfilePage.profile.badgeStarInDescription.then(($activeBadge1: JQuery<HTMLElement>) => {
      expect($activeBadge1.find(`i[class*='${ProfilePagesConstants.attributes.classes.inactiveStar}']`).length).to.be.equal(
        inactiveStars,
      );
    });
  }

  static clickEarnThisBadgeButton() {
    StepLogger.subStep('Click on Earn this Badge Button');
    ProfilePage.profile.earnThisBadgeButton.click();
  }

  static verifyStartButtonDisabled() {
    StepLogger.subVerification('Verify the Start button');
    ProfilePage.profile.startButton.should('be.disabled');
  }

  static hoverOverStartButtonAndVerifyTooltip() {
    StepLogger.subStep('Hover over the Start button');
    ProfilePage.profile.startButton.trigger('mouseenter', { force: true });
    cy.wait(2000);
    BasicFitPage.bfq.tooltip.vItem.then(($ele: any) => {
      expect($ele.text()).to.contain(ProfilePagesConstants.elementNames.notSupportedBrowser);
    });
    ProfilePage.profile.startButton.trigger('mouseleave', { force: true });
  }

  static verifyTakeTestButtonDisable() {
    StepLogger.subStep('Verify the take the test button disable');
    ProfilePage.profile.takeTheTestButton.should('be.disabled');
  }

  static hoverOverTakeTestButtonAndVerifyTooltip() {
    StepLogger.subStep('Hover over the Start button');
    ProfilePage.profile.takeTheTestButton.trigger('mouseenter', { force: true });
    cy.wait(2000);
    BasicFitPage.bfq.tooltip.vItem.then(($ele: any) => {
      expect($ele.text()).to.contain(ProfilePagesConstants.elementNames.notSupportedBrowser);
    });
    ProfilePage.profile.takeTheTestButton.trigger('mouseleave', { force: true });
  }

  static verifyOldAppMessage() {
    StepLogger.subVerification('Verify The Switch to Old UI message');
    ExpectationHelper.verifyDisplayedStatus(ProfilePage.profile.switchUIMessage);
  }

  static clickHereLink() {
    StepLogger.subStep('Click on Here Link');
    ProfilePage.profile.hereLink.click();
  }

  static verifyApplicationHeader(positionName: string) {
    StepLogger.subVerification(`Verify ${positionName} is displayed on application header`);
    ExpectationHelper.verifyTextContains(ProfilePage.profile.applicationHeader, positionName);
  }

  static clickApplicationHeader() {
    ProfilePage.profile.applicationHeader.click();
  }

  static clickOtherApplication() {
    StepLogger.subStep('Click Other application link');
    ProfilePage.profile.otherApplicationButton.verifyDisplayedStatus();
    ProfilePage.profile.otherApplicationButton.click();
  }

  static verifyStartButtonDisplayed() {
    StepLogger.subVerification('Verify the Start button displayed');
    ProfilePage.profile.startButton.should('be.visible');
  }

  static clickStartButton() {
    StepLogger.subStep('Click Start button');
    ProfilePage.profile.startButton.click();
  }

  static clickSkillBadgesPlusSign() {
    StepLogger.subStep('Click Skill badges Plus Sign');
    ProfilePage.profile.skillBadgeAddButton.click();
  }

  static clickRealWorkBadgePlusSign() {
    StepLogger.subStep('Click Real work skill badges plus sign');
    ProfilePage.profile.realWorkBadgePlusButton.vItem.click({ force: true });
  }

  url(): string {
    return EndpointHelper.billGateProfilePage;
  }
}
