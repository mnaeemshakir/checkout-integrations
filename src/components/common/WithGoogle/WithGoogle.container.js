import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'ducks/user/actions';
import WithGoogle from './WithGoogle';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserState: userActions.setUserState,
    },
    dispatch,
  );

export default connect(undefined, mapDispatchToProps)(WithGoogle);
