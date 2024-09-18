import { fetchWithQueryParams } from './baseApi';

const validationURI = 'profile/user';
const couponValidationURI = 'payments/validate_coupon';

export async function validateUser(request) {
  return fetchWithQueryParams('GET', validationURI, request).then(res => {
    if (typeof res === 'object') {
      return {
        data: res,
      };
    }
    return res;
  });
}

export async function validateCoupon(request) {
  return fetchWithQueryParams('POST', couponValidationURI, request).then(res => {
    if (typeof res === 'object') {
      return {
        data: res.coupon_data,
      };
    }
    return res;
  });
}
