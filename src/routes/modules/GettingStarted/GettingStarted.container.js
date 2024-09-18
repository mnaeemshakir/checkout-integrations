import React from 'react';
import { validateCoupon } from 'api/userValidation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as couponActions from 'ducks/coupon/actions';
import { selectors as userSelectors } from 'ducks/user/selectors';
import { selectors as couponSelectors } from 'ducks/coupon/selectors';
import GettingStarted from './GettingStarted';

const mapStateToProps = state => ({
  stripeCoupon: userSelectors(state).stripeCoupon,
  loggedIn: userSelectors(state).loggedIn,
  percentOff: couponSelectors(state).percentOff,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCouponState: couponActions.setCouponState,
    },
    dispatch,
  );

const ConnectedComponent = props => {
  return <GettingStarted {...props} validateCoupon={validateCoupon} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);
