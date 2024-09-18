/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const Check = ({ color, ...rest }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="transparent"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path d="M9 0C4.04453 0 0 4.04453 0 9C0 13.9555 4.04453 18 9 18C13.9555 18 18 13.9555 18 9C18 4.04453 13.9919 0 9 0ZM14.1377 6.8502L7.57895 13.336C7.39676 13.5182 7.1417 13.5182 6.95951 13.336L3.86235 10.2024C3.68016 10.0202 3.68016 9.76518 3.86235 9.583L4.15385 9.2915C4.33603 9.10931 4.59109 9.10931 4.77328 9.2915L7.28745 11.8057L13.2267 5.90283C13.4089 5.72065 13.664 5.72065 13.8462 5.90283L14.1377 6.19433C14.3198 6.41296 14.3198 6.70445 14.1377 6.8502Z" />
  </svg>
);

Check.propTypes = {
  color: PropTypes.string,
};

export default Check;
