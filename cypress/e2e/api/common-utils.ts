export class CommonUtils {
  static getCleanObject(jsonObject: any) {
    const clone = JSON.parse(JSON.stringify(jsonObject));
    for (const prop in clone) {
      if (clone[prop] == null) {
        delete clone[prop];
      }
    }
    return JSON.stringify(clone);
  }
}
