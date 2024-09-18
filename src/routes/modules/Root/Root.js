import React from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isNull } from 'utils/utils';

const Root = props => {
  const {
    isPremium,
    validateUser,
    setUserValidation,
    user,
    clearSnackbar,
    clearUser,
    clearCoupon,
  } = props;

  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const email = params.get('email');
  const coupon = params.get('coupon');

  const setValidations = validation => {
    setUserValidation(validation);
  };

  const RedirectToPath = path => {
    history.push(path);
  };

  const RedirectToLogin = () => {
    setValidations({
      couponCode: '',
      paypalCoupon: '',
      stripeCoupon: '',
      isPremium: false,
      subscriptionPlan: 'free',
    });
    RedirectToPath('/auth/login');
  };
  const redirectToSuccess = () => {
    RedirectToPath('/success');
  };
  const clearAppState = () => {
    clearSnackbar();
    clearUser();
    clearCoupon();
  };

  if (!isNull(email)) {
    clearAppState();
    validateUser({ email, coupon_code: coupon })
      .then(res => {
        const { data } = res;
        setValidations({
          couponCode: coupon,
          email,
          paypalCoupon: data.coupon_code_paypal,
          stripeCoupon: data.coupon_code_stripe,
          isPremium: data.is_premium,
          subscriptionPlan: data.subscription_plan,
          subscriptionToken: data.subscription_token,
        });
        if (data.is_premium) {
          redirectToSuccess();
        } else {
          RedirectToPath('/home');
        }
      })
      .catch(() => {
        RedirectToLogin();
      });
    return null;
  }
  if (isNull(user)) {
    clearAppState();
    RedirectToLogin();
    return null;
  }
  return <Redirect to={isPremium ? '/success' : '/home'} />;
};

Root.propTypes = {
  isPremium: PropTypes.bool,
  user: PropTypes.string,
  validateUser: PropTypes.func,
  setUserValidation: PropTypes.func,
  clearSnackbar: PropTypes.func,
  clearUser: PropTypes.func,
  clearCoupon: PropTypes.func,
};

export default Root;
