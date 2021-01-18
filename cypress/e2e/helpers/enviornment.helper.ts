export class EnvironmentHelper {
  static readonly stagingPosition = 'Test Position Staging Profile';
  static readonly prodPosition = 'Test Position Production Profile';
  static readonly sandPosition = 'Test Position Sandbox Profile';
  static base = Cypress.env('server_instance');

  static checkAgainstEnv(verificationFunc: (positionName: string) => any) {
    if (this.base?.includes('prod')) {
      verificationFunc(this.prodPosition);
    } else if (this.base?.includes('sand')) {
      verificationFunc(this.sandPosition);
    } else {
      verificationFunc(this.stagingPosition);
    }
  }

  static checkActiveBadges(verificationFunc: (positionName: string, badgeName: string) => any, badgeName: string) {
    if (this.base?.includes('prod')) {
      verificationFunc(this.prodPosition, badgeName);
    } else if (this.base?.includes('sand')) {
      verificationFunc(this.sandPosition, badgeName);
    } else {
      verificationFunc(this.stagingPosition, badgeName);
    }
  }

  static checkSuccessNotification(verificationFunc: (positionName: string, message: string) => any, message: string) {
    if (this.base?.includes('prod')) {
      verificationFunc(this.prodPosition, message);
    } else if (this.base?.includes('sand')) {
      verificationFunc(this.sandPosition, message);
    } else {
      verificationFunc(this.stagingPosition, message);
    }
  }

  static checkCompletedBadges(
    verificationFunc: (positionName: string, badgeName: string, badgeOrder: string) => any,
    badgeName: string,
    badgeOrder: string,
  ) {
    if (this.base?.includes('prod')) {
      verificationFunc(this.prodPosition, badgeName, badgeOrder);
    } else if (this.base?.includes('sand')) {
      verificationFunc(this.sandPosition, badgeName, badgeOrder);
    } else {
      verificationFunc(this.stagingPosition, badgeName, badgeOrder);
    }
  }
}
