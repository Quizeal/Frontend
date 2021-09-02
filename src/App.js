// import { Fragment } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyQuizzes from './components/quiz/MyQuizzes';
import './App.css';
import Error from './components/error/Error';
import MyAlert from './components/layout/MyAlert';
import Home from './components/extra/Home';
import CreateQuiz from './components/quiz/quiz-create/CreateQuiz';
import QuizReport from './components/quiz/QuizReport';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import QuizTest from './components/quiz/quiz-test/QuizTest';
import QuizView from './components/quiz/QuizView';
import QuizResult from './components/quiz/QuizResult';
import Loading from './components/layout/Loading';
import Feedback from './components/extra/Feedback';
import Me from './components/extra/Me';
import Setting from './components/extra/Setting';
import Developers from './components/extra/Developers';
import MiniDrawer from './components/layout/MiniDrawer';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core';

// REDUX
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';

let theme = createTheme({
  palette: {
    primary: {
      main: '#24313f',
    },
  },
  overrides: {},
});
theme = responsiveFontSizes(theme);
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Loading />
          <MiniDrawer>
            <MyAlert />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/feedback' component={Feedback} />
              <Route exact path='/developers' component={Developers} />
              <PrivateRoute exact path='/me' component={Me} />
              <PrivateRoute exact path='/settings' component={Setting} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/my-quizzes/:username'
                component={MyQuizzes}
              />
              <PrivateRoute exact path='/create-quiz' component={CreateQuiz} />
              <PrivateRoute exact path='/quiz/:quiz_id' component={QuizTest} />
              <PrivateRoute path='/quiz-view/:quiz_id' component={QuizView} />
              <PrivateRoute
                path='/quiz-report/:quiz_id'
                component={QuizReport}
              />
              <PrivateRoute
                path='/quiz-result/:quiz_id'
                component={QuizResult}
              />
              <Route path='*' component={Error} />
            </Switch>
          </MiniDrawer>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;

// TODO
// -> Remove Data from state when page is changes (if-possible)
