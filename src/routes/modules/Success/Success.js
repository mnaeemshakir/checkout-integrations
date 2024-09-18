import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import NavBar from 'components/common/NavBar';
import doorImageLight from 'assets/img/DoorNoBack.svg';
import DownloadIphone from 'assets/img/DownloadIphone.svg';
import DownloadAndroid from 'assets/img/DownloadAndroid.svg';
import styles from './Success.module.scss';

const Success = props => {
  const { isPremium } = props;
  const { t } = useTranslation();
  const toAppleStore = () => {
    window.open('https://apps.apple.com/us/app/mindshine-mental-fitness/id1436991158', '_blank');
  };
  const toAppStore = () => {
    window.open(
      'https://play.google.com/store/apps/details?id=app.mindshine&hl=en&gl=US',
      '_blank',
    );
  };
  const successTexts = {
    congrats: t(isPremium ? 'premiumUser' : 'unlockMindShine'),
    headToApp: t(isPremium ? 'premiumText' : 'headToApp'),
  };

  return (
    <Grid container direction="row" className={styles.successRoot}>
      <NavBar type="auth" darkText />
      <div className={styles.contentContainer}>
        <Grid
          xs={10}
          sm={6}
          md={4}
          lg={4}
          xl={3}
          item
          container
          justifyContent="center"
          alignContent="center"
          className={styles.mainContainer}
        >
          <Grid item className={`${styles.imageContainer} ${styles.contentSpacing}`}>
            <img src={doorImageLight} alt="checkout" width="100%" className={styles.imageLight} />
          </Grid>
          <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
            <p className={styles.heading}>{successTexts.congrats}</p>
          </Grid>
          <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
            <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
              {successTexts.headToApp}
            </p>
          </Grid>
          <Grid
            item
            sm={12}
            container
            align="center"
            justifyContent="center"
            alignItems="center"
            className={`${styles.badgeContainer} ${styles.contentSpacing} ${styles.contentWidth}`}
          >
            <Grid item className={styles.smallImageContainer} onClick={toAppleStore}>
              <img className={styles.imageSizing} src={DownloadIphone} alt="Apple store" />
            </Grid>
            <Grid className={styles.smallImageContainer} item onClick={toAppStore}>
              <img className={styles.imageSizing} src={DownloadAndroid} alt="Play store" />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

Success.propTypes = {
  isPremium: PropTypes.bool,
};

export default Success;
