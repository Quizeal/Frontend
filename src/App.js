import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyQuizes from './components/pages/MyQuizzes';
import './App.css';

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
