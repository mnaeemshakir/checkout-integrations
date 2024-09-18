import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'ducks/user/actions';
import { selectors as userSelectors } from 'ducks/user/selectors';
import NavBar from './NavBar';

const mapStateToProps = state => ({
  user: userSelectors(state).email || userSelectors(state).linkEmail,
  freshPremium: userSelectors(state).freshPremium,
  isPremium: userSelectors(state).isPremium,
  withFacebook: userSelectors(state).withFacebook,
  withGoogle: userSelectors(state).withGoogle,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserState: userActions.setUserState,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
