import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'ducks/user/actions';
import WithFacebook from './WithFacebook';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserState: userActions.setUserState,
    },
    dispatch,
  );

export default connect(undefined, mapDispatchToProps)(WithFacebook);
