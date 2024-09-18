import React from 'react';
import Grid from '@material-ui/core/Grid';
// import NavBar from 'components/common/NavBar';
import Calculating from 'assets/img/onboarding/Calculating.png';
import { useTranslation } from 'react-i18next';
import LinearProgress from '@material-ui/core/LinearProgress';
// import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

// import ReactGA from 'react-ga';
import styles from './FinalizeOnboarding.module.scss';

const FinalizeOnboarding = () => {
  // const {
  // } = props;
  // const history = useHistory();
  const { t } = useTranslation();

  return (
    <Grid container justifyContent="center" className={styles.root}>
      <Grid item xs={12} className={styles.contentContainer}>
        <p className={`${styles.heading} ${styles.textDark}`}>{t('calculatingJourney')}</p>
      </Grid>
      <Grid
        item
        container
        align="center"
        justifyContent="center"
        alignItems="center"
        className={styles.badgeContainer}
      >
        <img src={Calculating} alt="very sad" />
      </Grid>
      <Grid item xs={12} className={styles.contentContainer}>
        <Grid item className={styles.happinessLevel}>
          <span className={`${styles.text} ${styles.textDark}`}>Happiness Level</span>
          <span className={`${styles.text} ${styles.textLight}`}>Bad</span>
        </Grid>
        <LinearProgress
          variant="determinate"
          value={10}
          classes={{
            root: styles.progressBar,
            bar: styles.bar,
          }}
        />
      </Grid>
    </Grid>
  );
};

FinalizeOnboarding.propTypes = {
  // loggedIn: PropTypes.bool,
  // stripeCoupon: PropTypes.string,
  // validateCoupon: PropTypes.func,
  // setCouponState: PropTypes.func,
  // percentOff: PropTypes.number,
  // clearUserValidationCoupon: PropTypes.func,
};

export default FinalizeOnboarding;
