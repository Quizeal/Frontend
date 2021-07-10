import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyQuizzes from './components/quiz/MyQuizzes';
import Navbar from './components/layout/NavBar';
import './App.css';
import Error from './components/error/Error';
import MyAlert from './components/layout/MyAlert';

// REDUX
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <MyAlert />
          <Switch>
            <Route exact path='/my-quizzes' component={MyQuizzes} />
            <Route path='*' component={Error} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
