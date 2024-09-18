import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as snackbarActions from 'ducks/snackbar/actions';
import { selectors as snackbarSelectors } from 'ducks/snackbar/selectors';
import CustomSnackbar from './Snackbar';

const mapStateToProps = state => ({
  open: snackbarSelectors(state).open,
  message: snackbarSelectors(state).message,
  severity: snackbarSelectors(state).severity,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearSnackbar: snackbarActions.clearSnackbar,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomSnackbar);
