export class PipelinePageConstant {
  static readonly attributes = Object.freeze({
    classes: {
      pipelineContent: 'pipelines-content',
      roleTypeHeader: 'family-title',
      positionHeader: 'pipeline-card-header',
      pipelineName: 'name',
      applyButton: 'apply-button',
      roleTypeFilter: 'mat-chip-list',
      compensationSlider: 'rate-slider',
      pipelineCard: 'app-pipeline-details',
      roleType: 'mat-chip',
      checkMark: 'far fa-check',
      minimumSlider: 'slider-pointer-min',
      maximumSlider: 'slider-pointer-max',
    },
    formControlName: {
      search: 'jobSearch',
    },
  });

  static readonly elementNames = Object.freeze({
    pipelinePage: 'Pipeline Page',
    pipelineHeader: 'Pipeline Header',
    pipelineName: 'Pipeline Name',
    applyButton: 'APPLY',
    compensationFilter: 'Compensation Filter',
    pipelineCard: 'Pipeline Card',
    roleTypeFilter: 'Role Filter',
    engineering: 'Engineering',
    finance: 'Finance',
    all: 'All',
    sliderMin: 'Slider Minimum',
    sliderMax: 'Slider Maximum',
    _10k: '5',
    _20k: '10',
    _30k: '15',
    _60K: '30',
    _100K: '50',
    _200K: '100',
    rightArrow: '{rightarrow}',
    leftArrow: '{leftarrow}',
  });
}
