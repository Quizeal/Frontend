import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyQuizzes from './components/pages/MyQuizzes';
import Navbar from './components/utils/NavBar';
import './App.css';

function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/my-quizzes' component={MyQuizzes} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
