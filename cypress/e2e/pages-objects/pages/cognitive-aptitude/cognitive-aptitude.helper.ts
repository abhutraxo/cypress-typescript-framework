import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { StepLogger } from '../../../core/step-logger';
import { ProfilePage } from '../profile-page/profile-page.po';

import { CognitiveAptitudePage } from './cognitive-aptitude.po';

export class CognitiveAptitudeHelper {
  static clickTakeTheTestButton() {
    CognitiveAptitudePage.ccat.takeTestButton.should('be.visible').click();
  }

  static verifyCCATBadgeStartPAge() {
    ExpectationHelper.verifyDisplayedStatus(CognitiveAptitudePage.ccat.ccatDescriptionHeader);
    ExpectationHelper.verifyDisplayedStatus(CognitiveAptitudePage.ccat.startButton);
  }

  static verifyWelcomePage() {
    ExpectationHelper.verifyDisplayedStatus(CognitiveAptitudePage.ccat.welcomePageCardTitle);
    ExpectationHelper.verifyDisplayedStatus(CognitiveAptitudePage.ccat.continueButton);
  }

  static clickContinueButton() {
    CognitiveAptitudePage.ccat.continueButton.click();
    cy.wait(3000);
  }

  static verifyInformationPage() {
    ExpectationHelper.verifyDisplayedStatus(CognitiveAptitudePage.ccat.verifyInfoCardTitle);
    ExpectationHelper.verifyDisplayedStatus(CognitiveAptitudePage.ccat.continueButton);
  }

  static fillCandidateInformationAndContinue() {
    CognitiveAptitudePage.ccat.countryDropDown.vItem.select('India');
    CognitiveAptitudePage.ccat.termCheckBox.selectCheckBox();
    CognitiveAptitudePage.ccat.continueButton.click();
  }

  static verifyEventIdPage() {
    ExpectationHelper.verifyDisplayedStatus(CognitiveAptitudePage.ccat.lead);
    ExpectationHelper.verifyDisplayedStatus(CognitiveAptitudePage.ccat.continueButton);
  }

  static verifyOverviewPage() {
    ExpectationHelper.verifyDisplayedStatus(CognitiveAptitudePage.ccat.overviewCardTitle);
    ExpectationHelper.verifyDisplayedStatus(CognitiveAptitudePage.ccat.continueButton);
  }

  static verifyAptitudeAssessmentPage() {
    ExpectationHelper.verifyDisplayedStatus(CognitiveAptitudePage.ccat.aptitudeAssessment);
    ExpectationHelper.verifyDisplayedStatus(CognitiveAptitudePage.ccat.continueButton);
  }

  static clickBeginTest() {
    CognitiveAptitudePage.ccat.beginTestButton.should('be.visible').click();
  }

  static verifyCCATFailedStatus() {
    StepLogger.subStep('Verify CCAT Failed Status');
    ProfilePage.profile.failedZeroStarNotification.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(ProfilePage.profile.failedZeroStarNotification, 'Cognitive Aptitude');
    CognitiveAptitudePage.ccat.ccatFailedIcon.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(CognitiveAptitudePage.ccat.applicationStatus, 'Process Stopped');
  }

  static verifyTakeTestButtonDisplayed() {
    StepLogger.subStep('Verify the take the test button displayed');
    CognitiveAptitudePage.ccat.takeTestButton.should('be.visible');
  }

  static verifyCCATFailedStatusWithStars() {
    StepLogger.subStep('Verify CCAT Failed Status');
    ProfilePage.profile.failedNotification.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(ProfilePage.profile.failedNotification, 'Cognitive Aptitude');
    CognitiveAptitudePage.ccat.ccatFailedIcon.verifyDisplayedStatus();
    ExpectationHelper.verifyTextContains(CognitiveAptitudePage.ccat.applicationStatus, 'Process Stopped');
  }
}
