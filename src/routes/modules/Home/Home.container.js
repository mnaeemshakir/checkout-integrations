import React from 'react';
import { validateCoupon } from 'api/userValidation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as couponActions from 'ducks/coupon/actions';
import { selectors as userSelectors } from 'ducks/user/selectors';
import * as userActions from 'ducks/user/actions';
import { selectors as couponSelectors } from 'ducks/coupon/selectors';
import Home from './Home';

const mapStateToProps = state => ({
  stripeCoupon: userSelectors(state).stripeCoupon,
  loggedIn: userSelectors(state).loggedIn,
  percentOff: couponSelectors(state).percentOff,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCouponState: couponActions.setCouponState,
      clearUserValidationCoupon: userActions.clearUserValidationCoupon,
      setUserFreshSignup: userActions.setUserFreshSignup,
    },
    dispatch,
  );

const ConnectedComponent = props => {
  return <Home {...props} validateCoupon={validateCoupon} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);
