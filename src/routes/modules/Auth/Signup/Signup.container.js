import React from 'react';
import { validateFB, validateGoogle } from 'api/loginWith';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'ducks/user/actions';
import * as snackbarActions from 'ducks/snackbar/actions';
import Signup from './Signup';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserState: userActions.setUserState,
      showSnackbar: snackbarActions.showSnackbar,
    },
    dispatch,
  );

const ConnectedComponent = props => {
  return <Signup {...props} validateFB={validateFB} validateGoogle={validateGoogle} />;
};

export default connect(undefined, mapDispatchToProps)(ConnectedComponent);
