export enum SSOLoginStatus {
  Microsoft = 1,
  Google = 2,
  Okta = 3,
  Type = 1,
  TenantCount = 2,
  StatusCode = 200,
}
export enum LoginStatus {
  success = 200,
  ErrorEmail = 204,
}
export enum CognitoHostedUIIdentityProvider {
  Cognito = 'COGNITO',
  Google = 'Google',
  Facebook = 'Facebook',
  Microsoft = 'Microsoft',
  MicrosoftSSO = 'microsoft',
  Okta = 'Okta',
  Amazon = 'LoginWithAmazon',
  Apple = 'SignInWithApple',
}
export const LoginLabel = {
  Sign_in: 'Sign in',
  Remember_me: 'Remember me',
  Forgot_password: 'Forgot your password?',
  sign_with: 'Or sign in with',
  Start_today: 'Start for free today',
  Continue: 'Continue',
  Reset_Password: 'Reset Password',
  Go_back: 'Go back to sign in',
  ForgotPassword: 'Forgot your password?',
  Need_account: 'Need an account?',
  Log_account: 'Log in to your account',
  organization: 'Select Organisation',
  password_reset: 'Submit password reset',
  Email_address: 'Email address',
  Create_account: 'Create your trial account',
  No_required: 'No credit card required',
  Terms_Conditions: 'Terms & Conditions.',
  Privacy_Policy: 'Privacy Policy',
  Let_go: "Let's go",
  Thank_Website: 'Thank You for visiting our Website',
  Ok: 'Ok',
  registered_E_mail:
    'You will shortly receive the login details to your registered E-mail',
  clicking_Sign_up: `By clicking on Sign up {"Let's go"} you agree to HybridHero's`,
  please_read_HybridHero:
    "To learn more about how HybridHero collects, uses, shares and protects your data please read HybridHero's",
  Terms_service: 'Terms of service',
  Last_updated: 'Last updated 11 July 2022 ',
  Accept: 'Accept',
  Decline: 'Decline',
  PSWError:
    'The password you entered is not recognized. If you have forgotten your password, ' +
    "select 'Forgot your password? option to reset it.",
  EmailError:
    'The username you provided is not recognised. Please check your username and try again.',
};
