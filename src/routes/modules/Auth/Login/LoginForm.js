/* eslint-disable max-len */
import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from 'api/login';
import styles from './Login.module.scss';
import { setToStorage } from '../../../../utils/storage';
import { isNull } from '../../../../utils/utils';
import { severity } from '../../../../utils/constants';
import { GALoginWihEmailEvent } from '../../../../utils/gaEvents';

const LoginForm = props => {
  const { setUserState, showSnackbar } = props;
  const history = useHistory();
  const { t } = useTranslation();
  const [email, setEamil] = useState();
  const [password, setPassword] = useState();

  const handleEmail = event => {
    setEamil(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const loginWithEmail = () => {
    login({ email, password })
      .then(res => {
        const { loggedIn, data, loginInfo } = res;
        if (loggedIn) {
          setUserState({
            email: data.email,
            firstName: data.first_name,
            subscriptionPlan: data.subscription_plan,
            uid: loginInfo.uid,
            tokenType: loginInfo.tokenType,
            client: loginInfo.client,
            expiry: loginInfo.expiry,
          });
          if (!isNull(loginInfo.accessToken)) {
            setToStorage('token', loginInfo.accessToken);
          }
          history.push('/');
          GALoginWihEmailEvent();
        }
      })
      .catch(err => {
        showSnackbar({ message: err.message, severity: severity.error });
      });
  };

  return (
    <Grid container item xs={10} sm={6} md={6} lg={3} spacing={2} className={styles.loginRoot}>
      <Grid item xs={12}>
        <h2 className={styles.heading}>{t('loginWithEmail')}</h2>
      </Grid>
      <Grid item xs={12} className={styles.fieldContainer}>
        <InputBase
          className={styles.field}
          placeholder="Email"
          name="email"
          fullWidth
          onChange={handleEmail}
        />
      </Grid>
      <Grid item xs={12} className={styles.fieldContainer}>
        <InputBase
          className={styles.field}
          onChange={handlePassword}
          placeholder={t('Password')}
          name="password"
          type="password"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} className={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={`${styles.button} ${styles.contained}`}
          onClick={loginWithEmail}
        >
          <div className={styles.label}>{t('login')}</div>
        </Button>
      </Grid>
      <Grid item xs={12} className={styles.buttonContainer}>
        <p onClick={() => history.push('/auth/signup')} className={styles.textBlue}>
          {t('createAnAccount')}
        </p>
      </Grid>
    </Grid>
  );
};

LoginForm.propTypes = {
  setUserState: PropTypes.func,
  showSnackbar: PropTypes.func,
};

export default LoginForm;
