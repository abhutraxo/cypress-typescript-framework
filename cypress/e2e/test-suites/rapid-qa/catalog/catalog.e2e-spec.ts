import { AddMultipleStepResults } from '../../../api/add-multiple-step-results';
import { DeleteCandidate } from '../../../api/delete-candidate';
import { PageHelper } from '../../../components/html/page-helper';
import { StepLogger } from '../../../core/step-logger';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { BadgesHelper } from '../../../pages-objects/pages/badges/badges.helper';
import { BasicFitHelper } from '../../../pages-objects/pages/basic-fit/basic-fit.helpers';
import { CatalogConstants } from '../../../pages-objects/pages/catalog/catalog.constant';
import { CatalogHelper } from '../../../pages-objects/pages/catalog/catalog.helper';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.rapidQA, () => {
  let applicationHelper: ApplicationFormHelper;
  let user: User;

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C37268932 Verify the Skill and real-work catalog page and start a test on a badge', () => {
    StepLogger.caseId = 37268932;
    const eNames = CatalogConstants.elementNames;

    StepLogger.preCondition('Create a new candidate and application');
    applicationHelper.goTo();
    user = ApplicationFormHelper.createNewCandidate();
    ProfilePageHelper.completeTutorial();
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);
    AddMultipleStepResults.createStepResults(user.email, 100, 'BFQ');
    BasicFitHelper.verifyBasicFitSuccessNotification();

    StepLogger.stepId(1);
    StepLogger.step('Click on the plus sign under skills badge section');
    ProfilePageHelper.clickSkillBadgesPlusSign();
    StepLogger.verification(`Skill Badge catalog open
    1) Heading "Skill Badge Catalog" is displayed
    2) Side menu with Domain names are displayed
    3) BACK TO MY PROFILE link is displayed`);
    CatalogHelper.verifySkillBadgeCatalogPage();

    StepLogger.stepId(2);
    StepLogger.step(`Click on the Domain from the Side Menu
    Ex: Psychocognitive`);
    CatalogHelper.clickDomain(eNames.psychoCognitive);
    StepLogger.verification(`The Badge Catagories for the Domain is displayed
    Ex: Cognitive Aptitude
    The Badge tiles is displayed with Earn This Badge button`);
    CatalogHelper.verifyCategories(eNames.cognitiveAbility);
    CatalogHelper.verifyBadgeDisplayed(eNames.cognitiveAptitude);

    StepLogger.stepId(3);
    StepLogger.step('Click on the Earn this Badge button');
    CatalogHelper.clickEarnThisBadgeButton(eNames.cognitiveAptitude);
    StepLogger.verification('Badge Description card opens with Start button');
    CatalogHelper.verifyBadgeDetails(eNames.cognitiveAptitude);

    StepLogger.stepId(4);
    StepLogger.step('Click Back to My Profile link');
    CatalogHelper.clickBackToProfileLink();
    StepLogger.verification('Navigate back to My Profile tab');
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

    StepLogger.stepId(5);
    StepLogger.step('Click on the Plus sing under real work section');
    ProfilePageHelper.clickRealWorkBadgePlusSign();
    StepLogger.verification(`Real work Badge Catalog opens
    1) Heading "RealWork Badge Catalog" is displayed
    2) Side menu with Domains are displayed
    3) BACK TO MY PROFILE link is displayed`);
    CatalogHelper.verifyRealWorkBadgeCatalogPage();

    StepLogger.stepId(6);
    StepLogger.step(`Click on one of the Domains
    Ex: Psychocognitive`);
    CatalogHelper.clickDomain(eNames.psychoCognitive);
    StepLogger.verification('Category do not have any badges, No Badges message is displayed');
    CatalogHelper.verifyNoBadgesWarning();

    StepLogger.stepId(7);
    StepLogger.step(`Click on other domain from side menu
    Ex: Technical`);
    CatalogHelper.clickDomain(eNames.technical);
    StepLogger.verification(`Categories are displayed for the Domain
    Badges for different categories are displayed under category heading`);
    CatalogHelper.verifyBadgesOnDomain();

    StepLogger.stepId(8);
    StepLogger.step('Go the Profile home, Pass the CCAT');
    CatalogHelper.clickBackToProfileLink();
    BadgesHelper.closeNotification();
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);
    AddMultipleStepResults.createStepResults(user.email, 35, 'CCAT');
    BadgesHelper.verifySuccessNotification('Test Position', 'Congratulations');
    StepLogger.verification('CCAT Badge is displayed on my profile tab');
    ProfilePageHelper.verifyProficiencyBadge('Cognitive Aptitude', 3, 2);

    StepLogger.stepId(9);
    StepLogger.step('Navigate to Skill Badge Catalog and click PsychoCognitive domain from side navigation');
    ProfilePageHelper.clickSkillBadgesPlusSign();
    StepLogger.verification('Cognitive Aptitude Badge is displayed with passing stars ex: 3 stars');
    CatalogHelper.verifySkillBadgeCatalogPage();
    CatalogHelper.clickDomain(eNames.psychoCognitive);
    CatalogHelper.earnedBadgeStars(eNames.cognitiveAptitude, 3);
  });

  after(() => {
    DeleteCandidate.deleteCandidate(user.email);
    LoginPageHelper.logout();
  });
});
