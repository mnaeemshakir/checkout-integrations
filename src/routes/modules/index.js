import React from 'react';

const components = [
  'Root',
  'Auth',
  'Home',
  'PageNotFound',
  'Checkout',
  'Success',
  'GettingStarted',
  'Onboarding',
  'OnboardingSuccess',
];
const Components = {};
components.forEach(item => {
  Components[item] = React.lazy(() => import(`./${item}`));
});

export default Components;
