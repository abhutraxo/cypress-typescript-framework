import { AddMultipleStepResults } from '../../../api/add-multiple-step-results';
import { AddStepResults } from '../../../api/add-step-result-utils';
import { DeleteCandidate } from '../../../api/delete-candidate';
import { PageHelper } from '../../../components/html/page-helper';
import { StepLogger } from '../../../core/step-logger';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { BadgesHelper } from '../../../pages-objects/pages/badges/badges.helper';
import { BasicFitHelper } from '../../../pages-objects/pages/basic-fit/basic-fit.helpers';
import { CatalogConstants } from '../../../pages-objects/pages/catalog/catalog.constant';
import { CatalogHelper } from '../../../pages-objects/pages/catalog/catalog.helper';
import { CatalogPage } from '../../../pages-objects/pages/catalog/catalog.po';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.catalog, () => {
  let catalogHelper: CatalogHelper;
  let user: User;

  before(() => {
    catalogHelper = CatalogHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C37269126 Verify the badge dependencies on other badge', () => {
    StepLogger.caseId = 37269126;
    const eNames = CatalogConstants.elementNames;
    const testPosition = 'Test Position Staging Profile One';

    StepLogger.preCondition('Create a candidate and application');
    catalogHelper.goTo();
    user = ApplicationFormHelper.createNewCandidate();
    ProfilePageHelper.completeTutorial();
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

    StepLogger.stepId(1);
    StepLogger.step('Click on the plus sign under the real badge');
    ProfilePageHelper.clickRealWorkBadgePlusSign();
    StepLogger.verification('Real Work Badge Catalog page opens');
    CatalogHelper.verifyRealWorkBadgeCatalogPage();

    StepLogger.stepId(2);
    StepLogger.step('Click on the domain name from the side panel ex: Sales');
    CatalogHelper.clickDomain(eNames.sales);
    StepLogger.verification(`All Sales Badges are displayed
    Ex: For Pipeline 6663 Badges
    - Learn and Explain New Products
    - Objection Handling
    - Written Communication Skills`);
    CatalogHelper.verifyLockedBadge(eNames.learn);
    CatalogHelper.verifyLockedBadge(eNames.objectHandling);
    CatalogHelper.verifyLockedBadge(eNames.written);

    StepLogger.stepId(3);
    StepLogger.step('Click on the Locked button on the Learn and Explain New Product Badge');
    CatalogHelper.clickLockedButton(eNames.learn);
    StepLogger.verification(`Badge description card opens with the locked button and Locked Reason
    Information "To unlock this badge you need to reach the stage of testing on the role that require it" is displayed`);
    CatalogHelper.verifyBadgeExpandedDetails(eNames.learn, eNames.stageDependency);

    StepLogger.stepId(4);
    StepLogger.step('Click on the Object Handling Badge');
    CatalogHelper.clickLockedButton(eNames.objectHandling);
    StepLogger.verification(`Badge description open with locked button
    Badge dependency information "This badge requires taking other badges first" is displayed below the card and link
    check to see what badges are`);
    CatalogHelper.verifyBadgeExpandedDetails(eNames.objectHandling, eNames.badgeDependency);
    CatalogHelper.verifyClickToSeeBadgeLink();

    StepLogger.stepId(5);
    StepLogger.step('Click on the "check to see what badges are" link');
    CatalogHelper.clickClickToSeeBadgeLink();
    StepLogger.verification(`Alert box open with Badge link that needs to be earned first
    Ex: Learn and Explain New Products`);
    CatalogHelper.verifyLockedReasonDialogWithBadgeLinks(eNames.objectHandling);
    CatalogHelper.verifyLockedBadgeReason(eNames.learn);

    StepLogger.stepId(6);
    StepLogger.step('Click on the Learn and Explain the New Products link in the alert box.');
    CatalogHelper.clickLockedBadgeReason(eNames.learn);
    StepLogger.verification(`Badge Description open
    and Url is pointing to new badge
    Ex: ${Cypress.config().baseUrl}/catalog/realwork/Sales/a1E2j000000fyDfEAI/a082j000000Pa8LAAS`);
    CatalogHelper.verifyBadgeExpandedDetails(eNames.learn, eNames.stageDependency);

    StepLogger.stepId(7);
    StepLogger.step('Click Back to my profile link');
    CatalogHelper.clickBackToProfileLink();
    StepLogger.verification('Application navigates back to My profile tab');
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

    StepLogger.stepId(8);
    StepLogger.step('Go to the My application tab and pass the Basic fit, CCAT and English test and SMQ');
    ProfilePageHelper.clickMyApplicationTab();
    AddMultipleStepResults.createStepResults(user.email, 100, 'BFQ');
    BadgesHelper.verifySuccessNotification(testPosition, 'Congratulations');
    BadgesHelper.closeNotification();

    AddMultipleStepResults.createStepResults(user.email, 35, 'CCAT');
    BadgesHelper.verifySuccessNotification(testPosition, 'Congratulations');
    BadgesHelper.closeNotification();

    AddMultipleStepResults.createStepResults(user.email, 100, 'English');
    BadgesHelper.verifySuccessNotification(testPosition, 'Congratulations');
    BadgesHelper.closeNotification();

    AddMultipleStepResults.createStepResults(user.email, 100, 'SMQ');
    BadgesHelper.verifySuccessNotification(testPosition, 'Congratulations');
    BadgesHelper.closeNotification();
    StepLogger.verification('Real Work badges are active now');
    BadgesHelper.verifyActiveRealBadge(testPosition, eNames.learn);

    StepLogger.stepId(9);
    StepLogger.step('Go to the Profile page and click the plus sign for real work badges and click Sales domain');
    ProfilePageHelper.clickMyProfileTab();
    ProfilePageHelper.clickRealWorkBadgePlusSign();
    CatalogHelper.verifyRealWorkBadgeCatalogPage();
    CatalogHelper.clickDomain(eNames.sales);
    StepLogger.verification(`All the Sales Real work badge will be displayed
    Learn and Explain the New Products badge with Earn this Badge button is displayed`);
    CatalogHelper.verifyBadgeDisplayed(eNames.learn);
    CatalogHelper.verifyLockedBadge(eNames.objectHandling);
    CatalogHelper.verifyLockedBadge(eNames.written);

    StepLogger.stepId(10);
    StepLogger.step('Click Earn this badge and Complete the badge');
    CatalogHelper.clickEarnThisBadgeButton(eNames.learn);
    BasicFitHelper.clickStartButton();
    cy.frameLoaded();
    AddStepResults.createStepResults(user.email, 85, 'FRQ', 'Started', 20);
    cy.wait(5000);
    StepLogger.verification('The Badge is passed. Objection Handling is activated with Earn this Badge button');
    PageHelper.goToUrl(`${Cypress.config().baseUrl}/catalog/realwork/Sales`);

    StepLogger.stepId(11);
    StepLogger.step('Click on written communication badge');
    CatalogHelper.clickLockedButton(eNames.written);
    StepLogger.verification(
      'Written Communication badge details open with locked reason. "This badge require taking other badges first"',
    );
    CatalogHelper.verifyBadgeExpandedDetails(eNames.written, eNames.badgeDependency);
    CatalogHelper.verifyClickToSeeBadgeLink();

    StepLogger.stepId(12);
    StepLogger.step('Click on the "check to see what badges are" link');
    CatalogHelper.clickClickToSeeBadgeLink();
    StepLogger.verification('Alert box open with badge link that needs to be earned first ex: Objection Handling');
    CatalogHelper.verifyLockedBadgeReason(eNames.objectHandling);

    StepLogger.stepId(13);
    StepLogger.step('Click on Objection Handling badge link');
    CatalogHelper.clickLockedBadgeReason(eNames.objectHandling);
    StepLogger.verification('Objection Handling badge details open');
    CatalogPage.catalog.badgeDetailsCard.verifyDisplayedStatus();
    CatalogHelper.clickBadgeDetailsCloseButton();

    StepLogger.stepId(14);
    StepLogger.step('Pass the Objection Handling badge');
    CatalogHelper.clickEarnThisBadgeButton(eNames.objectHandling);
    BasicFitHelper.clickStartButton();
    cy.frameLoaded();
    AddStepResults.createStepResults(user.email, 85, 'FRQ', 'Started', 20);
    StepLogger.verification(
      'Objection handling badge is passed  with certain stars and Written Communication badge is active wih Earn this badge button',
    );
    cy.wait(5000);
    PageHelper.goToUrl(`${Cypress.config().baseUrl}/catalog/realwork/Sales`);
    CatalogHelper.verifyBadgeDisplayed(eNames.written);
  });

  after(() => {
    DeleteCandidate.deleteCandidate(user.email);
  });
});
