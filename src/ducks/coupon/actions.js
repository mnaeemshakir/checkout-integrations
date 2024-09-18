import { createAction } from '../utils/actions';
import { COUPONSTATE, COUPONSTATECLEAR } from './types';

export const clearCoupon = createAction(COUPONSTATECLEAR);
export const setCouponState = createAction(COUPONSTATE);
