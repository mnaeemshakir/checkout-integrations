/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
// import SvgIcon from '@material-ui/core/SvgIcon';

const Google = ({ color, ...rest }) => (
  <svg
    width="32"
    height="32"
    viewBox="4 0 32 32"
    fill="transparent"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M28 16.2806C28 23.1274 23.2344 28 16.1967 28C9.44918 28 4 22.6387 4 16C4 9.36129 9.44918 4 16.1967 4C19.482 4 22.2459 5.18548 24.3754 7.14032L21.0557 10.2806C16.7131 6.15806 8.63771 9.25484 8.63771 16C8.63771 20.1855 12.0361 23.5774 16.1967 23.5774C21.0262 23.5774 22.8361 20.171 23.1213 18.4048H16.1967V14.2774H27.8082C27.9213 14.8919 28 15.4823 28 16.2806Z"
      fill={color}
    />
  </svg>
);

Google.propTypes = {
  color: PropTypes.string,
};

export default Google;
