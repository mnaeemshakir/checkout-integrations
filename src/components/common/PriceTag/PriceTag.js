/* eslint-disable max-len */
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DiscountFifty from 'assets/img/DiscountFifty.svg';
import DiscountThirty from 'assets/img/DiscountThirty.svg';
import DiscountFiftyGerman from 'assets/img/DiscountFiftyGerman.svg';
import DiscountThirtyGerman from 'assets/img/DiscountThirtyGerman.svg';
import styles from './PriceTag.module.scss';

const PriceTag = ({ price, discount, discountedPrice }) => {
  const { t } = useTranslation();
  const imageMap = {
    DiscountFifty,
    DiscountThirty,
    DiscountFiftyGerman,
    DiscountThirtyGerman,
  };
  return (
    <Grid className={styles.priceTagRoot}>
      <Grid container className={styles.priceTagMain}>
        <Grid item sm={12}>
          <p className={styles.textLight}> {discount ? <del>{`${price}`}</del> : null}</p>
        </Grid>
        {discount === 50 ? (
          <img src={imageMap[t('DiscountFifty')]} className={styles.coupon} alt="discount" />
        ) : (
          discount === 30 && (
            <img src={imageMap[t('DiscountThirty')]} className={styles.coupon} alt="discount" />
          )
        )}
        <Grid item sm={12} container align="center" justifyContent="center" alignItems="center">
          <Grid item sm={9}>
            <p className={styles.textDark}> {discountedPrice}</p>
          </Grid>
          <Grid item sm={3}>
            <p className={styles.textLight}>{t('firstYear')}</p>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <p className={styles.textLight}>{t('moneyBackGuarantee')}</p>
        </Grid>
      </Grid>
    </Grid>
  );
};
PriceTag.propTypes = {
  price: PropTypes.string.isRequired,
  discount: PropTypes.number,
  discountedPrice: PropTypes.string.isRequired,
};
export default PriceTag;
