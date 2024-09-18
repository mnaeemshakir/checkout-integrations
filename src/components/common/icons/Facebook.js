/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
// import SvgIcon from '@material-ui/core/SvgIcon';

const Facebook = ({ color, ...rest }) => (
  <svg
    width="12"
    height="25"
    viewBox="0 0 12 25"
    fill="transparent"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M9.80909 4.15039H12V0.175781C11.6227 0.12207 10.3227 0 8.80909 0C5.65 0 3.48636 2.07031 3.48636 5.87402V9.375H0V13.8184H3.48636V25H7.75909V13.8184H11.1045L11.6364 9.375H7.75909V6.31348C7.75909 5.0293 8.09091 4.15039 9.80909 4.15039Z"
      fill={color}
    />
  </svg>
);

Facebook.propTypes = {
  color: PropTypes.string,
};

export default Facebook;
