import React from 'react';
import Grid from '@material-ui/core/Grid';

import doorImageDark from 'assets/img/DoorBack.svg';
import doorImageLight from 'assets/img/LightTealDoor.svg';
import NavBar from 'components/common/NavBar';
import styles from './GettingStarted.module.scss';

const Home = () => {
  return (
    <Grid container justifyContent="center" className={styles.homeRoot}>
      <NavBar type="home" />
      <Grid
        item
        container
        xs={10}
        sm={6}
        md={6}
        lg={3}
        justifyContent="center"
        alignContent="center"
        className={styles.container}
        spacing={2}
      >
        <Grid item container xs={12} justifyContent="center" className={styles.imageContainer}>
          <img src={doorImageDark} alt="checkout" className={styles.imageDark} />
          <img src={doorImageLight} alt="checkout" className={styles.imageLight} />
        </Grid>
        <Grid item xs={12} className={styles.contentContainer}>
          <p className={styles.heading}>Du willst deinen kostenlosen Mindshine Monat aktivieren?</p>
        </Grid>
        <Grid item xs={12} className={styles.contentContainer}>
          <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
            Leider geht das nur direkt über die App. Öffne den Link aus der Email, die dich hier her
            gebracht hat, doch bitte direkt von deinem Smartphone. Der Rest funktioniert dann wie
            von Zauberhand.
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
