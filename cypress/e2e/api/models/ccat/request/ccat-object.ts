import { CommonUtils } from '../../../common-utils';

import { AssessmentResult } from './assessment-data';
import { CcatData } from './ccat-data';

export class CcatObject {
  constructor() {
    this.ccatModel = new CcatData();
    this.assessmentModel = new AssessmentResult();
  }
  ccatModel: CcatData;
  assessmentModel: AssessmentResult;

  static getFormattedDate(dayOffset = 0, monthOffset = 0, yearOffset = 0, delimeter = '-') {
    const today = new Date();
    let hour: string;
    let min: string;
    let seconds: string;
    let timeString: string;

    const dateString = `${today.getFullYear() + yearOffset}${delimeter}${today.getMonth() +
      1 +
      monthOffset}${delimeter}${today.getDate() + dayOffset}`;

    if (today.getUTCHours() < 10) {
      hour = `0${today.getUTCHours()}`;
    } else {
      hour = `${today.getUTCHours()}`;
    }

    if (today.getUTCMinutes() < 10) {
      min = `0${today.getUTCMinutes()}`;
    } else {
      min = `${today.getUTCMinutes()}`;
    }

    if (today.getUTCSeconds() < 10) {
      seconds = `0${today.getUTCSeconds()}`;
    } else {
      seconds = `${today.getUTCSeconds()}`;
    }

    timeString = `${hour}:${min}:${seconds}`;
    return `${dateString} ${timeString}`;
  }

  static getFormattedDateTime(delimiter = '-') {
    const today = new Date();
    let hour: string;
    let min: string;
    let seconds: string;
    let timeString: string;
    let date: string;

    if (today.getDate() < 10) {
      date = `0${today.getDate()}`;
    } else {
      date = `${today.getDate()}`;
    }

    const dateString = `${today.getFullYear()}${delimiter}${today.getMonth() + 1}${delimiter}${date}`;

    if (today.getUTCHours() < 10) {
      hour = `0${today.getUTCHours()}`;
    } else {
      hour = `${today.getUTCHours()}`;
    }

    if (today.getUTCMinutes() < 10) {
      min = `0${today.getUTCMinutes()}`;
    } else {
      min = `${today.getUTCMinutes()}`;
    }

    if (today.getUTCSeconds() < 10) {
      seconds = `0${today.getUTCSeconds()}`;
    } else {
      seconds = `${today.getUTCSeconds()}`;
    }

    timeString = `${hour}:${min}:${seconds}`;
    return `${dateString}T${timeString}`;
  }

  createCCATData(rawScore: number, eventId: string, orderId: string) {
    this.assessmentModel.rawScore = rawScore;
    this.assessmentModel.submissionDate = CcatObject.getFormattedDate();
    this.assessmentModel.eventId = eventId;
    this.assessmentModel.orderId = orderId;
    this.assessmentModel.testId = 'CCAT';
    this.ccatModel.assessmentResult = this.assessmentModel;

    return CommonUtils.getCleanObject(this.ccatModel);
  }
}
