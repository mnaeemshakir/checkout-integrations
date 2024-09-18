import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { GAOnboardingEvent } from 'utils/gaEvents';

import VerySad from 'assets/img/onboarding/VerySad.svg';
import Sad from 'assets/img/onboarding/Sad.svg';
import Neutral from 'assets/img/onboarding/Neutral.svg';
import Happy from 'assets/img/onboarding/Happy.svg';
import VeryHappy from 'assets/img/onboarding/VeryHappy.svg';
import styles from '../Onboarding.module.scss';

const HappinessIndex = props => {
  const { onSelect } = props;
  const { t } = useTranslation();

  const onItemClick = status => {
    GAOnboardingEvent({ question: 'Q#1: mood', answer: status });
    if (onSelect) onSelect({ mood: status });
  };

  return (
    <Grid container justifyContent="center" className={styles.happinessIndex}>
      <Grid
        item
        container
        justifyContent="center"
        alignContent="center"
        className={styles.container}
        spacing={2}
      >
        <Grid item xs={12} className={styles.contentContainer}>
          <p className={styles.heading}>{t('howHappyAreYou')}</p>
        </Grid>
        <Grid item xs={12} className={styles.contentContainer}>
          <p className={`${styles.text} ${styles.textDark}`}>{t('startHere')}</p>
        </Grid>
        <Grid
          item
          container
          align="center"
          justifyContent="center"
          alignItems="center"
          className={styles.badgeContainer}
        >
          <Grid item className={styles.imageSizing} onClick={() => onItemClick(1)}>
            <img src={VerySad} alt="very sad" className={styles.imageClass} />
          </Grid>
          <Grid item className={styles.imageSizing} onClick={() => onItemClick(2)}>
            <img src={Sad} alt="sad" className={styles.imageClass} />
          </Grid>
          <Grid item className={styles.imageSizing} onClick={() => onItemClick(3)}>
            <img src={Neutral} alt="Neutral" className={styles.imageClass} />
          </Grid>
          <Grid item className={styles.imageSizing} onClick={() => onItemClick(4)}>
            <img src={Happy} alt="Happy" className={styles.imageClass} />
          </Grid>
          <Grid item className={styles.imageSizing} onClick={() => onItemClick(5)}>
            <img src={VeryHappy} alt="VeryHappy" className={styles.imageClass} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

HappinessIndex.propTypes = {
  onSelect: PropTypes.func,
};

export default HappinessIndex;
