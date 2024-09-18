/* eslint-disable max-len */
import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WitFacebook from 'components/common/WithFacebook';
import WithGoogle from 'components/common/WithGoogle';
import Mail from 'assets/img/Mail.svg';
import LoginForm from './LoginForm';
import styles from './Login.module.scss';

const Login = props => {
  const { validateFB, validateGoogle, setUserState, showSnackbar } = props;
  const history = useHistory();
  const { t } = useTranslation();
  const { form } = useParams();
  if (form === 'email') {
    return <LoginForm setUserState={setUserState} showSnackbar={showSnackbar} />;
  }

  return (
    <Grid container item xs={11} spacing={2} className={styles.loginRoot}>
      <Grid item xs={12}>
        <h2 className={styles.heading}>{t('login')}</h2>
      </Grid>
      <Grid item xs={12} className={styles.buttonContainer}>
        <WitFacebook label={t('loginWithFacebook')} validateFB={validateFB} />
      </Grid>
      <Grid item xs={12} className={styles.buttonContainer}>
        <WithGoogle label={t('loginWithGoogle')} validateGoogle={validateGoogle} />
      </Grid>
      <Grid item xs={12} className={styles.buttonContainer}>
        <Button
          variant="outlined"
          color="primary"
          className={`${styles.button} ${styles.outlined}`}
          onClick={() => history.push('/auth/login/email')}
        >
          <img src={Mail} alt="Mail" className={styles.icon} />
          <div className={styles.label}>{t('loginWithEmail')}</div>
        </Button>
      </Grid>
      <Grid item xs={12} className={styles.buttonContainer}>
        <p onClick={() => history.push('/onboarding')} className={styles.textBlue}>
          {t('createAnAccount')}
        </p>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  validateFB: PropTypes.func,
  validateGoogle: PropTypes.func,
  setUserState: PropTypes.func,
  showSnackbar: PropTypes.func,
};

export default Login;
