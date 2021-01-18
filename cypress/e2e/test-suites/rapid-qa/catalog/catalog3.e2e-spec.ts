import { DeleteCandidate } from '../../../api/delete-candidate';
import { PageHelper } from '../../../components/html/page-helper';
import { StepLogger } from '../../../core/step-logger';
import { User } from '../../../helpers/user.helper';
import { ApplicationFormHelper } from '../../../pages-objects/pages/application-form/application-form.helper';
import { CatalogConstants } from '../../../pages-objects/pages/catalog/catalog.constant';
import { CatalogHelper } from '../../../pages-objects/pages/catalog/catalog.helper';
import { LoginPageHelper } from '../../../pages-objects/pages/login-page/login-page.helper';
import { ProfilePageHelper } from '../../../pages-objects/pages/profile-page/profile-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.catalog, () => {
  let applicationHelper: ApplicationFormHelper;
  let catalogHelper: CatalogHelper;
  let user: User;

  before(() => {
    applicationHelper = ApplicationFormHelper.getInstance();
    catalogHelper = CatalogHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C37269280 Verify the badge is dependent on other pipelines', () => {
    StepLogger.caseId = 37269280;
    const eNames = CatalogConstants.elementNames;

    StepLogger.preCondition('Create a new candidate and application');
    applicationHelper.goTo();
    user = ApplicationFormHelper.createNewCandidate();
    ProfilePageHelper.completeTutorial();
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

    StepLogger.stepId(1);
    StepLogger.step('Click on the plus sign for Real Work Badges');
    ProfilePageHelper.clickRealWorkBadgePlusSign();
    StepLogger.verification('Candidate navigates to the RealWork Badge catalog opens');
    CatalogHelper.verifyRealWorkBadgeCatalogPage();

    StepLogger.stepId(2);
    StepLogger.step('Click on Domain from side panel Ex: Sales');
    CatalogHelper.clickDomain(eNames.sales);
    StepLogger.verification(`List of the Sales Badges with locked button are displayed
    Ex: Learn and Explain New Products and Object Handling`);
    CatalogHelper.verifyLockedBadge(eNames.learn);
    CatalogHelper.verifyLockedBadge(eNames.objectHandling);

    StepLogger.stepId(3);
    StepLogger.step('Click on the Learn and Explain New Product badge');
    CatalogHelper.clickLockedButton(eNames.learn);
    StepLogger.verification(`Badge details opens with locked badge details at bottom of card
    To unlock this badge you need to apply to a role that require it and reach the necessary level of testing
    Click here link is displayed next to details`);
    CatalogHelper.verifyBadgeExpandedDetails(eNames.learn, eNames.pipelineDependency);
    CatalogHelper.verifyClickHereLink();

    StepLogger.stepId(4);
    StepLogger.step('Click on the "Click here" link');
    CatalogHelper.clickClickHereLink();
    StepLogger.verification(`Alert open with heading "Roles that require Learn and Explain New Product badge" and link
    to job position are displayed`);
    CatalogHelper.verifyLockedReasonAlert();

    StepLogger.stepId(5);
    StepLogger.step(`Go to the application page for application that have Badges mentioned in Step 2
    Ex: ${Cypress.config().baseUrl}/${catalogHelper.url()}`);
    catalogHelper.goTo();
    StepLogger.verification('Application form page open with all the details filled in');
    ApplicationFormHelper.verifyLoggedInUserApplicationFrom(user);

    StepLogger.stepId(6);
    StepLogger.step('Select one account confirmation checkbox and click Submit application button');
    ApplicationFormHelper.selectApplicationCheckBox();
    ApplicationFormHelper.clickSubmitApplicationButton();
    StepLogger.verification('Candidate navigates to the My Profile tab');
    ApplicationFormHelper.verifyProfileHome(user.fName, user.lName);

    StepLogger.stepId(7);
    StepLogger.step('Click the Real Badge plus button');
    ProfilePageHelper.clickRealWorkBadgePlusSign();
    StepLogger.verification('Navigates to RealWork Badge Catalog page');
    CatalogHelper.verifyRealWorkBadgeCatalogPage();

    StepLogger.stepId(8);
    StepLogger.step('Click on sales domain from side panel');
    CatalogHelper.clickDomain(eNames.sales);
    StepLogger.verification(`List of Sales Badges with locked button are displayed
    Ex: Learn and Explain New Products and Objection Handling`);
    CatalogHelper.verifyLockedBadge(eNames.learn);
    CatalogHelper.verifyLockedBadge(eNames.objectHandling);

    StepLogger.stepId(9);
    StepLogger.step('Click on the Learn and Explain New Product Range');
    CatalogHelper.clickLockedButton(eNames.learn);
    StepLogger.verification(`Badge details opens with locked badge details at bottom of card
    To unlock this badge you need to reach the stage of testing on the roles that require it`);
    CatalogHelper.verifyBadgeExpandedDetails(eNames.learn, eNames.stageDependency);
  });

  after(() => {
    DeleteCandidate.deleteCandidate(user.email);
    LoginPageHelper.logout();
  });
});
