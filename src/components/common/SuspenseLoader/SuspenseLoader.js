/* eslint-disable max-len */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import styles from './SuspenseLoader.module.scss';

const SuspenseLoader = () => {
  const isWhite = window.location.pathname === '/checkout';

  const rootClass = styles[isWhite ? 'ldsRingRootWhite' : 'ldsRingRoot'];
  const divClass = styles[isWhite ? 'ldsRingWhite' : 'ldsRing'];

  return (
    <div className={rootClass}>
      <div className={divClass}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SuspenseLoader;
