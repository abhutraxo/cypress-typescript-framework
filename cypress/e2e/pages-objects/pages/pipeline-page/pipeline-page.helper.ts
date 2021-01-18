import { ExpectationHelper } from '../../../components/misc-utils/expectation-helper';
import { StepLogger } from '../../../core/step-logger';
import { EndpointHelper } from '../../../helpers/end-point.helper';
import { BasePageHelper } from '../base-page.helper';

import { PipelinePageConstant } from './pipeline-page.constant';
import { PipelinePage } from './pipeline-page.po';

export class PipelinePageHelper extends BasePageHelper {
  private constructor() {
    super();
  }
  private static vInstance: PipelinePageHelper;

  public static getInstance(): PipelinePageHelper {
    return this.vInstance || (this.vInstance = new this());
  }

  static verifyPipeLinePage() {
    StepLogger.subVerification('Verify Pipeline page loads');
    PipelinePage.pipeline.pipelinePage.verifyDisplayedStatus();
  }

  static verifyPipelinePageDetails() {
    StepLogger.subVerification('Verify Pipeline page details');
    PipelinePage.pipeline.pipelineCard.vItem.first().should('be.visible');
    PipelinePage.pipeline.compensationFilter.verifyDisplayedStatus();
    PipelinePage.pipeline.roleFilter.verifyDisplayedStatus();
    PipelinePage.pipeline.searchBar.verifyDisplayedStatus();
  }

  static clickRoleType(roleName: string) {
    StepLogger.subStep(`Click Role Type ${roleName}`);
    PipelinePage.pipeline.roleType(roleName).click();
  }

  static verifyCategoryIsSelected(roleName: string) {
    StepLogger.subVerification(`Verify the Category ${roleName} is selected`);
    PipelinePage.pipeline.selectedIcon(roleName).verifyDisplayedStatus();
  }

  static getTotalSection() {
    StepLogger.subStep('Get total section on pipeline page');
  }

  static verifyTotalRoleTypeSection(key: string) {
    return PipelinePage.pipeline.sectionHeader.vItem.then((sections: JQuery<HTMLElement>) => {
      const totalSection = sections.length;
      cy.setLocalStorage(key, String(totalSection));
    });
  }

  static verifySectionPresent(sectionName: string) {
    ExpectationHelper.verifyDisplayedStatus(PipelinePage.pipeline.sectionType(sectionName));
  }

  static moveTheMinimumSlider(sliderValue: string) {
    StepLogger.subStep('Move the minimum slider');
    const rightArrows = this.noOfRightArrow(sliderValue);
    PipelinePage.pipeline.sliderMinimum.vItem.type(rightArrows);
    PipelinePage.pipeline.sliderMinimum.vItem.invoke('attr', 'aria-valuetext').should('equal', sliderValue);
  }

  static moveTheMaximumSlider(sliderValue: string) {
    StepLogger.subStep('Move the maximum slider');
    const leftArrows = this.noOFLeftArrow(sliderValue);
    PipelinePage.pipeline.sliderMaximum.vItem.type(leftArrows);
    PipelinePage.pipeline.sliderMaximum.vItem.invoke('attr', 'aria-valuetext').should('equal', sliderValue);
  }

  static noOfRightArrow(sliderValue: string) {
    const slideCount = Number(sliderValue);
    const slideRight = PipelinePageConstant.elementNames.rightArrow;
    let rightArrow = `${slideRight}`;
    if (slideCount === 10) {
      rightArrow = `${slideRight}`;
    } else if (slideCount === 20) {
      rightArrow = `${slideRight}${slideRight}`;
    } else if (slideCount === 30) {
      rightArrow = `${slideRight}${slideRight}${slideRight}`;
    }

    return rightArrow;
  }

  static noOFLeftArrow(sliderValue: string) {
    const slideCount = Number(sliderValue);
    const slideLeft = PipelinePageConstant.elementNames.leftArrow;
    let leftArrow = `${slideLeft}`;
    if (slideCount === 50) {
      leftArrow = `${slideLeft}${slideLeft}${slideLeft}`;
    } else if (slideCount === 15) {
      leftArrow = `${slideLeft}${slideLeft}${slideLeft}${slideLeft}${slideLeft}`;
    } else if (slideCount === 10) {
      leftArrow = `${slideLeft}${slideLeft}${slideLeft}${slideLeft}${slideLeft}${slideLeft}`;
    }

    return leftArrow;
  }

  static verifyJobCards(key: string) {
    StepLogger.subVerification('Verify job cards displayed');
    PipelinePage.pipeline.pipelineHeader.vItem.then((cards: JQuery<HTMLElement>) => {
      cy.setLocalStorage(key, String(cards.length));
    });
  }

  static resetSlider() {
    StepLogger.subStep('Reset the Slider');
    PipelinePage.pipeline.sliderMinimum.vItem.type(PipelinePageConstant.elementNames.leftArrow);
    const rightArrow = PipelinePageConstant.elementNames.rightArrow;
    PipelinePage.pipeline.sliderMaximum.vItem.type(`${rightArrow}${rightArrow}${rightArrow}${rightArrow}${rightArrow}`);
  }

  static enterSearchQuery() {
    StepLogger.subStep('Enter Search Query');
    PipelinePage.pipeline.pipelineHeader.vItem.first().then((pipelineName: JQuery<HTMLElement>) => {
      PipelinePage.pipeline.searchBar.sendKeys(pipelineName.text().trim());
      PipelinePage.pipeline.pipelineHeader.vItem.first().then((searchedPipeline: JQuery<HTMLElement>) => {
        expect(searchedPipeline.text().trim()).to.equal(pipelineName.text().trim());
      });
      PipelinePage.pipeline.pipelineHeader.vItem.last().then((lastSearchedPipeline: JQuery<HTMLElement>) => {
        expect(lastSearchedPipeline.text().trim()).to.equal(pipelineName.text().trim());
      });
    });
  }

  url(): string {
    return EndpointHelper.jobs;
  }
}
