import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyQuizzes from './components/quiz/MyQuizzes';
import Navbar from './components/layout/NavBar';
import './App.css';
import Error from './components/error/Error';
import MyAlert from './components/layout/MyAlert';
import Home from './components/layout/Home';
import CreateQuiz from './components/quiz/CreateQuiz';
import QAReport from './components/quiz/QuizReport';

// REDUX
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <MyAlert />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/my-quizzes' component={MyQuizzes} />
            <Route exact path='/create-quiz' component={CreateQuiz} />
            <Route path='/quiz-report/:id' component={QAReport} />
            <Route path='*' component={Error} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
