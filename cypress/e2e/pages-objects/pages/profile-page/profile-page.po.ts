import { ComponentHelpers } from '../../../components/component-helpers/component-helpers';
import { $, $$ } from '../../../components/misc-utils/df-elements-helper';

import { ProfilePagesConstants } from './profile-page.constants';

const {
  attributes: { classes, formControlName: fNames },
  elementNames: eNames,
} = ProfilePagesConstants;
export class ProfilePage {
  static readonly profile = Object.freeze({
    get userLocation() {
      return $(`[class*='${classes.userLocation}']`, eNames.userLocation);
    },

    get userTimeZone() {
      return $(`[class*='${classes.userTimeZone}']`, eNames.userTimeZone);
    },

    get phoneNumber() {
      return $(`[class*='${classes.phone}']`, eNames.phone);
    },

    get email() {
      return $(`[class*='${classes.email}']`, eNames.email);
    },

    get linkedIn() {
      return $(`[class*='${classes.linkedIn}']`, eNames.linkedIn);
    },

    get resume() {
      return $(`[class*='${classes.resume}']`, eNames.resume);
    },

    get welcomeDialog() {
      return cy.cssContainingText(`[class*='${classes.takeTourDialogTitle}']`, eNames.takeTourTitle);
    },

    get takeTourButton() {
      return cy.contains(`[class*='${classes.button}']`, eNames.takeTour);
    },

    get followRecommendationDialog() {
      return cy.cssContainingText(`[class*='${classes.takeTourDialogTitle}']`, eNames.followRecommendation);
    },

    get nextButton() {
      return cy.contains(`[class*='${classes.button}']`, eNames.next);
    },

    get followProgressDialog() {
      return cy.cssContainingText(`[class*='${classes.takeTourDialogTitle}']`, eNames.followProgress);
    },

    get finishButton() {
      return cy.contains(`[class*='${classes.button}']`, eNames.finish);
    },

    get myApplicationTab() {
      return cy.cssContainingText("[role='tab']", eNames.myApplication);
    },

    get myProfileTab() {
      return cy.cssContainingText("[role='tab']", eNames.myProfile);
    },

    get jobApplicationHeader() {
      return cy.cssContainingText(`[class*='${classes.header}']`, eNames.jobApplication);
    },

    jobApplicationName(positionName: string) {
      return $$(
        `//*[contains(text(), '${eNames.jobApplication}')]/parent::div/
        following-sibling::table/tbody/tr
        /td[contains(@class,'${classes.roleColumn}') and contains(., '${positionName}')]`,
        positionName,
      );
    },

    jobApplicationStatus(positionName: string) {
      return $$(
        `//*[contains(text(), '${eNames.jobApplication}')]/parent::div/
        following-sibling::table/tbody/tr/td[contains(@class,'${classes.roleColumn}') and contains(., '${positionName}')]
        /following-sibling::td[contains(@class, 'Application')]`,
        `${positionName} status`,
      );
    },

    get candidateTimeline() {
      return cy.cssContainingText(`[class*='${classes.candidateTimeline}']`, eNames.candidateTimeline);
    },

    get appliedFor() {
      return cy.cssContainingText(`[class*='${classes.candidateTimelineDescription}']`, eNames.appliedFor);
    },

    get createAccount() {
      return cy.cssContainingText(`[class*='${classes.candidateTimelineDescription}']`, eNames.createAccount);
    },

    get appliedForDate() {
      return $$(
        `//*[contains(text(), '${eNames.appliedFor}')]
      /span[contains(@class, '${classes.timelineDate}')]`,
        `${eNames.appliedFor} date`,
      );
    },

    get createAccountDate() {
      return $$(
        `//*[contains(text(), '${eNames.createAccount}')]
        /span[contains(@class, '${classes.timelineDate}')]`,
        `${eNames.createAccount} date`,
      );
    },

    get skillBadgeAddButton() {
      return cy
        .cssContainingText(`[class*='${classes.badgesHeadline}']`, eNames.skillBadge)
        .parent('div')
        .children('div')
        .children()
        .children('a')
        .children('div');
    },

    get realWorkBadgeAddButton() {
      return cy
        .cssContainingText(`[class*='${classes.badgesHeadline}']`, eNames.realWorkBadge)
        .parent('div')
        .children('div')
        .children()
        .children('a')
        .children('div');
    },

    get realBadgeHeading() {
      return cy.cssContainingText(`[class*='${classes.badgesHeadline}']`, eNames.realWorkBadge);
    },

    get skillBadgeHeading() {
      return cy.cssContainingText(`[class*='${classes.badgesHeadline}']`, eNames.skillBadge);
    },

    get introductionHeader() {
      return $$(
        `//*[${ComponentHelpers.getXPathFunctionForClass(classes.infoHeader, true)}]
        /div[contains(@class, 'headline') and contains(text(), '${eNames.introduction}')]`,
        eNames.introduction,
      );
    },

    get workExperience() {
      return $$(
        `//*[${ComponentHelpers.getXPathFunctionForClass(classes.infoHeader, true)}]
      /div[contains(@class, 'headline') and contains(text(), '${eNames.workExperience}')]`,
        eNames.workExperience,
      );
    },

    get education() {
      return $$(
        `//*[${ComponentHelpers.getXPathFunctionForClass(classes.infoHeader, true)}]
      /div[contains(@class, 'headline') and contains(text(), '${eNames.education}')]`,
        eNames.education,
      );
    },

    get addSectionButton() {
      return $(`[class*='${classes.addSectionButton}']`, eNames.addSection);
    },

    get addIntroButton() {
      return cy.cssContainingText(`[class*='${classes.matButton}']`, eNames.introduceYourself);
    },

    get addWorkExperience() {
      return cy.cssContainingText(`[class*='${classes.matButton}']`, eNames.addWorkExp);
    },

    get addEduction() {
      return cy.cssContainingText(`[class*='${classes.matButton}']`, eNames.addEduction);
    },

    get sectionMenu() {
      return $(`div[class*='${classes.sectionMenu}']`, eNames.sectionMenu);
    },

    actionSectionMenuItems(option: string) {
      return cy.cssContainingText(`[class*='${classes.sectionMenuItem}']`, option);
    },

    get recommendedJobHeader() {
      return cy.cssContainingText(`[class*='${classes.header}']`, eNames.recommendedJobs);
    },

    recommendedColumnHeader(header: string) {
      return $$(
        `//*[contains(text(), '${eNames.recommendedJobs}')]/parent::div/following-sibling::table/
        thead/tr/th[contains(text(), '${header}')]`,
        header,
      );
    },

    recommendedJobName(pipelineName: string) {
      return $$(
        `//*[contains(text(), '${eNames.recommendedJobs}')]/parent::div/following-sibling::table/
      tbody/tr/td[contains(@class, '${eNames.role}')]/
        a[contains(@class,'${classes.pipelineName}') and contains(text(), '${pipelineName}')]`,
        pipelineName,
      );
    },

    recommendedJobNextStep(pipelineName: string) {
      return cy
        .cssContainingText(`[class*='${classes.header}']`, eNames.recommendedJobs)
        .parent('div')
        .next('table')
        .children('tbody')
        .contains('tr', `${pipelineName}`)
        .children(`td[class*='${classes.applicationStatus}']`)
        .children('div')
        .contains('button', 'APPLY');
    },
    get failedNotification() {
      return $(`[class*='${classes.failedNotification}']`, 'Failed notification');
    },

    get FailedNotificationText() {
      return $(`[class*='${classes.failedNotification}'] app-snackbar`, eNames.failedMessage);
    },

    get activeBadge() {
      return $$(
        `//div[contains(@class, 'mobile-none')]/*/
      *[contains(@class, '${classes.badgeIcon}') and contains(@class, '${classes.activeBadge}')]`,
        'Active Badge',
      );
    },

    get warningNotification() {
      return $(`[class*='${classes.warningNotification}']`, 'Warning notification');
    },

    get warningNotificationText() {
      return $(`[class*='${classes.warningNotification}'] app-snackbar`, 'Warning Notification');
    },

    badgeName(name: string) {
      return $$(
        `//div[contains(@class, 'badges-container-item')]
      /*[contains(@class, '${classes.badgeName}') and contains(text(), '${name}')]`,
        name,
      );
    },

    badgeActiveStars(name: string) {
      return $$(
        `//div[contains(@class, 'badges-container-item')]
      /div[contains(@class, '${classes.badgeName}') and contains(text(), '${name}')]
      /following-sibling::app-stars`,
        `${name} Stars`,
      );
    },

    badgeInActiveStars(name: string) {
      return $$(
        `//div[contains(@class, 'badges-container-item')]
      /div[contains(@class, '${classes.badgeName}') and contains(text(), '${name}')]
      /following-sibling::app-stars/*/i[contains(@class, '${classes.inactiveStar}')]"`,
        `${name} Stars`,
      );
    },

    retryBadge(positionName: string) {
      return $$(
        `//td[contains(@class, 'role-column') and contains(., '${positionName}')]
      /following-sibling::td/*/div[contains(@class, 'mobile-none')]/*/*[contains(@class, '${classes.badgeIcon}')
      and contains(@class, '${classes.retryBadge}')]`,
        `${positionName} retry badge`,
      );
    },

    successBadge(positionName: string) {
      return $$(
        `//td[contains(@class, 'role-column') and contains(., '${positionName}')]
      /following-sibling::td/*/div[contains(@class, 'mobile-none')]/*/*[contains(@class, '${classes.badgeIcon}')
      and contains(@class, '${classes.successBadge}')]`,
        `${positionName} success badge`,
      );
    },

    get badgeStarInDescription() {
      return cy.get("[class*='badge-info-container-body'] div[class*='badge-info-container-sidebar'] app-stars");
    },

    get successNotification() {
      return $(`[class*='${classes.successNotification}']`, 'Success notification');
    },

    get successNotificationText() {
      return $(`[class*='${classes.successNotification}'] app-snackbar`, 'Success Notification');
    },

    get badgeDetails() {
      return $("[class*='badge-info-container-main']", 'Badge Descriptions');
    },

    get earnThisBadgeButton() {
      return cy.cssContainingText(`[class*='${classes.startButton}']`, eNames.earnThisBadge);
    },

    get startButton() {
      return cy.cssContainingText(`[class*='${classes.startButton}']`, eNames.start);
    },

    get takeTheTestButton() {
      return cy.cssContainingText(`[class*='${classes.actionButton}']`, eNames.takeTheTest);
    },
    get switchUIMessage() {
      return cy.cssContainingText(`td[class*='${classes.skillColumn}'] span`, eNames.switchUIMessage);
    },

    get hereLink() {
      return $(`[class*='${classes.skillColumn}'] span a`, 'here link');
    },

    get applicationHeader() {
      return $(`[class*='${classes.applicationHeader}']`, eNames.applicationFor);
    },

    get otherApplicationButton() {
      return $$(`//div[contains(@class, '${classes.otherApplication}')]/following-sibling::button`, eNames.otherApplication);
    },

    get saveButton() {
      return cy.cssContainingText(`[class*='${classes.startButton}']`, eNames.save);
    },

    get descriptionTextArea() {
      return $(`[formcontrolname*='${fNames.description}']`, fNames.description);
    },

    dialogHeading(header: string) {
      return cy.cssContainingText(`[class*='${classes.headerContent}']`, header);
    },

    get introduction() {
      return $(`[class*='${classes.introduction}']`, 'Introduction');
    },

    get introEditButton() {
      return $$(
        `//div[contains(@class, '${classes.infoHeader}') and contains(.,'Introduction')]/div/button[contains(., 'Edit')]`,
        'Intro Edit Button',
      );
    },

    get title() {
      return $(`[formcontrolname='${fNames.title}']`, 'Title');
    },

    get company() {
      return $(`[formcontrolname='${fNames.company}']`, 'Company');
    },

    get startDate() {
      return $(`[placeholder='${eNames.startDateFormat}']`, 'Start Date');
    },

    get workExDescription() {
      return $(`[formcontrolname='${fNames.workExpDescription}']`, 'Work Exp Description');
    },

    get ongoingJob() {
      return $(`[formcontrolname='${fNames.currentJob}']`, 'Current job');
    },

    get companyUrl() {
      return $(`[formcontrolname='${fNames.companyUrl}']`, 'Company Url');
    },

    get workExpTitle() {
      return $(`span[class*='${classes.companyTitle}']`, 'title');
    },

    get addedWorkExperience() {
      return $(`[class*='${classes.workExpDescription}']`, 'Added Description');
    },

    get workExpEditButton() {
      return $$(
        `//*[contains(@class, '${classes.infoHeader}') and contains(., '${eNames.workExperience}')]
      /following-sibling::div[contains(@class, 'record-type')]
      /div/div[@class='${classes.actionButtons}']/button[contains(., 'Edit')]`,
        'Work Exp Edit Buttons',
      );
    },

    get workExpDelButton() {
      return $$(
        `//*[contains(@class, '${classes.infoHeader}') and contains(., '${eNames.workExperience}')]
      /following-sibling::div[contains(@class, 'record-type')]
      /div/div[@class='${classes.actionButtons}']/button[contains(., 'Delete')]`,
        'Work Exp Delete Buttons',
      );
    },

    get degree() {
      return $(`[formcontrolname='${fNames.degree}']`, 'Degree');
    },

    get grade() {
      return $(`[formcontrolname='${fNames.grade}']`, 'Grades');
    },

    get educationEditButton() {
      return $$(
        `//*[contains(@class, '${classes.infoHeader}') and contains(., '${eNames.education}')]
      /following-sibling::div[contains(@class, 'record-type')]
      /div/div[@class='${classes.actionButtons}']/button[contains(., 'Edit')]`,
        'Education Edit Buttons',
      );
    },

    get educationDelButton() {
      return $$(
        `//*[contains(@class, '${classes.infoHeader}') and contains(., '${eNames.education}')]
      /following-sibling::div[contains(@class, 'record-type')]
      /div/div[@class='${classes.actionButtons}']/button[contains(., 'Delete')]`,
        'Education Delete Buttons',
      );
    },

    get educationTitle() {
      return $$(
        `//*[contains(@class, 'information-headline') and contains(., 'Education')]
      /following-sibling::div[contains(@class, 'record-type')]
      /div[contains(@class, 'record-type__header')]/div[contains(@class, '${classes.companyTitle}')]`,
        'Education Title',
      );
    },

    get educationDescription() {
      return $$(
        `//*[contains(@class, 'information-headline') and contains(., 'Education')]
      /following-sibling::div[contains(@class, 'record-type')]
      /div[contains(@class, 'record-type__desc')]`,
        'Education Description',
      );
    },

    addSectionMenuItems(option: string) {
      return $$(`//*[contains(@class, 'section-menu')]/div/button[contains(text(), '${option}')]`, option);
    },

    sectionHeader(sectionName: string) {
      return $$(`//*[contains(@class, '${classes.infoHeader}') and contains(., '${sectionName}')]`, sectionName);
    },

    sectionActionButton(sectionName: string, sectionButton: string) {
      return $$(
        `//*[contains(@class, '${classes.infoHeader}') and contains(., '${sectionName}')]
      /div/button[contains(., '${sectionButton}')]`,
        sectionButton,
      );
    },

    get associatedWith() {
      return $(`[formcontrolname='${fNames.associatedWith}']`, 'Associated with');
    },

    get awardTitle() {
      return $$(
        `//*[contains(@class, '${classes.infoHeader}') and contains(., 'Award')]
      /following-sibling::div[contains(@class, 'record-type')]
      /div[contains(@class, 'record-type__header')]`,
        'Award Title',
      );
    },

    get awardDescription() {
      return $$(
        `//*[contains(@class, '${classes.infoHeader}') and contains(., 'Award')]
      /following-sibling::div[contains(@class, 'record-type')]
      /div[contains(@class, 'record-type__desc')]`,
        'Award Description',
      );
    },

    get credentialsId() {
      return $(`[formcontrolname='${fNames.credentialId}']`, 'Credentials Id');
    },

    sectionDescription(sectionName: string) {
      return $$(
        `//*[contains(@class, '${classes.infoHeader}') and contains(., '${sectionName}')]
      /following-sibling::div[contains(@class, 'record-type')]
      /div[contains(@class, 'record-type__desc')]`,
        `${sectionName} Description`,
      );
    },

    sectionTitle(sectionName: string) {
      return $$(
        `//*[contains(@class, '${classes.infoHeader}') and contains(., '${sectionName}')]
      /following-sibling::div[contains(@class, 'record-type')]
      /div[contains(@class, 'record-type__header')]`,
        `${sectionName} Title`,
      );
    },

    get realWorkBadgePlusButton() {
      return $$(
        `//div[contains(@class, '${classes.badgesHeadline}') and contains(text(), '${eNames.realWorkBadge}')]
        /parent::div/div/*/a`,
        'Real Work Plus Sign',
      );
    },

    get failedZeroStarNotification() {
      return $(`[class*='${classes.failedZeroStarNotification}']`, 'Failed Zero Star notification');
    },
  });
}
