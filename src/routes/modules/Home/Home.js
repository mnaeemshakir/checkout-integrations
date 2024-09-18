import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import doorImageDark from 'assets/img/DoorBack.svg';
import doorImageLight from 'assets/img/LightTealDoor.svg';
import Check from 'components/common/icons/Check';
import NavBar from 'components/common/NavBar';
import { off30Price, off50Price, fullPrice } from 'utils/constants';
import { GAContinueClickEvent } from 'utils/gaEvents';
// import ReactGA from 'react-ga';
import styles from './Home.module.scss';

const Home = props => {
  const {
    stripeCoupon,
    validateCoupon,
    setCouponState,
    percentOff,
    loggedIn,
    clearUserValidationCoupon,
    setUserFreshSignup,
  } = props;
  React.useEffect(() => {
    setUserFreshSignup(false);
    if (!loggedIn) {
      validateCoupon({ coupon: stripeCoupon })
        .then(res => {
          const { data } = res;
          setCouponState({
            percentOff: data.percent_off,
            id: data.id,
            name: data.name,
            valid: data.valid,
          });
        })
        .catch(() => {
          setCouponState({
            percentOff: 0,
            id: '',
            name: '',
            valid: false,
          });
          clearUserValidationCoupon();
        });
    }
  }, []);
  const history = useHistory();
  const { t } = useTranslation();
  const discounts = () => {
    switch (percentOff) {
      case 30:
        return {
          getMindShine: t('off30Percent'),
          offPrice: off30Price,
          subscribeEnd: t('subscribeEnd'),
          continue: t('redeemOffer'),
        };
      case 50:
        return {
          getMindShine: t('off50Percent'),
          offPrice: off50Price,
          subscribeEnd: t('subscribeEnd'),
          continue: t('redeemOffer'),
        };
      default:
        return {
          getMindShine: t('getMindShine'),
          offPrice: fullPrice,
          subscribeEnd: t('subscribeEndYear'),
          continue: t('continue'),
          hideFullPrice: true,
        };
    }
  };
  const handleContinueClick = () => {
    history.push('/checkout');
    GAContinueClickEvent();
  };

  return (
    <Grid container justifyContent="center" className={styles.homeRoot}>
      <NavBar type="home" />
      <Grid
        item
        container
        xs={10}
        sm={6}
        md={6}
        lg={3}
        justifyContent="center"
        alignContent="center"
        className={styles.container}
        spacing={2}
      >
        <Grid item container xs={12} justifyContent="center" className={styles.imageContainer}>
          <img src={doorImageDark} alt="checkout" className={styles.imageDark} />
          <img src={doorImageLight} alt="checkout" className={styles.imageLight} />
        </Grid>
        <Grid item xs={12} className={styles.contentContainer}>
          <p className={styles.heading}>{discounts().getMindShine}</p>
        </Grid>
        <Grid item xs={12} className={styles.contentContainer}>
          <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
            {t('enjoyFullYear')}
          </p>
        </Grid>
        <Grid container item align="start" alignItems="start" className={styles.contentContainer}>
          <p className={`${styles.text} ${styles.textBold}`}>{t('unlimitedAccess')}</p>
        </Grid>
        <Grid
          item
          xs={12}
          alignItems="center"
          className={`${styles.itemContainer} ${styles.contentContainer}`}
        >
          <Check className={styles.icon} />
          <p className={styles.text}>{t('coachingPlans')}</p>
        </Grid>
        <Grid
          item
          xs={12}
          alignItems="center"
          className={`${styles.itemContainer} ${styles.contentContainer}`}
        >
          <Check className={styles.icon} />
          <p className={styles.text}>{t('dailyRoutine')}</p>
        </Grid>
        <Grid
          item
          xs={12}
          alignItems="center"
          className={`${styles.itemContainer} ${styles.contentContainer}`}
        >
          <Check className={styles.icon} />
          <p className={styles.text}>{t('SOSExercise')}</p>
        </Grid>
        <Grid item xs={12} alignItems="center" className={styles.contentContainer}>
          <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
            {t('subscribeStart')} <br />
            {!discounts().hideFullPrice && <del> {fullPrice}</del>}{' '}
            <b className={styles.textDark}>{discounts().offPrice}</b>
            {discounts().subscribeEnd}
          </p>
        </Grid>

        <Grid item xs={12} alignItems="center" className={styles.contentContainer}>
          <Button
            variant="contained"
            className={`${styles.button} ${styles.contained}`}
            onClick={handleContinueClick}
          >
            <div className={styles.label}>{discounts().continue} </div>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  loggedIn: PropTypes.bool,
  stripeCoupon: PropTypes.string,
  validateCoupon: PropTypes.func,
  setCouponState: PropTypes.func,
  percentOff: PropTypes.number,
  clearUserValidationCoupon: PropTypes.func,
  setUserFreshSignup: PropTypes.func,
};

export default Home;
