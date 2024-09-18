import * as React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = props => {
  const { open, message, severity, clearSnackbar } = props;

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    clearSnackbar();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert variant="standard" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

CustomSnackbar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  severity: PropTypes.string,
  clearSnackbar: PropTypes.func,
};

export default CustomSnackbar;
