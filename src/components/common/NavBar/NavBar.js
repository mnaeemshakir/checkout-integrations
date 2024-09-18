import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useGoogleLogout } from 'react-google-login';
import { googleClientId, fbAppId } from 'utils/envConstants';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import IconButton from '@material-ui/core/IconButton';
import styles from './NavBar.module.scss';
import { User, Logo, LogoShort } from '../icons';
import LanguageSelect from '../LanguageSelect';
import { isNull } from '../../../utils/utils';
import { GALogoutEvent } from '../../../utils/gaEvents';

const NavBar = ({
  type,
  user,
  darkText,
  withFacebook,
  withGoogle,
  setUserState,
  freshPremium,
  isPremium,
  hideRightPanel = false,
  showLogin = false,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const textClass = darkText ? styles.textDark : styles.textLight;
  const userIconClass = darkText ? styles.userIconDark : styles.userIcon;

  const onLogoutSuccess = () => {
    /* eslint-disable-next-line no-console */
  };

  const onFailure = () => {
    /* eslint-disable-next-line no-console */
  };

  const { signOut } = useGoogleLogout({
    googleClientId,
    onLogoutSuccess,
    onFailure,
  });
  const logoutFB = () => {
    // window.FB.logout();
    window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout());
  };
  const logout = () => {
    setUserState({});
    if (withGoogle) {
      signOut();
    }
    if (withFacebook) {
      logoutFB();
    }
    navigateToLogin();
    GALogoutEvent();
  };
  const navigateToLogin = () => {
    history.push('/auth/login');
  };
  const navigateToHome = () => {
    if (freshPremium || isPremium) {
      return;
    }
    if (isNull(user)) {
      return;
    }

    history.push('/home');
  };

  return (
    <div className={`${styles.navRoot}`}>
      <div className={styles.left}>
        <div className={styles.longLogo}>
          <Logo
            onClick={navigateToHome}
            className={`${styles.logoImage} ${type === 'home' ? styles.logoImageWhite : ''}`}
          />
        </div>
        <div className={styles.shortLogo}>
          <LogoShort
            onClick={navigateToHome}
            className={`${styles.logoImage} ${type === 'home' ? styles.logoImageWhite : ''}`}
          />
        </div>
      </div>
      {!hideRightPanel && (
        <div className={styles.right}>
          {user ? (
            <div className={styles.upperContainer}>
              <div className={styles.userContainer}>
                <User className={userIconClass} />
                <p className={`${textClass}`}>{user}</p>
              </div>
              <div role="none" className={styles.logoutContainer} onClick={logout}>
                <FacebookLogin
                  appId={fbAppId}
                  render={() => <p className={`${styles.textDark}`}>{t('Logout')}</p>}
                />
              </div>
            </div>
          ) : null}
          {showLogin ? (
            <div className={`${styles.loginContainer}`}>
              <IconButton className={styles.loginbutonstyles} onClick={navigateToLogin}>
                <p className={`${styles.textDark} ${styles.loginfont}`}>{t('login')}</p>
              </IconButton>
            </div>
          ) : null}
          <div className={styles.languageButton}>
            <LanguageSelect darkText={darkText} type={type} />
          </div>
        </div>
      )}
    </div>
  );
};

NavBar.propTypes = {
  type: PropTypes.string,
  user: PropTypes.string,
  darkText: PropTypes.bool,
  withFacebook: PropTypes.bool,
  withGoogle: PropTypes.bool,
  freshPremium: PropTypes.bool,
  isPremium: PropTypes.bool,
  setUserState: PropTypes.func,
  hideRightPanel: PropTypes.bool,
  showLogin: PropTypes.bool,
};

export default NavBar;
