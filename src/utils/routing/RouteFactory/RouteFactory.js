import React from 'react';
import propTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import SuspenseLoader from 'components/common/SuspenseLoader';
import PageNotFound from 'routes/modules/PageNotFound';

const RouteFactory = ({ config, routes }) => {
  return (
    <Switch>
      {config.map(route => {
        const RouteComponent = routes[route.component];
        const module = (
          <React.Suspense fallback={<SuspenseLoader />}>
            <RouteComponent />
          </React.Suspense>
        );
        return (
          <Route exact={route.exact} key={route.path} path={route.path} render={() => module} />
        );
      })}
      <Route render={PageNotFound} />
    </Switch>
  );
};

RouteFactory.propTypes = {
  config: propTypes.array.isRequired,
  routes: propTypes.object.isRequired,
};

export default RouteFactory;
