import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import IconButton from '@material-ui/core/IconButton';
import styles from '../NavBar/NavBar.module.scss';
import { languageMap } from '../../../utils/constants';

const LanguageSelect = ({ type, darkText, setUserLanguage, language }) => {
  const selected = localStorage.getItem('i18nextLng') || 'de';
  setUserLanguage(selected);
  const [lang, setLang] = React.useState(selected);
  React.useEffect(() => {
    i18next.changeLanguage(lang);
    document.body.dir = languageMap[lang].dir;
    if (lang !== language) {
      setUserLanguage(lang);
    }
  }, [lang]);

  // prettier-ignore
  const langButtonClass = darkText
    ? styles.langBtnBlack
    : type === 'home'
      ? styles.langBtn
      : styles.langBtnBlack;
  return (
    <div>
      <IconButton
        className={langButtonClass}
        onClick={() => {
          setLang(lang === 'en' ? 'de' : 'en');
        }}
      >
        {languageMap[lang].label}
      </IconButton>
    </div>
  );
};

LanguageSelect.propTypes = {
  type: PropTypes.string,
  language: PropTypes.string,
  darkText: PropTypes.bool,
  setUserLanguage: PropTypes.func,
};

export default LanguageSelect;
