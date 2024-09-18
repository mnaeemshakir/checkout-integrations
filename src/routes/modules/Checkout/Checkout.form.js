import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import Grid from '@material-ui/core/Grid';

import styles from './Checkout.module.scss';

const SplitForm = (_, ref) => {
  const { t } = useTranslation();
  const elements = useElements();
  const options = {
    style: {
      base: {
        fontSize: '16px',
        letterSpacing: '0.025em',
        fontFamily: 'DM Sans, sans-serif',
        '::placeholder': {
          fontFamily: 'DM Sans, sans-serif',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '16px',
          color: '#a2a2a2',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  React.useImperativeHandle(ref, () => ({
    async onSubscribe() {
      // if (!stripe || !elements) {
      //   // Stripe.js has not loaded yet. Make sure to disable
      //   // form submission until Stripe.js has loaded.
      //   return null;
      // }
      const card = elements.getElement(CardNumberElement);
      // const tokenPayload = await stripe.createToken(card);
      return card;
    },
  }));

  return (
    <form>
      <Grid item container spacing={2} justifyContent="center">
        <Grid item justifyContent="center" xs={12} sm={12}>
          <CardNumberElement
            options={{
              style: options.style,
              classes: {
                base: styles.textfieldRoot,
              },
              placeholder: t('cardNumber'),
            }}
          />
        </Grid>
        <Grid item container xs={12} sm={12} direction="row" className={styles.containerSmall}>
          <div className={styles.fieldSmall}>
            <CardExpiryElement
              options={{
                style: options.style,
                classes: {
                  base: styles.textfieldRoot,
                },
                placeholder: t('date'),
              }}
            />
          </div>
          <div className={styles.fieldSmall}>
            <CardCvcElement
              options={{
                style: options.style,
                classes: {
                  base: styles.textfieldRoot,
                },
                placeholder: t('CVC'),
              }}
            />
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.forwardRef(SplitForm);
