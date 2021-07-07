import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyQuizes from './components/pages/MyQuizzes';
import './App.css';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      Quizeal
      <Router>
        <Switch>
          <Route exact path='/my-quizzes' component={MyQuizes} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
