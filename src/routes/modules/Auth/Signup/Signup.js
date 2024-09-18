/* eslint-disable max-len */
import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Mail from 'assets/img/Mail.svg';
import WitFacebook from 'components/common/WithFacebook';
import WithGoogle from 'components/common/WithGoogle';
import TermsPolicyFooter from 'components/common/TermsPolicyFooter';
import styles from './Signup.module.scss';
import SignupForm from './SignupForm';

const Signup = props => {
  const {
    validateFB,
    validateGoogle,
    setUserState,
    showSnackbar,
    withEmail,
    setWithEmail,
    onSignupComplete,
  } = props;
  const history = useHistory();

  const { t } = useTranslation();

  if (withEmail) {
    return (
      <SignupForm
        setUserState={setUserState}
        showSnackbar={showSnackbar}
        onSignupComplete={onSignupComplete}
      />
    );
  }
  return (
    <>
      <Grid className={styles.signupRoot}>
        <div className={styles.signupDivider}>
          <div className={styles.signupForm}>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12}>
                <h2 className={styles.heading}>{t('createYourAccount')}</h2>
              </Grid>
              <Grid item xs={12} className={styles.buttonContainer}>
                <WitFacebook
                  label={t('signUpWithFacebook')}
                  validateFB={validateFB}
                  onSignupComplete={onSignupComplete}
                />
              </Grid>
              <Grid item xs={12} className={styles.buttonContainer}>
                <WithGoogle
                  label={t('signUpWithGoogle')}
                  validateGoogle={validateGoogle}
                  onSignupComplete={onSignupComplete}
                />
              </Grid>

              <Grid item xs={12} className={styles.buttonContainer}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={`${styles.button} ${styles.outlined}`}
                  onClick={() => setWithEmail(true)}
                >
                  <img src={Mail} alt="Mail" className={styles.icon} />
                  <div className={styles.label}>{t('signUpWithEmail')}</div>
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

Signup.propTypes = {
  validateFB: PropTypes.func,
  validateGoogle: PropTypes.func,
  setUserState: PropTypes.func,
  showSnackbar: PropTypes.func,
  withEmail: PropTypes.bool,
  setWithEmail: PropTypes.func,
  onSignupComplete: PropTypes.func,
};

export default Signup;
