import React from 'react';
import { Grid } from '@material-ui/core';
import NavBar from 'components/common/NavBar';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Onboarding from '../Onboarding';
import Login from './Login';

import styles from './Auth.module.scss';

const Auth = props => {
  const { clearSnackbar, clearUser, clearCoupon } = props;
  const clearAppState = () => {
    clearSnackbar();
    clearUser();
    clearCoupon();
  };
  const { flowType } = useParams();

  React.useEffect(() => {
    clearAppState();
  }, []);

  return (
    <Grid container className={styles.authRoot}>
      <NavBar type="auth" />
      <Grid container justifyContent="center" alignItems="center">
        {flowType === 'signup' ? <Onboarding /> : flowType === 'login' && <Login />}
      </Grid>
    </Grid>
  );
};

Auth.propTypes = {
  clearSnackbar: PropTypes.func,
  clearUser: PropTypes.func,
  clearCoupon: PropTypes.func,
};

export default Auth;
