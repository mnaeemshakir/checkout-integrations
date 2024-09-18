import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'ducks/user/actions';
import { selectors as userSelectors } from 'ducks/user/selectors';
import LanguageSelect from './LanguageSelect';

const mapStateToProps = state => ({
  language: userSelectors(state).language,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserLanguage: userActions.setUserLanguage,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);
