import * as types from './types';

const initialState = {
  data: {
    withFacebook: false,
    withGoogle: false,
    email: '',
    subscriptionPlan: 'free',
    firstName: '',
    uid: '',
    tokenType: '',
    client: '',
    expiry: '',
    freshPremium: false,
    freshSignup: false,
  },
  validation: {
    couponCode: '',
    email: '',
    paypalCoupon: '',
    stripeCoupon: '',
    isPremium: false,
    subscriptionPlan: 'free',
    subscriptionToken: '',
  },
  language: '',
};

const reducer = (state = initialState, action) => {
  switch (action?.type) {
    case types.USERCLEAR:
      return {
        ...initialState,
      };
    case types.USERSTATE:
      return {
        ...state,
        data: {
          ...action?.payload,
        },
      };
    case types.SET_USER_PREMIUMM:
      return {
        ...state,
        data: {
          ...state.data,
          freshPremium: true,
        },
      };
    case types.SET_USER_FRESH_SIGNUP:
      return {
        ...state,
        data: {
          ...state.data,
          freshSignup: action.data,
        },
      };
    case types.USERVALIDATION:
      return {
        ...state,
        validation: {
          ...action?.payload,
        },
      };
    case types.CLEAR_USER_VALIDATION_COUPON:
      return {
        ...state,
        validation: {
          ...state.validation,
          paypalCoupon: '',
          stripeCoupon: '',
        },
      };
    case types.SET_USER_LANGUAGE:
      return {
        ...state,
        language: action?.payload,
      };

    default:
      return state;
  }
};

export default reducer;
