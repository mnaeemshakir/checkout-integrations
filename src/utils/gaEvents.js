import ReactGA from 'react-ga';

export const GASignupWithEmailEvent = () => {
  ReactGA.event({
    category: 'Signup',
    action: 'SignupWithEmail',
    label: 'User Signed up.',
    value: 1,
  });
};

export const GASignupWithGoogleEvent = () => {
  ReactGA.event({
    category: 'Signup',
    action: 'SignupWithGoogle',
    label: 'User Signed up.',
    value: 1,
  });
};

export const GASignupWithFacebookEvent = () => {
  ReactGA.event({
    category: 'Signup',
    action: 'SignupWithFacebook',
    label: 'User Signed up.',
    value: 1,
  });
};

export const GALoginWihEmailEvent = () => {
  ReactGA.event({
    category: 'Login',
    action: 'LoginWithEmail',
    label: 'User Logged in.',
    value: 1,
  });
};

export const GALoginWihGoogleEvent = () => {
  ReactGA.event({
    category: 'Login',
    action: 'LoginWithGoogle',
    label: 'User Logged in.',
    value: 1,
  });
};

export const GALoginWihFacebookEvent = () => {
  ReactGA.event({
    category: 'Login',
    action: 'LoginWithFacebook',
    label: 'User Logged in.',
    value: 1,
  });
};

export const GALogoutEvent = () => {
  ReactGA.event({
    category: 'Logout',
    action: 'Logout',
    label: 'User Logged out.',
    value: 1,
  });
};

export const GAContinueClickEvent = () => {
  ReactGA.event({
    category: 'Navigation',
    action: 'Continue',
    label: 'Continue button clicked.',
    value: 1,
  });
};

export const GAValidateCouponClickEvent = () => {
  ReactGA.event({
    category: 'Validation',
    action: 'ValidateCouponRequest',
    label: 'Validate Coupon button clicked.',
    value: 1,
  });
};

export const GAValidateCouponCompletedEvent = value => {
  ReactGA.event({
    category: 'Validation',
    action: 'CouponValidationCompleted',
    label: 'Coupon Validatation Completed with off percentage',
    value: Number(value),
  });
};

export const GAStripeSubscribeClickEvent = () => {
  ReactGA.event({
    category: 'Payment',
    action: 'StripePaymentRequest',
    label: 'Stripe Payment Clicked.',
    value: 1,
  });
};

export const GAStripeSubscribeCompletedEvent = () => {
  ReactGA.event({
    category: 'Payment',
    action: 'StripePaymentCompleted',
    label: 'Stripe Payment Completed.',
    value: 1,
  });
};

export const GAPaypalSubscribeClickEvent = () => {
  ReactGA.event({
    category: 'Payment',
    action: 'PaypalPaymentRequest',
    label: 'Paypal Payment Clicked.',
    value: 1,
  });
};

export const GAPaypalSubscribeCompletedEvent = () => {
  ReactGA.event({
    category: 'Payment',
    action: 'PaypalPaymentCompleted',
    label: 'Paypal Payment Completed.',
    value: 1,
  });
};

export const GAOnboardingEvent = ({ question, answer }) => {
  ReactGA.event({
    category: 'Onboarding',
    action: question,
    label: answer,
    value: 1,
  });
};
