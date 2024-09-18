/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ color, ...rest }) => (
  <svg
    width="31"
    height="31"
    viewBox="0 0 31 31"
    fill="transparent"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path d="M10.2862 23.6292C8.47243 23.0704 7.38955 21.7665 6.87519 20.0103C6.0901 17.376 6.57739 14.8747 7.90392 12.533C9.47409 9.76567 11.8564 8.22232 15.0238 7.82318C16.7835 7.6103 18.6785 7.98283 20.1946 8.88755C22.604 10.3511 23.4703 12.9056 22.4686 15.5399C21.9272 16.9236 21.115 18.121 20.0863 19.1854C18.5432 20.8352 16.7835 22.2721 14.6448 23.1768C13.7244 23.576 12.7498 23.8421 11.7752 23.8421C11.2879 23.8421 10.8006 23.7622 10.2862 23.6292ZM14.6178 0.0532189C10.178 0.372532 6.60447 2.34163 4.00556 5.93391C1.02765 10.0318 -0.244729 14.6884 0.0259906 19.7442C0.16135 22.006 0.72986 24.188 1.92102 26.1305C3.92435 29.3768 6.82104 31.1064 10.6923 30.9734C12.8581 30.8936 14.8073 30.1219 16.6752 29.0575C18.5703 27.9665 20.2758 26.6094 21.9001 25.1991C23.7951 23.576 25.6902 21.9528 27.3416 20.1167C28.8576 18.4403 30.13 16.6043 30.8609 14.4489C31.7272 11.921 31.7543 9.44635 30.4548 7.02489C29.5073 5.29528 28.0996 4.01803 26.4482 2.98026C23.2537 0.95794 19.6802 0.0532189 15.7277 0C15.457 0.0266094 15.0238 0.0266094 14.6178 0.0532189Z" />
  </svg>
);

Logo.propTypes = {
  color: PropTypes.string,
};

export default Logo;
