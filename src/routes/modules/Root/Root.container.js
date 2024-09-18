import React from 'react';
import { validateUser } from 'api/userValidation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'ducks/user/actions';
import * as snackbarActions from 'ducks/snackbar/actions';
import * as couponActions from 'ducks/coupon/actions';
import { selectors as userSelectors } from 'ducks/user/selectors';
import Root from './Root';

const mapStateToProps = state => ({
  user: userSelectors(state).email,
  isPremium: userSelectors(state).isPremium,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserValidation: userActions.setUserValidation,
      clearSnackbar: snackbarActions.clearSnackbar,
      clearUser: userActions.clearUser,
      clearCoupon: couponActions.clearCoupon,
    },
    dispatch,
  );

const ConnectedComponent = props => {
  return <Root {...props} validateUser={validateUser} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);
