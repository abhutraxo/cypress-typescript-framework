export class LoginPageConstant {
  static readonly attributes = Object.freeze({
    classes: {
      loginHeader: 'login-header',
      avatarImage: 'user-image',
      menu: 'menu',
      userMenu: 'xo-user-menu',
      menuItem: 'menu-item',
      loginButton: 'login-button',
      oldLoginButton: 'df-button',
      error: 'mat-error',
      notification: 'snackbar-error',
      clickHereLink: 'login-action',
      forgotPassWordHeader: 'login-label',
      resetPasswordButton: 'reset-password-button',
      successNotification: 'snackbar-success',
    },
    formNameControlName: {
      username: 'username',
      password: 'password',
    },
  });

  static readonly elementNames = Object.freeze({
    loginHeader: 'Login',
    username: 'Username',
    password: 'Password',
    avatarImage: 'Avatar Image',
    menu: 'menu',
    logOut: 'Candidate Log out',
    loginButton: 'LOGIN',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    invalidEmail: 'Please enter a valid email',
    invalidUsernamePassword: 'Invalid username and/or password!',
    forgotPassword: 'Forgot Password?',
    clickHere: 'Click Here',
    passwordRecovery: 'Password Recovery',
    resetPassword: 'RESET PASSWORD',
    noAssociatedAccount: "We're sorry, we could not find any account associated with the email address you specified.",
    passwordSent: 'Your new password has been sent to you over email!',
    loginHere: 'Login Here',
  });
}
