import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'ducks/user/actions';
import * as snackbarActions from 'ducks/snackbar/actions';
import * as couponActions from 'ducks/coupon/actions';
import Auth from './Auth';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearSnackbar: snackbarActions.clearSnackbar,
      clearUser: userActions.clearUser,
      clearCoupon: couponActions.clearCoupon,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Auth);
