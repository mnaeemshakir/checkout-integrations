/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import styles from './Textfield.module.scss';

const Textfield = ({ label, className, error, ...rest }) => {
  return (
    <FormControl className={`${className} ${styles.textfieldRoot}`}>
      <InputLabel shrink style={{ fontSize: '1.2rem', color: '#85878C' }}>
        {label}
      </InputLabel>
      <InputBase className={styles.field} {...rest} />
      <div style={{ fontSize: '0.9rem', color: '#FF0000' }}>{error}</div>
    </FormControl>
  );
};
Textfield.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
};
export default Textfield;
