/* eslint-disable max-len */
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { isNull } from '../../../utils/utils';
import styles from './PriceSwitch.module.scss';

const PriceSwitch = ({ discount, onPlanChange, priceList }) => {
  const { t } = useTranslation();
  const [plan, selectedPlan] = React.useState('yearly');

  const handleToogleChange = (_, value) => {
    if (isNull(value)) {
      return;
    }
    selectedPlan(value);
    if (onPlanChange) {
      onPlanChange(value);
    }
  };

  return (
    <Grid className={styles.PriceSwitchRoot}>
      {!isNull(discount) && discount != 0 && (
        <Grid className={styles.discountContainer}>
          <p className={`${styles.text} ${styles.discountDetailsText}`}>
            {t('saveOnPlans', { percent: discount })}
          </p>
        </Grid>
      )}
      <Grid className={styles.toogleContainer}>
        <ToggleButtonGroup
          name="payment-option"
          value={plan}
          onChange={handleToogleChange}
          className={styles.toogleGroupRoot}
          exclusive
        >
          {priceList.map(item => {
            const { duration, price, discountPrice, description, toogleTag, id } = item;
            const hasDiscount = !isNull(discountPrice);
            const selected = id === plan;
            return (
              <ToggleButton key={id} value={id} className={styles.toogleClass}>
                <Grid
                  key={id}
                  className={`${styles.PriceToogle} ${selected && styles.priceToogleSelected}`}
                  alignItems="center"
                >
                  {toogleTag && (
                    <p
                      className={`${styles.text} ${styles.tagText} ${selected &&
                        styles.tagTextSelected}`}
                    >
                      {toogleTag}
                    </p>
                  )}
                  <p className={`${styles.text} ${styles.durationText}`}>{duration}</p>
                  {hasDiscount && (
                    <p className={`${styles.text} ${styles.discountText}`}>{price}</p>
                  )}
                  <p className={`${styles.text} ${styles.priceText}`}>
                    {hasDiscount ? discountPrice : price}
                  </p>
                  <p className={`${styles.text} ${styles.descriptionText}`}>{description}</p>
                </Grid>
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};
PriceSwitch.propTypes = {
  priceList: PropTypes.array.isRequired,
  onPlanChange: PropTypes.func,
  discount: PropTypes.string,
};
export default PriceSwitch;
