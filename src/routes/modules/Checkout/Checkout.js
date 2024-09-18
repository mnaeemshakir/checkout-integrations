import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CheckoutCover from 'assets/img/CheckoutCover.svg';
import Rating from 'assets/img/4kRatings.svg';
import Downloads from 'assets/img/400PlusDownloads.svg';
import Apple from 'assets/img/AppOfTheDay.svg';
import Lock from 'assets/img/Lock.svg';
import PayPalLogo from 'assets/img/PayPalLogo.svg';
import Textfield from 'components/common/Textfield/Textfield';
import NavBar from 'components/common/NavBar';
import PriceSwitch from 'components/common/PriceSwitch';
import { useStripe } from '@stripe/react-stripe-js';
import {
  fullPrice,
  stripePlanYearly,
  severity,
  off10Price,
  off20Price,
  off30Price,
  off40Price,
  off50Price,
  off60Price,
  off75Price,
  stripePlanLifeTime,
  lifetimePrice,
  lifetimeOff10Price,
  lifetimeOff20Price,
  lifetimeOff30Price,
  lifetimeOff40Price,
  lifetimeOff50Price,
  lifetimeOff60Price,
  lifetimeOff75Price,
} from 'utils/constants';
import {
  paypalPlanFullPriceId,
  paypalPlanOff10Id,
  paypalPlanOff20Id,
  paypalPlanOff30Id,
  paypalPlanOff40Id,
  paypalPlanOff50Id,
  paypalPlanOff60Id,
  paypalPlanOff75Id,
  paypalPlanLifeTimeId,
  paypalPlanLifeTimeOff10Id,
  paypalPlanLifeTimeOff20Id,
  paypalPlanLifeTimeOff30Id,
  paypalPlanLifeTimeOff40Id,
  paypalPlanLifeTimeOff50Id,
  paypalPlanLifeTimeOff60Id,
  paypalPlanLifeTimeOff75Id,
} from 'utils/envConstants';

import { PayPalButtons } from '@paypal/react-paypal-js';
import Check from 'components/common/icons/Check';
import { Bugfender } from '@bugfender/sdk';
import {
  GAValidateCouponClickEvent,
  GAValidateCouponCompletedEvent,
  GAStripeSubscribeClickEvent,
  GAStripeSubscribeCompletedEvent,
} from 'utils/gaEvents';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './Checkout.module.scss';
import SplitForm from './Checkout.form';
import { isNull } from '../../../utils/utils';
import { subscribeStripe3Dsecure } from '../../../api/subscribe';

const inlineStyles = {
  button: {
    textTransform: 'capitalize',
  },
};

const Checkout = props => {
  const {
    stripeCoupon,
    linkEmail,
    validateCoupon,
    setCouponState,
    percentOff,
    loggedIn,
    subscribeEmailUser,
    subscribeLoginUser,
    showSnackbar,
    uid,
    tokenType,
    client,
    expiry,
    setUserPremium,
    couponId,
    language,
    clearUserValidationCoupon,
    setUserFreshSignup,
    isPremium,
    validateUser,
    setUserPaypalToken,
    userPaypalToken,
    userName,
    userEmail,
  } = props;
  const history = useHistory();
  const { t } = useTranslation();
  const [option, setOption] = React.useState('card');
  const [discountCode, setDiscountCode] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeStripePlan, setActiveStripePlan] = React.useState(stripePlanYearly);
  const [activePlan, setActivePlan] = React.useState('yearly');
  const [priceList, setPriceList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const formRef = React.createRef();
  const stripe = useStripe();

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

  React.useEffect(() => {
    if (!loggedIn && isNull(linkEmail)) {
      history.push('/');
      return;
    }
    if (isPremium) {
      navigateToSuccess();
      return;
    }
    if (!isNull(userPaypalToken)) {
      callSubscribeLoginUser(userPaypalToken, 'paypal');
    }
  }, []);

  React.useEffect(() => {
    setDiscountCode(stripeCoupon);
  }, [stripeCoupon]);

  React.useEffect(() => {
    setActiveStripePlan(activePlan === 'yearly' ? stripePlanYearly : stripePlanLifeTime);
    generatePiceList();
  }, [activePlan, language, percentOff]);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigateToLogin();
  };

  const generatePiceList = () => {
    const yearly = {
      id: 'yearly',
      price: fullPrice,
      duration: t('twelveMonths'),
      description: t('recurringPayment'),
      toogleTag: t('bestValue'),
    };
    const lifetime = {
      id: 'lifetime',
      price: lifetimePrice,
      duration: t('lifetime'),
      description: t('oneTime'),
    };

    yearly.discountPrice = discounts().yearlyOff;
    lifetime.discountPrice = discounts().lifeTimeOff;

    setPriceList([yearly, lifetime]);
  };

  const onPaypalSubscribeApprove = data => {
    const token = {
      id: data.subscriptionID,
      card: { country: '' },
    };
    handleSubscribe(token, 'paypal');
  };

  const subscriptionCreation = (data, actions, planId) => {
    return actions.subscription.create({
      plan_id: planId,
    });
  };
  const isPlanYearly = () => activePlan === 'yearly';

  const discounts = () => {
    const yearlyPlan = activePlan === 'yearly';
    switch (percentOff) {
      case 10:
        return {
          yearlyOff: off10Price,
          lifeTimeOff: lifetimeOff10Price,
          planId: yearlyPlan ? paypalPlanOff10Id : paypalPlanLifeTimeOff10Id,
        };
      case 20:
        return {
          yearlyOff: off20Price,
          lifeTimeOff: lifetimeOff20Price,
          planId: yearlyPlan ? paypalPlanOff20Id : paypalPlanLifeTimeOff20Id,
        };
      case 30:
        return {
          yearlyOff: off30Price,
          lifeTimeOff: lifetimeOff30Price,
          planId: yearlyPlan ? paypalPlanOff30Id : paypalPlanLifeTimeOff30Id,
        };
      case 40:
        return {
          yearlyOff: off40Price,
          lifeTimeOff: lifetimeOff40Price,
          planId: yearlyPlan ? paypalPlanOff40Id : paypalPlanLifeTimeOff40Id,
        };
      case 50:
        return {
          yearlyOff: off50Price,
          lifeTimeOff: lifetimeOff50Price,
          planId: yearlyPlan ? paypalPlanOff50Id : paypalPlanLifeTimeOff50Id,
        };
      case 60:
        return {
          yearlyOff: off60Price,
          lifeTimeOff: lifetimeOff60Price,
          planId: yearlyPlan ? paypalPlanOff60Id : paypalPlanLifeTimeOff60Id,
        };
      case 75:
        return {
          yearlyOff: off75Price,
          lifeTimeOff: lifetimeOff75Price,
          planId: yearlyPlan ? paypalPlanOff75Id : paypalPlanLifeTimeOff75Id,
        };
      default:
        return {
          planId: yearlyPlan ? paypalPlanFullPriceId : paypalPlanLifeTimeId,
        };
    }
  };

  const onPlanChange = plan => {
    setActivePlan(plan);
  };

  const navigateToSuccess = () => {
    setUserPremium();
    history.push('/success');
  };

  const navigateToLogin = () => {
    history.push('/auth/login');
  };

  const handleStripeSubscribe = async () => {
    Bugfender.setDeviceKey('user_email', userEmail || linkEmail);
    Bugfender.info('trace started for stripe');
    setIsLoading(true);
    GAStripeSubscribeClickEvent();
    const stripeData = await formRef.current.onSubscribe();
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: stripeData,
      billing_details: {
        email: linkEmail || userEmail,
        name: userName,
      },
    });
    if (!loggedIn) {
      Bugfender.info('emailed user going in email flow');
      validateUser({ email: linkEmail })
        .then(() => {
          stripePaymentMethodHandler(true, result, stripeData);
        })
        .catch(err => {
          showSnackbar({ message: err.error_message, severity: severity.error });
          setIsLoading(false);
        });
    } else {
      Bugfender.info('logged in user going in log in flow');
      stripePaymentMethodHandler(false, result, stripeData);
    }
  };

  const call3DSecureApi = async (isEmail, result, elements) => {
    subscribeLoginUser({
      isEmail,
      loginInfo: {
        tokenType,
        client,
        expiry,
        uid,
      },
      query: {
        payment_method_id: result.paymentMethod.id,
        plan: activeStripePlan,
        coupon: couponId,
        country: result.paymentMethod.card.country,
        payment_provider: 'stripe',
        lifetime: !isPlanYearly(),
        currency: 'EUR',
        ...(isEmail && { email: linkEmail }),
      },
    })
      .then(res => {
        const { data } = res;
        handleServerResponse(data, elements, result.paymentMethod.card.country);
      })
      .catch(err => {
        Bugfender.error(`3D secure status getting failed${JSON.stringify(err)}`);
        setIsLoading(false);
        if (String(err).includes('Login Failed')) {
          onSessionTimeout('');
          return;
        }
        setUserPaypalToken(null);
        showSnackbar({ message: err.error_message, severity: severity.error });
      });
  };

  const stripePaymentMethodHandler = async (isEmail, result, elements) => {
    setIsLoading(true);
    if (result.error) {
      Bugfender.error(`error occured after creating payment:${JSON.stringify(result.error)}`);
      showSnackbar({ message: t('invalidCardDetails'), severity: severity.error });
      setIsLoading(false);
    } else {
      Bugfender.info('calling api for login user to get 3D secure Status');
      call3DSecureApi(isEmail, result, elements);
    }
  };

  const handleServerResponse = async (response, elements, countryStripe) => {
    if (response?.error) {
      Bugfender.error(
        `Error returned from 3D status getting api${JSON.stringify(response?.error)}`,
      );
      showSnackbar({ message: t('invalidCardDetails'), severity: severity.error });
      setIsLoading(false);
    } else if (response?.requires_action) {
      Bugfender.info('action required');
      const { error: errorAction, paymentIntent } = await stripe.confirmCardPayment(
        response.payment_intent_client_secret,
        {
          payment_method: {
            card: elements,
          },
        },
      );
      if (paymentIntent && paymentIntent?.status === 'succeeded') {
        Bugfender.info('success dIntent intent calling final api');
        subscribeStripe3Dsecure({
          loginInfo: {
            tokenType,
            client,
            expiry,
            uid,
          },
          query: {
            payment_intent_id: paymentIntent.id,
            subscription_id: response.subscription_id,
            lifetime: !isPlanYearly(),
            coupon: couponId,
            country: countryStripe,
          },
        })
          .then(data => {
            if (data?.data?.success) {
              Bugfender.info('success dIntent in final call');
              navigateToSuccess();
              setIsLoading(false);
            }
            setUserPaypalToken(null);
            GAStripeSubscribeCompletedEvent();
          })
          .catch(error => {
            Bugfender.error(`final call failed with${JSON.stringify(error)}`);
          });
      } else if (errorAction) {
        Bugfender.error(`Error action${JSON.stringify(errorAction.decline_code)}`);
        showSnackbar({ message: t('invalidCardDetails'), severity: severity.error });
        setIsLoading(false);
      }
    } else if (response?.success) {
      Bugfender.error('No 3D is required payment success');
      navigateToSuccess();
      setIsLoading(false);
      setUserPaypalToken(null);
      GAStripeSubscribeCompletedEvent();
    }
  };
  const onSessionTimeout = token => {
    setUserPaypalToken(token);
    handleDialogOpen(true);
  };

  const callSubscribeLoginUser = async (token, payment_provider) => {
    subscribeLoginUser({
      loginInfo: {
        tokenType,
        client,
        expiry,
        uid,
      },
      query: {
        subscription_id: token.id,
        plan: activeStripePlan,
        coupon: couponId,
        country: token.card.country,
        payment_provider,
        lifetime: !isPlanYearly(),
        currency: 'EUR',
      },
    })
      .then(res => {
        const { data } = res;
        if (data.success) {
          navigateToSuccess();
          setIsLoading(false);
        }
        setUserPaypalToken(null);
        GAStripeSubscribeCompletedEvent();
      })
      .catch(err => {
        setIsLoading(false);
        if (String(err).includes('Login Failed')) {
          onSessionTimeout(token);
          return;
        }
        setUserPaypalToken(null);
        showSnackbar({ message: err.error_message, severity: severity.error });
      });
  };

  const handleSubscribe = async (token, payment_provider) => {
    setIsLoading(true);
    if (!loggedIn) {
      validateUser({ email: linkEmail })
        .then(validation => {
          subscribeEmailUser({
            subscription_id: token.id,
            plan: activeStripePlan,
            coupon: stripeCoupon,
            email: linkEmail,
            subscription_token: validation.data.subscription_token,
            country: token.card.country,
            payment_provider,
            lifetime: !isPlanYearly(),
            currency: 'EUR',
          })
            .then(res => {
              const { data } = res;
              if (data.success) {
                navigateToSuccess();
                setIsLoading(false);
              }
            })
            .catch(err => {
              showSnackbar({ message: err.error_message, severity: severity.error });
              setIsLoading(false);
            });
        })
        .catch(err => {
          showSnackbar({ message: err.error_message, severity: severity.error });
          setIsLoading(false);
        });
    } else {
      callSubscribeLoginUser(token, payment_provider);
    }
  };

  const ValidateDiscuountCode = () => {
    GAValidateCouponClickEvent();
    validateCoupon({ coupon: discountCode })
      .then(res => {
        const { data } = res;
        setCouponState({
          percentOff: data.percent_off,
          id: data.id,
          name: data.name,
          valid: data.valid,
        });
        GAValidateCouponCompletedEvent(data.percent_off);
      })
      .catch(() => {
        showSnackbar({ message: t('invalidCoupon'), severity: severity.error });
        setDiscountCode('');
        setCouponState({
          percentOff: 0,
          id: '',
          name: '',
          valid: false,
        });
      });
  };
  const handleCodeChange = e => {
    setDiscountCode(e.target.value);
  };

  return (
    <Grid container direction="row" className={styles.checkoutRoot}>
      <Grid item sm={12}>
        <NavBar darkText />
      </Grid>
      <Grid
        item
        container
        align="center"
        justifyContent="center"
        alignItems="center"
        className={styles.mainContainer}
      >
        <Grid item container xs={12} sm={9} md={6} className={styles.leftContainer}>
          {/* <div className={styles.}> */}
          <div className={styles.imageContainer}>
            <img src={CheckoutCover} alt="checkout" width="60%" className={styles.image} />
          </div>
          <Grid className={styles.textContainer}>
            <Grid className={`${styles.headerContiner} ${styles.contentContainer}`}>
              <p className={styles.heading}>{t('bestInvestment')}</p>
            </Grid>
            <Grid className={styles.descriptionContainer}>
              <Grid
                item
                xs={12}
                alignItems="center"
                className={`${styles.itemContainer} ${styles.contentContainer}`}
              >
                <Check className={styles.icon} />
                <p className={styles.text}>{t('personalizedCoaching')}</p>
              </Grid>

              <Grid
                item
                xs={12}
                alignItems="center"
                className={`${styles.itemContainer} ${styles.contentContainer}`}
              >
                <Check className={styles.icon} />
                <p className={styles.text}>{t('fullAccess')}</p>
              </Grid>

              <Grid
                item
                xs={12}
                alignItems="center"
                className={`${styles.itemContainer} ${styles.contentContainer}`}
              >
                <Check className={styles.icon} />
                <p className={styles.text}>{t('freshTrainingContent')}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={styles.swithcContainer}>
            <PriceSwitch onPlanChange={onPlanChange} priceList={priceList} discount={percentOff} />
          </Grid>

          <Grid className={styles.textContainer}>
            <Grid
              item
              xs={12}
              alignItems="center"
              className={`${styles.itemContainer} ${styles.contentContainer}`}
            >
              <p className={styles.guaranteeText}>{t('moneybackGuarantee')}</p>
            </Grid>
          </Grid>
          <Grid
            item
            sm={12}
            container
            align="center"
            justifyContent="center"
            alignItems="center"
            className={styles.badgeContainer}
          >
            <Grid className={styles.imageSizing} item>
              <img src={Rating} alt="4k rating" />
            </Grid>
            <Grid item className={styles.imageSizing}>
              <img src={Apple} alt="Apple apps" color="#000000" />
            </Grid>
            <Grid className={styles.imageSizing} item>
              <img src={Downloads} alt="400k downloads" />
            </Grid>
          </Grid>
          {/* </div> */}
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={9}
          md={6}
          className={styles.rightContainer}
          justifyContent="center"
          alignItems="center"
          align="center"
        >
          <Grid item container xs={12} sm={9} spacing={0} className={styles.fromContainer}>
            <RadioGroup
              name="payment-option"
              value={option}
              onChange={({ target: { value } }) => setOption(value)}
              className={styles.radioGroup}
            >
              <div className={styles.selectionLabel}>
                <FormControlLabel value="card" control={<Radio />} label={t('creditCard')} />
                <div className={styles.labelImage}>
                  <img src={Lock} alt="Secure" />
                  <p>{t('secure')}</p>
                </div>
              </div>

              {option === 'card' ? (
                <Grid
                  item
                  container
                  spacing={2}
                  justifyContent="center"
                  className={styles.topSpacing}
                  style={{ paddingBottom: '1rem' }}
                >
                  <Grid item xs={12} sm={12}>
                    <SplitForm ref={formRef} />
                  </Grid>
                </Grid>
              ) : null}
              <div className={styles.divider} />
              <div className={styles.selectionLabel}>
                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                <img src={PayPalLogo} alt="Paypal" />
              </div>
            </RadioGroup>
            {loggedIn && <div className={styles.divider} />}

            {loggedIn && (
              <Grid
                item
                container
                justifyContent="center"
                xs={12}
                sm={12}
                className={`${styles.containerCode}`}
              >
                <Textfield
                  label=""
                  placeholder={t('discountCode')}
                  name="discountCode"
                  className={`${styles.fieldMedium} `}
                  value={discountCode}
                  onChange={handleCodeChange}
                />
                <Button
                  variant="text"
                  color="primary"
                  disabled={isLoading}
                  className={`${styles.button}`}
                  onClick={ValidateDiscuountCode}
                >
                  {t('validate')}
                </Button>
              </Grid>
            )}
            <Grid
              container
              item
              justifyContent="center"
              xs={12}
              sm={12}
              className={styles.buttonContainer}
            >
              {option === 'card' && (
                <Button
                  variant="contained"
                  color="primary"
                  className={`${styles.button} ${styles.contained} ${styles.buttonFullWidth}`}
                  disabled={isLoading}
                  onClick={handleStripeSubscribe}
                >
                  {t('subscribe')}
                  {isLoading && (
                    <div className={styles.marginProgress}>
                      <CircularProgress />
                    </div>
                  )}
                </Button>
              )}
              {option === 'paypal' && (
                <div className={styles.radioGroup}>
                  <PayPalButtons
                    disabled={isLoading}
                    style={{
                      color: 'black',
                      height: 55,
                      shape: 'pill',
                      tagline: false,
                      label: 'pay',
                    }}
                    forceReRender={[percentOff]}
                    fundingSource="paypal"
                    createSubscription={(data, actions) =>
                      subscriptionCreation(data, actions, discounts().planId)
                    }
                    onApprove={onPaypalSubscribeApprove}
                  />
                </div>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={9} md={6} className={styles.footer}>
            <p>
              {t('checkoutTermsAndContitionsStart')}{' '}
              <a href="google.com" className={styles.link}>
                {t('checkoutTermsOfService')}
              </a>{' '}
              {t('checkoutTermsAndContitionsMid')}{' '}
              <a href="google.com" className={styles.link}>
                {t('checkoutDataUsePolicy')}
              </a>{' '}
              {t('checkoutTermsAndContitionsEnd')}
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown disableBackdropClick>
        <DialogTitle id="alert-dialog-title">{t('sessionExpired')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{t('relogin')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus style={inlineStyles.button}>
            {t('login')}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

Checkout.propTypes = {
  loggedIn: PropTypes.bool,
  isPremium: PropTypes.bool,
  stripeCoupon: PropTypes.string,
  linkEmail: PropTypes.string,
  // subscriptionToken: PropTypes.string,
  validateCoupon: PropTypes.func,
  setCouponState: PropTypes.func,
  percentOff: PropTypes.number,
  subscribeLoginUser: PropTypes.func,
  subscribeEmailUser: PropTypes.func,
  showSnackbar: PropTypes.func,
  setUserPremium: PropTypes.func,
  couponId: PropTypes.string,
  uid: PropTypes.string,
  tokenType: PropTypes.string,
  client: PropTypes.string,
  expiry: PropTypes.string,
  language: PropTypes.string,
  clearUserValidationCoupon: PropTypes.func,
  setUserFreshSignup: PropTypes.func,
  validateUser: PropTypes.func,
  setUserPaypalToken: PropTypes.func,
  userPaypalToken: PropTypes.object,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
};

export default Checkout;
