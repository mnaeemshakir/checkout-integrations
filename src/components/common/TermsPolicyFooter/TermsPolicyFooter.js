import React from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import styles from './TermsPolicyFooter.module.scss';

const TermsPolicyFooter = () => {
  const { t } = useTranslation();
  const toTermsOfService = () => {
    window.open('https://www.mindshine.app/terms-of-service/', '_blank');
  };
  const toPrivicyPolicy = () => {
    window.open('https://www.mindshine.app/privacy-policy/', '_blank');
  };
  return (
    <Grid item xs={10} sm={12} md={12} lg={12} className={styles.footer}>
      <p>
        {t('signupTermsAndConditionsStart')}{' '}
        <span role="none" onClick={toTermsOfService} className={styles.link}>
          {t('termsOfService')}
        </span>{' '}
        {t('signupTermsAndConditionsMid')}{' '}
        <span role="none" onClick={toPrivicyPolicy} className={styles.link}>
          {t('dataUsePolicy')}
        </span>{' '}
        {t('signupTermsAndConditionsEnd')}
      </p>
    </Grid>
  );
};
export default TermsPolicyFooter;
