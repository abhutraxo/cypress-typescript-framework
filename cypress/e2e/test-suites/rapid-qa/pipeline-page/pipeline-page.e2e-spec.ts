import { PageHelper } from '../../../components/html/page-helper';
import { StepLogger } from '../../../core/step-logger';
import { PipelinePageConstant } from '../../../pages-objects/pages/pipeline-page/pipeline-page.constant';
import { PipelinePageHelper } from '../../../pages-objects/pages/pipeline-page/pipeline-page.helper';
import { SuiteNames } from '../../../suite-names';

describe(SuiteNames.pipeline, () => {
  let jobPage: PipelinePageHelper;

  before(() => {
    jobPage = PipelinePageHelper.getInstance();
    PageHelper.maximizeBrowser();
  });

  it('C26409776 Filter the job based on the role and compensation', () => {
    StepLogger.caseId = 26409776;
    const eNames = PipelinePageConstant.elementNames;
    StepLogger.stepId(1);
    StepLogger.step(`Navigate to the Job posting page
    https://www.crossover.com/jobs`);
    jobPage.goTo();
    StepLogger.verification(`Job Position page loads
    1) List of job position cards is displayed under different job type sections
    By Default, ALL roles are selected
    2) Top of page filter section is displayed
    3) Search bar is displayed at the top header section`);
    PipelinePageHelper.verifyPipeLinePage();
    PipelinePageHelper.verifyPipelinePageDetails();
    PipelinePageHelper.verifyJobCards('allCards');

    StepLogger.stepId(2);
    StepLogger.step('Click on the Engineering Role Type');
    PipelinePageHelper.verifyTotalRoleTypeSection('totalSection');
    cy.getLocalStorage('totalSection').then(sections => {
      StepLogger.subVerification(`Total no of sections are : ${sections}`);
    });
    PipelinePageHelper.clickRoleType(eNames.engineering);
    StepLogger.verification(`Engineering Role type is selected with tick mark
    Only Engineering Position is displayed and all other section are hidden`);
    PipelinePageHelper.verifyCategoryIsSelected(eNames.engineering);
    PipelinePageHelper.verifySectionPresent(eNames.engineering);
    PipelinePageHelper.verifyTotalRoleTypeSection('newTotalSection');
    cy.getLocalStorage('newTotalSection').then(sections => {
      expect(sections).to.equal('1');
    });

    StepLogger.stepId(3);
    StepLogger.step(`Select another type of role
    Ex: Finance`);
    PipelinePageHelper.clickRoleType(eNames.finance);
    StepLogger.verification(`Along with Engineering, the finance type role is selected with a tick mark
    Engineering and Finance section are displayed`);
    PipelinePageHelper.verifyCategoryIsSelected(eNames.engineering);
    PipelinePageHelper.verifyCategoryIsSelected(eNames.finance);
    PipelinePageHelper.verifySectionPresent(eNames.engineering);
    PipelinePageHelper.verifySectionPresent(eNames.finance);
    PipelinePageHelper.verifyTotalRoleTypeSection('newTotalSection');
    cy.getLocalStorage('newTotalSection').then(sections => {
      expect(sections).to.equal('2');
    });

    StepLogger.stepId(4);
    StepLogger.step(`Change the compensation slider value
    Ex: 20k to 30k`);
    PipelinePageHelper.verifyJobCards('totalCards');
    PipelinePageHelper.moveTheMinimumSlider(eNames._20k);
    PipelinePageHelper.moveTheMaximumSlider(eNames._30k);
    StepLogger.verification('Job falling in 20k to 30k range are displayed all other jobs are hidden');
    cy.getLocalStorage('totalCards').then(oldTotalCards => {
      PipelinePageHelper.verifyJobCards('newTotalCards');
      cy.getLocalStorage('newTotalCards').then(newCards => {
        StepLogger.subStep(`Total Old Cards: ${oldTotalCards} and new cards: ${newCards}`);
        expect(Number(newCards)).to.be.lessThan(Number(oldTotalCards));
      });
    });

    StepLogger.stepId(5);
    StepLogger.step('Clear all the filters');
    PipelinePageHelper.clickRoleType(eNames.all);
    PipelinePageHelper.resetSlider();
    StepLogger.verification('All jobs are displayed');
    PipelinePageHelper.verifyJobCards('resetCards');
    cy.getLocalStorage('allCards').then(allCards => {
      cy.getLocalStorage('resetCards').then(resetCards => {
        expect(allCards).to.equal(resetCards);
      });
    });

    StepLogger.stepId(6);
    StepLogger.step('Enter the Job Keyword in the search bar. Ex: QA');
    PipelinePageHelper.enterSearchQuery();
    StepLogger.verification('All the job with QA keywords is displayed');
  });
});
