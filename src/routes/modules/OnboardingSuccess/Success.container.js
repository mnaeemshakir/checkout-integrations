import { connect } from 'react-redux';
import { selectors as userSelectors } from 'ducks/user/selectors';
import { bindActionCreators } from 'redux';
import * as userActions from 'ducks/user/actions';
import Success from './Success';

const mapStateToProps = state => ({
  isPremium: userSelectors(state).isPremium,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserFreshSignup: userActions.setUserFreshSignup,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Success);
