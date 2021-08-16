import { Fragment } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyQuizzes from './components/quiz/MyQuizzes';
import Navbar from './components/layout/NavBar';
import './App.css';
import Error from './components/error/Error';
import MyAlert from './components/layout/MyAlert';
import Home from './components/layout/Home';
import CreateQuiz from './components/quiz/quiz-create/CreateQuiz';
import QuizReport from './components/quiz/QuizReport';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import QuizTest from './components/quiz/quiz-test/QuizTest';
import QuizView from './components/quiz/QuizView';
import Loading from './components/layout/Loading';

// REDUX
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Loading />
          <Navbar />
          <MyAlert />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/my-quizzes/:username' component={MyQuizzes} />
            <Route exact path='/create-quiz' component={CreateQuiz} />
            <Route exact path='/quiz/:quiz_id' component={QuizTest} />
            <Route path='/quiz-view/:quiz_id' component={QuizView} />
            <Route path='/quiz-report/:quiz_id' component={QuizReport} />
            <Route path='*' component={Error} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

// TODO
// -> Title not changing properly
