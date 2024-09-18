/* eslint-disable max-len */
import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import styles from './OnboardingButton.module.scss';

const Onboarding = props => {
  const { label, icon, fullIcon, ...rest } = props;
  // prettier-ignore
  const buttonClasses = `${styles.onboardingButton} ${styles.contained} ${fullIcon ? styles.iconFullWidth : ''}`;
  const iconClasses = `${styles.icon} ${fullIcon ? styles.iconRounded : ''}`;

  return (
    <Button className={buttonClasses} variant="outlined" {...rest}>
      {label}
      <img src={icon} alt="icon" className={iconClasses} />
    </Button>
  );
};

Onboarding.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.object,
  fullIcon: PropTypes.bool,
};

export default Onboarding;
