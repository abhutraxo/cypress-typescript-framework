import { $, $$ } from '../../../components/misc-utils/df-elements-helper';

import { PipelinePageConstant } from './pipeline-page.constant';

const {
  attributes: { classes, formControlName: fNames },
  elementNames: eNames,
} = PipelinePageConstant;
export class PipelinePage {
  static readonly pipeline = Object.freeze({
    get pipelinePage() {
      return $(`[class*='${classes.pipelineContent}']`, eNames.pipelinePage);
    },

    roleType(roleName: string) {
      return cy.cssContainingText(`[class*='${classes.roleType}']`, roleName);
    },

    get pipelineCard() {
      return $(`${classes.pipelineCard}`, eNames.pipelineCard);
    },

    get pipelineHeader() {
      return $(`[class*='${classes.positionHeader}']`, eNames.pipelineHeader);
    },

    get applyButton() {
      return cy.cssContainingText(`[class*='${classes.applyButton}']`, eNames.applyButton);
    },

    get compensationFilter() {
      return $(`[class*='${classes.compensationSlider}']`, eNames.compensationFilter);
    },

    get roleFilter() {
      return $(`[class*='${classes.roleTypeFilter}']`, eNames.roleTypeFilter);
    },

    get searchBar() {
      return $(`[formcontrolname='${fNames.search}']`, 'Search Bar');
    },

    selectedIcon(roleType: string) {
      return $$(
        `//*[contains(@class, '${classes.roleType}') and contains(., '${roleType}')]/i[contains(@class, '${classes.checkMark}')]`,
        `${roleType} icon check mark`,
      );
    },

    get sectionHeader() {
      return $(`[class*='${classes.roleTypeHeader}']`, 'Role type header');
    },

    sectionType(sectionName: string) {
      return cy.cssContainingText(`[class*='${classes.roleTypeHeader}']`, sectionName);
    },

    get sliderMinimum() {
      return $(`span[class*='${classes.minimumSlider}']`, eNames.sliderMin);
    },

    get sliderMaximum() {
      return $(`span[class*='${classes.maximumSlider}']`, eNames.sliderMax);
    },

    get pipelineName() {
      return $$(
        `//div[contains(@class, '${classes.positionHeader}')]/div/div[contains(@class, '${classes.pipelineName}')]`,
        eNames.pipelineName,
      );
    },
  });
}
