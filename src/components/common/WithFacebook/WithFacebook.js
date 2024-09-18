import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { fbAppId } from 'utils/envConstants';
import { useHistory } from 'react-router-dom';
import Facebook from 'assets/img/Facebook.svg';
import { setToStorage } from 'utils/storage';
import { isNull } from 'utils/utils';
import styles from './WithFacebook.module.scss';
import { GALoginWihFacebookEvent } from '../../../utils/gaEvents';

const WithFacebook = props => {
  const { label, validateFB, setUserState, onSignupComplete } = props;
  const history = useHistory();

  const responseFacebook = response => {
    if (isNull(response.accessToken)) {
      return;
    }

    validateFB({ access_token: response.accessToken }).then(res => {
      const { loggedIn, data, loginInfo } = res;
      if (loggedIn) {
        setUserState({
          withFacebook: true,
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
        GALoginWihFacebookEvent();
      }
    });
  };
  return (
    <div className={styles.withFacrbookRoot}>
      <FacebookLogin
        appId={fbAppId}
        autoLoad={false}
        fields="name, email, picture"
        scope="public_profile, email"
        callback={responseFacebook}
        render={renderProps => (
          <Button
            variant="outlined"
            color="primary"
            className={`${styles.button} ${styles.outlined} ${styles.facebookBackgrond} `}
            onClick={renderProps.onClick}
          >
            <img src={Facebook} alt="Facebook" className={styles.icon} />
            <div>{label}</div>
          </Button>
        )}
      />
    </div>
  );
};

WithFacebook.propTypes = {
  validateFB: PropTypes.func,
  label: PropTypes.string,
  setUserState: PropTypes.func,
  onSignupComplete: PropTypes.func,
};

export default WithFacebook;
