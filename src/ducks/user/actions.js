import { createAction } from '../utils/actions';
import {
  USERSTATE,
  USERVALIDATION,
  USERCLEAR,
  SET_USER_PREMIUMM,
  CLEAR_USER_VALIDATION_COUPON,
  SET_USER_FRESH_SIGNUP,
  SET_USER_LANGUAGE,
} from './types';

export const clearUser = createAction(USERCLEAR);
export const setUserState = createAction(USERSTATE);
export const setUserValidation = createAction(USERVALIDATION);
export const setUserPremium = createAction(SET_USER_PREMIUMM);
export const clearUserValidationCoupon = createAction(CLEAR_USER_VALIDATION_COUPON);
export const setUserFreshSignup = createAction(SET_USER_FRESH_SIGNUP);
export const setUserLanguage = createAction(SET_USER_LANGUAGE);
