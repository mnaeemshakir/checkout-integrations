import { isNull } from 'utils/utils';

export const selectors = ({ user }) => ({
  email: user.data.email,
  uid: user.data.uid,
  tokenType: user.data.tokenType,
  client: user.data.client,
  expiry: user.data.expiry,
  withGoogle: user.data.withGoogle,
  withFacebook: user.data.withFacebook,
  stripeCoupon: user.validation.stripeCoupon,
  linkEmail: user.validation.email,
  subscriptionToken: user.validation.subscriptionToken,
  freshPremium: user.data.freshPremium,
  freshSignup: user.data.freshSignup,
  isPremium:
    user.data.subscriptionPlan === 'premium' || user.validation.subscriptionPlan === 'premium',
  loggedIn: !isNull(user.data.email),
  language: user.language,
  userName: user.data.first_name,
});
