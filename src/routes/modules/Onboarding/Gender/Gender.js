import React from 'react';
import Grid from '@material-ui/core/Grid';
import Female from 'assets/img/onboarding/Female.png';
import Male from 'assets/img/onboarding/Male.png';
import Neutral from 'assets/img/onboarding/Neutral.png';

import { useTranslation } from 'react-i18next';
import OnboardingButton from 'components/common/OnboardingButton';
import PropTypes from 'prop-types';
import { GAOnboardingEvent } from 'utils/gaEvents';

import styles from '../Onboarding.module.scss';

const Gender = props => {
  const { onSelect } = props;
  const { t } = useTranslation();

  const onItemClick = status => {
    GAOnboardingEvent({ question: 'Q#4: gender', answer: status });
    if (onSelect) onSelect({ gender: status });
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
          <p className={styles.heading}>{t('whatsGender')}</p>
        </Grid>
        <Grid item xs={12} className={styles.subtitleContainer}>
          <p className={`${styles.text} ${styles.textDark}`}>{t('genderSpecific')}</p>
        </Grid>
        <OnboardingButton
          label={t('female')}
          icon={Female}
          fullIcon
          onClick={() => onItemClick('female')}
        />
        <OnboardingButton
          label={t('male')}
          icon={Male}
          fullIcon
          onClick={() => onItemClick('male')}
        />
        <OnboardingButton
          label={t('otherGender')}
          icon={Neutral}
          fullIcon
          onClick={() => onItemClick('other')}
        />
      </Grid>
    </Grid>
  );
};

Gender.propTypes = {
  onSelect: PropTypes.func,
};

export default Gender;
