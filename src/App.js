import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ReactGA from 'react-ga';

import { Bugfender } from '@bugfender/sdk';
import Snackbar from './components/common/Snackbar';
import RouteComponents from './routes/modules';
import routesConfig from './routes/dictionary.json';
import RouteFactory from './utils/routing/RouteFactory';
import { paypalClientId } from './utils/envConstants';

const theme = createTheme({
  typography: {
    fontFamily: 'DM Sans Display, sans-serif',
  },
  palette: {
    primary: {
      main: '#008196',
    },
    secondary: {
      main: '#5fc6c4',
    },
  },
});

Bugfender.init({
  appKey: '<Key>',
});

ReactGA.initialize('UA-121641163-1', {
  titleCase: false,
});
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <PayPalScriptProvider
          options={{
            'client-id': paypalClientId,
            currency: 'EUR',
            vault: true,
            intent: 'subscription',
          }}
        >
          <BrowserRouter>
            <RouteFactory routes={RouteComponents} config={routesConfig} />
          </BrowserRouter>
          <Snackbar />
        </PayPalScriptProvider>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default App;
