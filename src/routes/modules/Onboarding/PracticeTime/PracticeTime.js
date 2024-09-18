import React from 'react';
import Grid from '@material-ui/core/Grid';
import Morning from 'assets/img/onboarding/Morning.png';
import Evening from 'assets/img/onboarding/Evening.png';
import Afternoon from 'assets/img/onboarding/Afternoon.png';
import OnboardingButton from 'components/common/OnboardingButton';
import { GAOnboardingEvent } from 'utils/gaEvents';

import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import styles from '../Onboarding.module.scss';

const PracticeTime = props => {
  const { onSelect } = props;

  const { t } = useTranslation();

  const onItemClick = status => {
    GAOnboardingEvent({ question: 'Q#3: practiceTime', answer: status });
    if (onSelect) onSelect({ time: status });
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
          <p className={styles.heading}>{t('practiceTime')}</p>
        </Grid>
        <Grid item xs={12} className={styles.subtitleContainer}>
          <p className={`${styles.text} ${styles.textDark}`}>{t('clearCommitment')}</p>
        </Grid>
        <OnboardingButton label={t('morning')} icon={Morning} onClick={() => onItemClick(1)} />
        <OnboardingButton label={t('daytime')} icon={Afternoon} onClick={() => onItemClick(2)} />
        <OnboardingButton label={t('evening')} icon={Evening} onClick={() => onItemClick(3)} />
      </Grid>
    </Grid>
  );
};

PracticeTime.propTypes = {
  onSelect: PropTypes.func,
};

export default PracticeTime;
