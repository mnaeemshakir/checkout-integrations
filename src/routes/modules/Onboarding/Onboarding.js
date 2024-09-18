import React from 'react';
import Grid from '@material-ui/core/Grid';
import NavBar from 'components/common/NavBar';
import SuspenseLoader from 'components/common/SuspenseLoader';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ChevronLeft } from '@material-ui/icons';

import HappinessIndex from './HappinessIndex/HappinessIndex';
import MakesHappier from './MakesHappier/MakesHappier';
import PracticeTime from './PracticeTime/PracticeTime';
import Gender from './Gender/Gender';
import FindUs from './FindUs/FindUs';
import FinalizeOnboarding from './SuccessPage';

import styles from './Onboarding.module.scss';
import { languageMap } from '../../../utils/constants';
import Signup from '../Auth/Signup';

const Onboarding = props => {
  const {
    loggedIn,
    getQuestionsAPI,
    getQuestionResponseAPI,
    setTrainingDaysAPI,
    uid,
    tokenType,
    client,
    expiry,
    language,
  } = props;
  const history = useHistory();
  const [panel, setPanel] = React.useState(1);
  const [questions, setQuestions] = React.useState([]);
  const [questionsGerman, setQuestionsGerman] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [successTexts, setSuccessTexts] = React.useState({});
  const [successTextsGerman, setSuccessTextsGerman] = React.useState({});
  const [languageSuccessTexts, setLanguageSuccessTexts] = React.useState({});
  const [isFinalized, setIsFinalized] = React.useState(false);
  const [languageQuestions, setLanguageQuestions] = React.useState([]);
  const [withEmail, setWithEmail] = React.useState(false);
  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
      return;
    }
    setIsLoading(true);
    getQuestionsAPI(languageMap.en.value)
      .then(res => {
        const { data } = res;
        setQuestions(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    getQuestionsAPI(languageMap.de.value)
      .then(res => {
        const { data } = res;
        setQuestionsGerman(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    if (panel === 7) {
      setIsFinalized(true);
      getQuestionResponse();
    }
  }, [panel]);

  React.useEffect(() => {
    setLanguageQuestions(language === languageMap.de.value ? questionsGerman : questions);
  }, [language, questionsGerman, questions]);

  React.useEffect(() => {
    setLanguageSuccessTexts(language === languageMap.de.value ? successTextsGerman : successTexts);
  }, [language, successTexts, successTextsGerman]);

  const incrementPanel = () => {
    setPanel(panel + 1);
  };
  const decrementPanel = () => {
    setPanel(panel > 1 ? panel - 1 : 1);
  };
  const updateUserData = status => {
    setUserData({ ...userData, ...status });
    incrementPanel();
  };
  const updateAPIQuestionData = status => {
    setUserData({
      ...userData,
      answers: {
        ...userData.answers,
        ...status,
      },
    });
    incrementPanel();
  };
  const getQuestionResponse = () => {
    setIsLoading(true);
    const loginInfo = {
      tokenType,
      client,
      expiry,
      uid,
    };
    getQuestionResponseAPI({
      loginInfo,
      query: { mood: userData.mood, gender: userData.gender, answers: userData.answers },
      headers: { 'Accept-Language': 'de' },
    })
      .then(res => {
        const { data } = res;
        setSuccessTextsGerman({
          mainGoal: data?.main_goal_full_label,
          subTitle: data?.paywall_title,
        });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    getQuestionResponseAPI({
      loginInfo,
      query: { mood: userData.mood, gender: userData.gender, answers: userData.answers },
      headers: { 'Accept-Language': 'en' },
    })
      .then(res => {
        const { data } = res;
        setSuccessTexts({
          mainGoal: data?.main_goal_full_label,
          subTitle: data?.paywall_title,
        });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    setTrainingDaysAPI({ loginInfo, query: { time_of_day: userData.time } });
  };

  const getReleventQuestion = type => {
    return languageQuestions?.find(element => element.key === type) ?? [];
  };
  const handleBackButton = () => {
    if (panel === 6) {
      if (withEmail) {
        setWithEmail(false);
        return;
      }
    }
    decrementPanel();
  };

  const onSignupComplete = () => {
    incrementPanel();
  };

  return (
    <Grid container justifyContent="center" className={`${styles.onboardingRoot}`}>
      <NavBar showLogin={!isFinalized} darkText />
      {!(panel === 1 || isFinalized) && (
        <Grid className={`${styles.backContiner}`}>
          <ChevronLeft
            fontSize="large"
            className={`${styles.backButton}`}
            onClick={handleBackButton}
          />
        </Grid>
      )}
      <Grid
        item
        container
        xs={10}
        sm={6}
        md={6}
        lg={3}
        justifyContent="center"
        alignContent="center"
        className={styles.container}
        spacing={2}
      >
        {isLoading && (
          <div className={styles.loadingContainer}>
            <SuspenseLoader />
          </div>
        )}
        <div style={{ height: '100%' }}>
          {
            {
              1: <HappinessIndex onSelect={updateUserData} />,
              2: (
                <MakesHappier
                  onSelect={updateAPIQuestionData}
                  questionData={getReleventQuestion('goals')}
                />
              ),
              3: <PracticeTime onSelect={updateUserData} />,
              4: <Gender onSelect={updateUserData} />,
              5: (
                <FindUs
                  onSelect={updateAPIQuestionData}
                  questionData={getReleventQuestion('experience')}
                />
              ),
              6: (
                <Signup
                  withEmail={withEmail}
                  setWithEmail={setWithEmail}
                  onSignupComplete={onSignupComplete}
                />
              ),
              7: <FinalizeOnboarding successTexts={languageSuccessTexts} />,
            }[panel]
          }
        </div>
      </Grid>
    </Grid>
  );
};

Onboarding.propTypes = {
  getQuestionsAPI: PropTypes.func,
  getQuestionResponseAPI: PropTypes.func,
  setTrainingDaysAPI: PropTypes.func,
  uid: PropTypes.string,
  tokenType: PropTypes.string,
  client: PropTypes.string,
  expiry: PropTypes.string,
  language: PropTypes.string,
  loggedIn: PropTypes.bool,
};

export default Onboarding;
