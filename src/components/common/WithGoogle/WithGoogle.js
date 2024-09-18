import React from 'react';
import GoogleLogin from 'react-google-login';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Google from 'assets/img/Google.svg';
import { setToStorage } from 'utils/storage';
import { isNull } from 'utils/utils';
import styles from './WithGoogle.module.scss';
import { GALoginWihGoogleEvent } from '../../../utils/gaEvents';

const WithGoogle = props => {
  const { label, validateGoogle, setUserState, onSignupComplete } = props;
  const history = useHistory();

  const onSuccess = response => {
    validateGoogle({ access_token: response.accessToken }).then(res => {
      const { loggedIn, data, loginInfo } = res;
      if (loggedIn) {
        setUserState({
          withGoogle: true,
          email: data.email,
          firstName: data.first_name,
          subscriptionPlan: data.subscription_plan,
          uid: loginInfo.uid,
          tokenType: loginInfo.tokenType,
          client: loginInfo.client,
          expiry: loginInfo.expiry,
          freshSignup: data.just_created,
        });
        if (!isNull(loginInfo.accessToken)) {
          setToStorage('token', loginInfo.accessToken);
        }
        if (data.just_created) {
          if (onSignupComplete) {
            onSignupComplete();
          }
        } else {
          history.push('/');
        }
        GALoginWihGoogleEvent();
      }
    });
  };

  const onFailure = () => {
    /* eslint-disable-next-line no-console */
  };
  return (
    <div className={styles.withGoogleRoot}>
      <GoogleLogin
        prompt="consent"
        render={renderProps => (
          <Button
            variant="outlined"
            color="primary"
            className={`${styles.button} ${styles.outlined}`}
            onClick={renderProps.onClick}
          >
            <img src={Google} alt="Google" className={styles.icon} />
            <div>{label}</div>
          </Button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

WithGoogle.propTypes = {
  validateGoogle: PropTypes.func,
  label: PropTypes.string,
  setUserState: PropTypes.func,
  onSignupComplete: PropTypes.func,
};

export default WithGoogle;
