/* eslint-disable max-len */
import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signup } from 'api/signup';
import TermsPolicyFooter from 'components/common/TermsPolicyFooter';
import styles from './Signup.module.scss';
import { isNull } from '../../../../utils/utils';
import { setToStorage } from '../../../../utils/storage';
import { severity } from '../../../../utils/constants';
import { GASignupWithEmailEvent } from '../../../../utils/gaEvents';

const SignupForm = props => {
  const { setUserState, showSnackbar, onSignupComplete } = props;
  const history = useHistory();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');

  const handleName = event => {
    setName(event.target.value);
  };

  const handleEmail = event => {
    setEamil(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const signupWithEmail = () => {
    signup({ first_name: name, email, password })
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
            freshSignup: true,
          });
          if (!isNull(loginInfo.accessToken)) {
            setToStorage('token', loginInfo.accessToken);
          }
          // history.push('/onboarding');
          if (onSignupComplete) {
            onSignupComplete();
          }
          GASignupWithEmailEvent();
        }
      })
      .catch(err => {
        let message = '';
        const { errors } = err;
        message = errors.full_messages[0];
        showSnackbar({ message, severity: severity.error });
      });
  };
  return (
    <>
      <Grid className={styles.signupRoot}>
        <div className={styles.signupDivider}>
          <div className={styles.signupForm}>
            <Grid container item spacing={2}>
              <Grid item xs={12}>
                <h2 className={styles.heading}>{t('signUpWithEmail')}</h2>
              </Grid>
              <Grid item xs={12} className={styles.fieldContainer}>
                <InputBase
                  className={styles.field}
                  placeholder={t('firstName')}
                  name="name"
                  fullWidth
                  onChange={handleName}
                />
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
                  placeholder={t('Password')}
                  name="password"
                  type="password"
                  fullWidth
                  onChange={handlePassword}
                />
              </Grid>
              <Grid item xs={12} className={styles.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  className={`${styles.button} ${styles.contained}`}
                  onClick={signupWithEmail}
                >
                  <div className={styles.label}>{t('Signup')}</div>
                </Button>
              </Grid>
              <Grid item xs={12} className={styles.buttonContainer}>
                <p onClick={() => history.push('/auth/login')} className={styles.textBlue}>
                  {t('alreadyHaveAnAccount')}
                </p>
              </Grid>
            </Grid>
          </div>
          <TermsPolicyFooter />
        </div>
      </Grid>
    </>
  );
};

SignupForm.propTypes = {
  setUserState: PropTypes.func,
  showSnackbar: PropTypes.func,
  onSignupComplete: PropTypes.func,
};

export default SignupForm;
