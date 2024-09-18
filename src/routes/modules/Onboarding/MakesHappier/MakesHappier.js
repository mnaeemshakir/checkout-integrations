import React from 'react';
import Grid from '@material-ui/core/Grid';
import { GAOnboardingEvent } from 'utils/gaEvents';

import OnboardingButton from 'components/common/OnboardingButton';
import PropTypes from 'prop-types';

import styles from '../Onboarding.module.scss';

const MakesHappier = props => {
  const { questionData, onSelect } = props;

  const onItemClick = status => {
    GAOnboardingEvent({ question: 'Q#2: goals', answer: status });
    if (onSelect) onSelect({ [Number(3)]: [status] });
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
        <Grid item xs={12}>
          <p className={styles.heading}>{questionData.title}</p>
        </Grid>
        <Grid item xs={12} className={styles.subtitleContainer}>
          <p className={`${styles.text} ${styles.textDark}`}>{questionData.subtitle}</p>
        </Grid>
        {questionData.options.map(option => {
          return (
            <OnboardingButton
              label={option.label}
              icon={option.image_url}
              onClick={() => onItemClick(option.id)}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

MakesHappier.propTypes = {
  onSelect: PropTypes.func,
  questionData: PropTypes.object,
};

export default MakesHappier;
