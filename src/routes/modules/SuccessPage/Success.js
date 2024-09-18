import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import doorImageLight from 'assets/img/DoorNoBack.svg';
import { useHistory } from 'react-router-dom';
import styles from './Success.module.scss';

const Success = props => {
  const { successTexts } = props;
  const history = useHistory();

  return (
    <Grid container direction="row" className={styles.successRoot}>
      <div className={styles.contentContainer}>
        <Grid
          xs={10}
          sm={6}
          md={4}
          lg={4}
          xl={3}
          item
          container
          justifyContent="center"
          alignContent="center"
          className={styles.mainContainer}
        >
          <Grid item className={`${styles.imageContainer} ${styles.contentSpacing}`}>
            <img src={doorImageLight} alt="checkout" width="100%" className={styles.imageLight} />
          </Grid>
          <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
            <p className={styles.heading}>{successTexts.mainGoal}</p>
          </Grid>
          <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
            <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
              {successTexts.subTitle}
            </p>
          </Grid>
          <Grid item justifyContent="center" xs={12} sm={12} className={styles.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={`${styles.button} ${styles.contained} ${styles.buttonFullWidth}`}
              onClick={() => history.push('/home')}
            >
              Subscribe to Mindshine Pro
            </Button>
          </Grid>
          <Grid item xs={12} className={styles.buttonContainer}>
            <p onClick={() => history.push('/login-success')} className={styles.textBlue}>
              Continue with Mindshine for free
            </p>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

Success.propTypes = {
  successTexts: PropTypes.object,
};

export default Success;
